"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./providers/AuthProvider";
import { LogOut, FolderKanban, Zap } from "lucide-react";

export function UserButton() {
  const { user, dbUser, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  if (!user) return null;

  const displayName = user.displayName || "User";
  const email = user.email || "";
  const photoURL = user.photoURL;
  const initial = (displayName[0] || email[0] || "U").toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 ring-offset-[#0a0a0a] transition-all hover:ring-2 hover:ring-white/20 focus:outline-none overflow-hidden"
        aria-label="User profile"
      >
        {photoURL ? (
          <Image
            src={photoURL}
            alt={displayName}
            width={32}
            height={32}
            className="h-full w-full object-cover"
            unoptimized
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="text-xs font-semibold text-white">{initial}</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#121212] p-1.5 shadow-xl backdrop-blur-md z-50 animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-white/8 mb-1">
            <p className="text-xs font-semibold text-white truncate">{displayName}</p>
            <p className="text-[11px] text-white/40 truncate">{email}</p>
            {dbUser && (
              <div className="mt-2 flex items-center justify-between text-[11px] text-white/50">
                <span className="flex items-center gap-1 text-white/70">
                  <Zap className="h-3 w-3 fill-white/60 text-white/60" />
                  {dbUser.credits} credits
                </span>
                <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase font-mono text-white/60">
                  {dbUser.plan}
                </span>
              </div>
            )}
          </div>

          <Link
            href="/projects"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-white/70 hover:bg-white/6 hover:text-white transition-colors"
          >
            <FolderKanban className="h-3.5 w-3.5 text-white/50" />
            My Projects
          </Link>

          <button
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-red-400/80 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
