"use client";

import { Heart, Search, UserRoundCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const steps: {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    description: "Explore upcoming events in your area.",
    icon: Search,
  },
  {
    id: "join",
    number: "02",
    title: "Join",
    description: "Register and become a volunteer.",
    icon: UserRoundCheck,
  },
  {
    id: "impact",
    number: "03",
    title: "Make an Impact",
    description: "Help your community and create lasting change.",
    icon: Heart,
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            How It Works
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Get started in just a few simple steps.
          </p>

          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <li key={step.id} className="flex gap-4">
                <span className="relative flex size-14 shrink-0 items-center justify-center rounded-full border border-border bg-card">
                  <step.icon className="size-6 text-primary" />
                  <span
                    aria-hidden
                    className="absolute -inset-1 rounded-full border border-primary/20"
                  />
                </span>
                <div>
                  <p className="text-xs font-semibold text-primary">{step.number}</p>
                  <h3 className="mt-1 font-semibold">{step.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Handwritten accent panel */}
        <div className="relative hidden px-8 pb-2 lg:block">
          <span className="font-script text-3xl leading-tight text-foreground">
            Your
            <br />
            Support
            <br />
            Matters
          </span>
          <svg
            aria-hidden
            viewBox="0 0 40 60"
            className="absolute -right-2 -top-6 size-10 -rotate-6 text-primary"
            fill="none"
          >
            <path
              d="M6 52 L20 8 L34 52 M12 36 L28 36"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
