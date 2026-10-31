"use client";

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
  ChevronDown,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Settings,
} from "lucide-react";

export interface LoggedInUser {
  name: string;
  email: string;
  avatarUrl: string;
}

export const mockUser: LoggedInUser = {
  name: "Ayman Rahman",
  email: "ayman.rahman@knitcivic.org",
  avatarUrl: "/avatars/v1.svg",
};

const menuLinks = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "#" },
  { id: "my-events", label: "My Events", icon: ListChecks, href: "#" },
  { id: "settings", label: "Settings", icon: Settings, href: "#" },
];

export function UserMenu({ user }: { user: LoggedInUser }) {
  return (
    <Dropdown>
      <DropdownTrigger
        aria-label="Open user menu"
        className="group flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card/50 p-1 pr-2 outline-none transition-colors hover:bg-card data-focus-visible:border-ring"
      >
        <AvatarRoot className="size-9 overflow-hidden rounded-full">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="flex size-full items-center justify-center bg-accent text-accent-foreground text-xs font-semibold text-white">
            {user.name
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")}
          </AvatarFallback>
        </AvatarRoot>
        <ChevronDown className="size-4 text-muted-foreground transition-transform group-aria-expanded:rotate-180" />
      </DropdownTrigger>

      <DropdownPopover placement="bottom end">
        <DropdownMenu className="w-60">
          {/* Header: name + email */}
          <DropdownItem
            id="account"
            className="pointer-events-none flex-col items-start gap-0.5 opacity-100"
          >
            <span className="text-sm font-semibold text-foreground">
              {user.name}
            </span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </DropdownItem>

          <Separator className="my-1.5 bg-border" isDecorative />

          {/* Three links */}
          {menuLinks.map((link) => (
            <DropdownItem key={link.id} id={link.id} href={link.href}>
              <span className="flex items-center gap-2.5 rounded-full text-sm text-foreground/90 data-hovered:text-foreground">
                <link.icon className="size-4 text-muted-foreground" />
                {link.label}
              </span>
            </DropdownItem>
          ))}

          <Separator className="my-1.5 bg-border" isDecorative />

          {/* Logout */}
          <DropdownItem
            id="logout"
            onAction={() => {
              // Swap with real auth logic later
              window.location.reload();
            }}
          >
            <span className="flex items-center gap-2.5 text-sm font-medium text-destructive">
              <LogOut className="size-4" />
              Log out
            </span>
          </DropdownItem>
        </DropdownMenu>
      </DropdownPopover>
    </Dropdown>
  );
}
