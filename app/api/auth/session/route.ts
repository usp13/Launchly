import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { PLANS } from "@/lib/constants";

function decodeFirebaseToken(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = Buffer.from(base64, "base64").toString("utf8");
    const parsed = JSON.parse(jsonPayload);
    if (parsed.exp && parsed.exp * 1000 < Date.now()) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, user } = body;

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const payload = decodeFirebaseToken(token);
    const uid = payload?.user_id || payload?.sub || user?.uid;

    if (!uid) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const email = payload?.email || user?.email || "";
    const name = payload?.name || user?.displayName || email.split("@")[0] || "User";
    const imageUrl = payload?.picture || user?.photoURL || "";

    // Sync user with database
    let dbUser = await db.user.findUnique({
      where: { firebaseUid: uid },
    });

    if (!dbUser) {
      // Check if user exists by email from earlier
      const existingByEmail = email
        ? await db.user.findUnique({ where: { email } })
        : null;

      if (existingByEmail) {
        dbUser = await db.user.update({
          where: { id: existingByEmail.id },
          data: {
            firebaseUid: uid,
            name: name || existingByEmail.name,
            imageUrl: imageUrl || existingByEmail.imageUrl,
          },
        });
      } else {
        dbUser = await db.user.create({
          data: {
            firebaseUid: uid,
            email,
            name,
            imageUrl,
            credits: PLANS.free.credits,
            plan: "free",
          },
        });
      }
    } else if (imageUrl && dbUser.imageUrl !== imageUrl) {
      dbUser = await db.user.update({
        where: { id: dbUser.id },
        data: { imageUrl, name: name || dbUser.name },
      });
    }

    const response = NextResponse.json({ success: true, user: dbUser });

    // Set HTTP-only session cookie (expires in 14 days)
    response.cookies.set("firebase_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });

    return response;
  } catch (error) {
    console.error("Session sync error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("firebase_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
