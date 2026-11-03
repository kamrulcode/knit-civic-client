"use client";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Home,
  SearchX,
  Sparkles,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B1425] px-5 py-8 text-white">
      {/* Animated Background Glow */}
      <div className="pointer-events-none absolute -left-32 top-20 size-96 animate-pulse rounded-full bg-[#FF2D78]/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-32 bottom-10 size-96 animate-pulse rounded-full bg-indigo-500/10 blur-[130px] [animation-delay:1s]" />

      {/* Floating Decorations */}
      <Sparkles className="absolute left-[15%] top-[20%] size-6 animate-float text-[#FF2D78]/60" />

      <Heart className="absolute right-[15%] top-[25%] size-8 animate-float-delayed text-[#FF2D78]/50" />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        {/* Brand */}
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-lg font-bold tracking-tight transition-transform duration-300 hover:scale-105"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-[#FF2D78]/15 text-[#FF2D78]">
            <Heart size={20} fill="currentColor" />
          </span>
          Knit<span className="text-[#FF2D78]">Civic</span>
        </Link>

        {/* 404 Section */}
        <div className="relative mx-auto mb-8 flex items-center justify-center">
          {/* Number Glow */}
          <div className="absolute size-72 rounded-full bg-[#FF2D78]/15 blur-[90px] animate-pulse sm:size-96" />

          {/* Huge 404 */}
          <h1
            className="
              relative
              animate-appear
              bg-linear-to-b
              from-white
              via-[#FF8AB5]
              to-[#FF2D78]
              bg-clip-text
              text-[clamp(12rem,32vw,24rem)]
              leading-[0.85]
              font-black
              tracking-[-0.09em]
              text-transparent
              drop-shadow-[0_10px_45px_rgba(255,45,120,0.2)]
              select-none
            "
          >
            404
          </h1>

          {/* Floating Search Icon */}
          <div className="absolute -right-2 top-0 flex size-12 animate-float items-center justify-center rounded-2xl border border-[#FF2D78]/30 bg-[#FF2D78]/10 text-[#FF2D78] shadow-lg shadow-[#FF2D78]/10 sm:-right-5 sm:top-5 sm:size-16">
            <SearchX className="size-7 sm:size-9" />
          </div>

          {/* Small Floating Circle */}
          <div className="absolute -bottom-3 left-[12%] size-4 animate-bounce rounded-full bg-[#FF2D78] shadow-lg shadow-[#FF2D78]/50" />
        </div>

        {/* Message */}
        <div className="animate-slide-up space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF2D78]/20 bg-[#FF2D78]/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#FF6B9F]">
            <Sparkles size={13} />
            OOPS! PAGE NOT FOUND
          </span>

          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
            Looks Like You're
            <span className="mt-1 block text-[#FF2D78]">
              Lost in the Community!
            </span>
          </h2>

          <p className="mx-auto max-w-md text-sm leading-7 text-slate-400 sm:text-base">
            The page you're looking for might have been removed, had its name
            changed, or is temporarily unavailable. Let's get you back to making
            a difference!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-9 flex animate-slide-up flex-col items-center justify-center gap-4 [animation-delay:200ms] sm:flex-row">
          <Link
            href="/"
            className="
              group inline-flex w-full items-center justify-center gap-2
              rounded-full bg-linear-to-r from-[#FF2D78] to-[#E92D91]
              px-7 py-3.5 text-sm font-semibold text-white
              shadow-lg shadow-[#FF2D78]/20
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl
              hover:shadow-[#FF2D78]/40
              sm:w-auto
            "
          >
            <Home size={17} />
            Back to Home
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <button
            onClick={() => window.history.back()}
            className="
              inline-flex w-full items-center justify-center gap-2
              rounded-full border border-slate-700 bg-slate-800/50
              px-7 py-3.5 text-sm font-semibold text-slate-300
              transition-all duration-300
              hover:-translate-y-1 hover:border-[#FF2D78]/50
              hover:text-white sm:w-auto
            "
          >
            <ArrowLeft size={17} />
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
