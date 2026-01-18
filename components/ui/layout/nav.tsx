"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import { ModeToggle } from "../theme/theme-toggle";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl w-full items-center justify-between px-4 sm:px-6">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-sm font-black text-primary-foreground">
              O
            </span>
          </div>
          <div className="flex flex-col gap-0">
            <h1 className="text-lg font-black tracking-tight leading-none text-foreground">
              OfferOrb
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Career Decisions
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          {/* Tagline - Hidden on mobile */}
          <p className="hidden sm:block text-sm font-semibold text-muted-foreground">
            AI-Powered Career Decision Assistant
          </p>

          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
