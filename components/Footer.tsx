"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  ArrowUp,
  Zap,
  ExternalLink,
  Code2,
  Heart,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function TwitterIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

interface FooterProps {
  githubUrl?: string;
  githubRepoUrl?: string;
  authorName?: string;
  authorEmail?: string;
}

export function Footer({
  githubUrl = "https://github.com/usp13",
  githubRepoUrl = "https://github.com/usp13/launchly",
  authorName = "Utsav Panchal",
  authorEmail = "utsavpanchal1304@gmail.com",
}: FooterProps) {
  const [emailInput, setEmailInput] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thanks for subscribing to Launchly updates!");
    setEmailInput("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/8 bg-[#080808] text-white">
      {/* Subtle top ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-transparent to-blue-500/5 blur-2xl" />

      {/* Top Banner / Newsletter + GitHub highlight */}
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/8 bg-gradient-to-r from-white/[0.03] via-white/[0.01] to-blue-500/[0.03] p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                <Zap className="h-3.5 w-3.5" />
                <span>Next-Gen App Generation</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Ready to ship your next big idea?
              </h3>
              <p className="mt-2 text-sm text-white/40 leading-relaxed">
                Stay updated with the latest templates, Gemini AI models, and feature releases.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  className="h-10 w-full min-w-56 rounded-full border border-white/10 bg-[#121212] px-4 text-xs text-white placeholder:text-white/30 focus:border-blue-400 focus:outline-none sm:w-64"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="h-10 rounded-full bg-white px-4 text-xs font-semibold text-black hover:bg-white/90 cursor-pointer shrink-0"
                >
                  <Send className="mr-1.5 h-3 w-3" />
                  Subscribe
                </Button>
              </form>

              <a
                href={githubRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 text-xs font-medium text-white/80 hover:border-white/25 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>Star on GitHub</span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60 font-mono">
                  ★
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation links */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand & Creator info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 select-none mb-4">
              <Image
                src="/launchly-text-logo-removebg.png"
                alt="Launchly"
                width={130}
                height={38}
                className="h-9 w-auto rounded-md"
                style={{ width: "auto" }}
              />
            </Link>

            <p className="text-sm leading-relaxed text-white/40 max-w-sm mb-6">
              Launchly empowers creators and developers to build, preview, and export full-stack web applications from a single natural language prompt.
            </p>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>All Systems Operational</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/40">
                <span>Created with passion by</span>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white hover:text-blue-400 inline-flex items-center gap-1 transition-colors underline decoration-white/20 underline-offset-2"
                >
                  {authorName}
                  <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Column: Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs text-white/40">
              <li>
                <Link href="/workspace" className="hover:text-white transition-colors">
                  AI App Generator
                </Link>
              </li>
              <li>
                <Link href="/workspace" className="hover:text-white transition-colors">
                  Live Sandbox Preview
                </Link>
              </li>
              <li>
                <Link href="/workspace" className="hover:text-white transition-colors">
                  Export to ZIP
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Project Dashboard
                </Link>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing Plans
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Resources & Tech */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-4">
              Technology
            </h4>
            <ul className="space-y-2.5 text-xs text-white/40">
              <li>
                <span className="hover:text-white/70 transition-colors cursor-default">
                  Next.js 16 (Turbopack)
                </span>
              </li>
              <li>
                <span className="hover:text-white/70 transition-colors cursor-default">
                  Google Gemini 3.5 Flash
                </span>
              </li>
              <li>
                <span className="hover:text-white/70 transition-colors cursor-default">
                  Firebase Authentication
                </span>
              </li>
              <li>
                <span className="hover:text-white/70 transition-colors cursor-default">
                  Prisma ORM & PostgreSQL
                </span>
              </li>
              <li>
                <span className="hover:text-white/70 transition-colors cursor-default">
                  Arcjet Security & Shield
                </span>
              </li>
            </ul>
          </div>

          {/* Column: Developer & GitHub links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-4">
              Connect & Code
            </h4>
            <ul className="space-y-2.5 text-xs text-white/40">
              <li>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <GithubIcon className="h-3.5 w-3.5 text-white/60" />
                  <span>GitHub Profile</span>
                </a>
              </li>
              <li>
                <a
                  href={githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Code2 className="h-3.5 w-3.5 text-white/60" />
                  <span>Source Code</span>
                </a>
              </li>
              <li>
                <a
                  href={`${githubRepoUrl}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-white/60" />
                  <span>Report an Issue</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${authorEmail}`}
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Mail className="h-3.5 w-3.5 text-white/60" />
                  <span>{authorEmail}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom separator & copyright bar */}
      <div className="border-t border-white/6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-white/40 text-center sm:text-left">
            © {new Date().getFullYear()} Launchly. Crafted with{" "}
            <Heart className="inline h-3 w-3 fill-red-400 text-red-400" /> by{" "}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/80 hover:text-white hover:underline"
            >
              {authorName}
            </a>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/4 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white transition-all"
            >
              <GithubIcon className="h-4 w-4" />
            </a>

            <a
              href={`mailto:${authorEmail}`}
              aria-label="Email"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/4 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white transition-all"
            >
              <Mail className="h-4 w-4" />
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-8 items-center gap-1.5 rounded-full border border-white/8 bg-white/4 px-3 text-xs text-white/50 hover:border-white/20 hover:bg-white/10 hover:text-white transition-all cursor-pointer ml-2"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
