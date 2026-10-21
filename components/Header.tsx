"use client";

import Link from "next/link";
import Image from "next/image";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingModal } from "@/components/PricingModal";
import { useAuth } from "@/components/providers/AuthProvider";
import { UserButton } from "@/components/UserButton";
import { GoogleIcon } from "@/components/GoogleSignInButton";

export default function Header() {
  const { isSignedIn, dbUser, signInWithGoogle, loading } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/6 bg-white/7 backdrop-blur-md">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 select-none">
          <Image
            src="/launchly-text-logo-removebg.png"
            alt="Launchly"
            width={120}
            height={36}
            className="h-9 w-auto rounded-md"
            style={{ width: "auto" }}
            priority
          />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {!loading && (
            <>
              {isSignedIn ? (
                <>
                  <Link
                    href="/projects"
                    className="text-[13px] font-medium text-white/50 transition-colors hover:text-white"
                  >
                    Projects
                  </Link>

                  {dbUser && (
                    <PricingModal>
                      <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-xs text-white/70 hover:border-white/20 hover:bg-white/8 transition-colors cursor-pointer">
                        <Zap className="h-3 w-3 fill-white/70" />
                        {dbUser.credits} credits
                      </span>
                    </PricingModal>
                  )}

                  <UserButton />
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signInWithGoogle()}
                    className="text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/5 cursor-pointer"
                  >
                    Sign in
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => signInWithGoogle()}
                    className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white px-4 text-[13px] font-semibold text-black hover:bg-white/90 active:scale-95 cursor-pointer"
                  >
                    <GoogleIcon className="h-3.5 w-3.5" />
                    <span>Get Started</span>
                    <ArrowRight className="h-3 w-3 opacity-60" />
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
