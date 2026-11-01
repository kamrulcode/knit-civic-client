"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type EventDetails = {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  type: string;
  image: string;
  joined?: number;
  name?: string;
};

type Props = {
  event: EventDetails;
};

const API_URL = "http://localhost:8000";

export default function JoinEventButton({ event }: Props) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [isJoined, setIsJoined] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = session?.user;

  const checkRegistration = useCallback(async () => {
    if (isPending) return;

    if (!user?.email) {
      setIsJoined(false);
      setIsChecking(false);
      return;
    }

    setIsChecking(true);

    try {
      const params = new URLSearchParams({
        eventId: event.id,
        userEmail: user.email,
      });

      const res = await fetch(
        `${API_URL}/join-event/status?${params.toString()}`,
        { cache: "no-store" },
      );

      if (!res.ok) {
        throw new Error("Could not check registration status.");
      }

      const data = await res.json();
      setIsJoined(data.joined === true);
    } catch (error) {
      console.error(error);
      toast.error("Could not check your registration status.");
    } finally {
      setIsChecking(false);
    }
  }, [event.id, isPending, user?.email]);

  useEffect(() => {
    void checkRegistration();
  }, [checkRegistration]);

  const handleJoinLeave = async () => {
    if (isPending || isSubmitting) return;

    if (!user?.email) {
      toast.error("Please log in to join this event.");

      router.push(
        `/login?callbackURL=${encodeURIComponent(`/events/${event.id}`)}`,
      );

      return;
    }

    setIsSubmitting(true);

    try {
      const leaving = isJoined;

      const res = await fetch(`${API_URL}/join-event`, {
        method: leaving ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          leaving
            ? {
                eventId: event.id,
                userEmail: user.email,
              }
            : {
                event: {
                  id: event.id,
                  title: event.title,
                  description: event.description,
                  date: event.date,
                  time: event.time ?? null,
                  location: event.location,
                  type: event.type,
                  image: event.image,
                  joined: event.joined ?? 0,
                  organizer: event.name ?? null,
                },
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              },
        ),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.message ??
            (leaving
              ? "Failed to leave the event."
              : "Failed to join the event."),
        );
      }

      setIsJoined(!leaving);

      toast.success(
        data.message ??
          (leaving
            ? "You have left the event."
            : "You have successfully joined the event."),
      );

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isPending || isChecking || isSubmitting;

  return (
    <Button
      type="button"
      onClick={handleJoinLeave}
      disabled={isLoading}
      variant={isJoined ? "outline" : "default"}
      className="mt-8 h-10 w-fit rounded-full px-6 text-sm font-semibold"
    >
      {isSubmitting
        ? "Please wait..."
        : isChecking || isPending
          ? "Checking..."
          : isJoined
            ? "Joined — Leave Event"
            : "Join Event"}
    </Button>
  );
}
