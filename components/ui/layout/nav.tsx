"use client";

import { ModeToggle } from "../theme/theme-toggle";
import { Activity } from "lucide-react";
import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-zinc-950 dark:border-zinc-100 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl w-full items-center justify-between px-6">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 border-2 border-zinc-950 dark:border-zinc-100 flex items-center justify-center bg-zinc-950 dark:bg-zinc-100 transition-colors group-hover:bg-background group-hover:text-zinc-950 dark:group-hover:text-zinc-100">
            <span className="text-xl font-black text-zinc-50 dark:text-zinc-950 group-hover:text-zinc-950 dark:group-hover:text-zinc-50 transition-colors">
              O
            </span>
          </div>
          <div className="flex flex-col -space-y-1">
            <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">
              OfferOrb
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Decision Engine
            </p>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex gap-8 items-center">
          <div className="hidden md:flex items-center gap-3">
            <Activity className="w-3 h-3 opacity-50" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              v1.0 / AI-Analysis-Active
            </p>
          </div>

          <div className="pl-6 border-l-2 border-zinc-200 dark:border-zinc-800 h-8 flex items-center">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
