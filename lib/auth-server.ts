import { cookies } from "next/headers";
import { db } from "@/lib/prisma";

export interface FirebaseTokenPayload {
  iss?: string;
  aud?: string;
  auth_time?: number;
  user_id?: string;
  sub?: string;
  iat?: number;
  exp?: number;
  email?: string;
  name?: string;
  picture?: string;
}

export function decodeFirebaseToken(token: string): FirebaseTokenPayload | null {
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

export async function getServerAuth(): Promise<{ userId: string | null; email?: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("firebase_token")?.value;
    if (!token) return { userId: null };

    const payload = decodeFirebaseToken(token);
    const userId = payload?.user_id || payload?.sub || null;
    return { userId, email: payload?.email };
  } catch (error: any) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE") throw error;
    console.error("getServerAuth error:", error);
    return { userId: null };
  }
}

export async function getServerUser() {
  try {
    const { userId } = await getServerAuth();
    if (!userId) return null;

    const user = await db.user.findUnique({
      where: { firebaseUid: userId },
    });

    return user;
  } catch (error: any) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE") throw error;
    console.error("getServerUser error:", error);
    return null;
  }
}
