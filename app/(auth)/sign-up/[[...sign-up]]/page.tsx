"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { BlueTitle, GrayTitle } from "@/components/ui/reusables";
import { Zap } from "lucide-react";

export default function SignUpPage() {
  const { isSignedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isSignedIn) {
      router.push("/projects");
    }
  }, [loading, isSignedIn, router]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f0f0f] p-8 shadow-2xl backdrop-blur-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <Link href="/" className="mb-4 inline-block">
            <Image
              src="/launchly-text-logo-removebg.png"
              alt="Launchly"
              width={130}
              height={40}
              className="h-10 w-auto rounded-md"
              style={{ width: "auto" }}
              priority
            />
          </Link>
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-white">
            <GrayTitle>Create your account on </GrayTitle>
            <BlueTitle>Launchly</BlueTitle>
          </h1>
          <p className="mt-2 text-sm text-white/40">
            Sign up with Google to start building apps from a single prompt.
          </p>
        </div>

        <div className="space-y-4">
          <GoogleSignInButton
            size="lg"
            className="w-full justify-center h-11 rounded-xl bg-white text-black hover:bg-white/90 text-sm font-semibold shadow-md active:scale-[0.98] transition-all"
          >
            <span>Sign up with Google</span>
          </GoogleSignInButton>

          <div className="flex items-center gap-2 pt-2 text-center justify-center">
            <span className="flex items-center gap-1.5 text-xs text-white/30">
              <Zap className="h-3 w-3 text-amber-400" />
              Includes 10 free generations
            </span>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-white/20">
          By signing up, you agree to Launchly&apos;s Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}