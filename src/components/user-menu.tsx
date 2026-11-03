"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownPopover,
  DropdownTrigger,
  Separator,
  AvatarRoot,
  AvatarImage,
  AvatarFallback,
} from "@heroui/react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import {
  ChevronDown,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Settings,
} from "lucide-react";

export interface LoggedInUser {
  name: string;
  email: string;
  image?: string | null;
}

const menuLinks = [
  {
    id: "create-event",
    label: "Create Event",
    icon: LayoutDashboard,
    href: "/events/create-event",
  },
  {
    id: "manage-event",
    label: "Manage Events",
    icon: ListChecks,
    href: "/events/manage-event",
  },
  {
    id: "join-event",
    label: "Joined Events",
    icon: Settings,
    href: "/events/join-event",
  },
  {
    id: "profile",
    label: "Profile",
    icon: Settings,
    href: "/profile",
  },
];

export function UserMenu({ user }: { user: LoggedInUser }) {
  const router = useRouter();

  const initials = user.name
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <TooltipProvider>
      <Dropdown>
        {/* Tooltip + Dropdown Trigger */}
        <Tooltip>
          <TooltipTrigger>
            <span className="inline-flex">
              <DropdownTrigger
                aria-label="Open user menu"
                className="group flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card/50 p-1 pr-2 outline-none transition-colors hover:bg-card data-focus-visible:border-ring"
              >
                <AvatarRoot className="size-9 overflow-hidden rounded-full">
                  <AvatarImage src={user.image ?? undefined} alt={user.name} />

                  <AvatarFallback className="flex size-full items-center justify-center bg-accent text-xs font-semibold text-accent-foreground">
                    {initials}
                  </AvatarFallback>
                </AvatarRoot>

                <ChevronDown className="size-4 text-muted-foreground transition-transform group-aria-expanded:rotate-180" />
              </DropdownTrigger>
            </span>
          </TooltipTrigger>

          <TooltipContent side="bottom" sideOffset={8}>
            <p>{user.name}</p>
          </TooltipContent>
        </Tooltip>

        {/* Dropdown Menu */}
        <DropdownPopover placement="bottom end">
          <DropdownMenu className="w-60">
            {/* User Information */}
            <DropdownItem
              id="account"
              className="pointer-events-none flex-col items-start gap-0.5 opacity-100"
            >
              <span className="text-sm font-semibold text-foreground">
                {user.name}
              </span>

              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </DropdownItem>

            <Separator className="my-1.5 bg-border" isDecorative />

            {/* Navigation Links */}
            {menuLinks.map((link) => (
              <DropdownItem key={link.id} id={link.id} href={link.href}>
                <span className="flex items-center gap-2.5 text-sm text-foreground/90">
                  <link.icon className="size-4 text-muted-foreground" />
                  {link.label}
                </span>
              </DropdownItem>
            ))}

            <Separator className="my-1.5 bg-border" isDecorative />

            {/* Logout */}
            <DropdownItem id="logout" onClick={handleLogout}>
              <span className="flex items-center gap-2.5 text-sm font-medium text-destructive">
                <LogOut className="size-4" />
                Log out
              </span>
            </DropdownItem>
          </DropdownMenu>
        </DropdownPopover>
      </Dropdown>
    </TooltipProvider>
  );
}