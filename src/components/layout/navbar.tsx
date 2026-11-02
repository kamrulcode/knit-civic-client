"use client";

import Link from "next/link";
import { HeartPulse, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="relative flex size-9 items-center justify-center  ">
        <Image
          src="/logoL.svg"
          fill
          alt=""
          className="object-contain dark:hidden"
        />
        <Image
          src="/logoD.svg"
          fill
          alt=""
          className="hidden object-contain dark:block"
        />
      </span>

      <span className="text-lg font-semibold tracking-tight">
        <p>
          Knit<span className="text-primary">Civic</span>
        </p>
        <p className="text-xs">Weaving communities, sparking change.</p>
      </span>
    </Link>
  );
}

export function Navbar() {
  // TODO: replace with real auth state (e.g. from a session/context provider).
  const { data } = authClient.useSession();
  const user = data?.user;
  console.log(user);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <Link
            href="/events/upcomingevents"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Upcoming Events
          </Link>
        </nav>

        <div className="flex items-center gap-3 relative">
          {/* Dark / light switch */}
          <ThemeToggle />

          {user ? (
            // Logged in → avatar dropdown (name, email, links, logout)
            <>
              <UserMenu user={user} />
              <span
                onClick={async () => {
                  // Swap with real auth logic later
                  await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        redirect("/login"); // redirect to login page
                      },
                    },
                  });
                }}
                className="flex items-center gap-2.5 text-sm font-medium text-destructive bg-primary rounded-full px-5 py-2 text-primary-foreground hover:bg-primary/90"
              >
                <LogOut className="size-4" />
                Log out
              </span>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full px-6 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
