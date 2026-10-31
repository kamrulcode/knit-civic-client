"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: "ayman",
    quote:
      "This platform helped me find meaningful volunteer opportunities in my area. It's easy to join events and people come together for a better tomorrow.",
    name: "Ayman Rahman",
    role: "Volunteer",
    avatarUrl: "/avatars/v6.svg",
  },
  {
    id: "nusrat",
    quote:
      "Joining KnitCivic was the best decision of my year. Every event feels personal, organized and truly makes a difference in our community.",
    name: "Nusrat Jahan",
    role: "Community Lead",
    avatarUrl: "/avatars/v2.svg",
  },
];

export function Testimonials() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">What People Say</h2>
      <p className="-mt-4 text-sm text-muted-foreground">Real stories. Real impact.</p>

      <div className="relative rounded-3xl border border-border bg-card p-6">
        <Quote
          aria-hidden
          className="absolute -top-2 left-6 size-8 text-primary"
          fill="currentColor"
        />
        <p className="text-sm leading-6 text-foreground/90">
          {testimonials[0].quote}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={testimonials[0].avatarUrl}
              alt={testimonials[0].name}
              width={44}
              height={44}
              className="size-11 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{testimonials[0].name}</p>
              <p className="text-xs text-muted-foreground">{testimonials[0].role}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              className="flex size-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              className="flex size-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
