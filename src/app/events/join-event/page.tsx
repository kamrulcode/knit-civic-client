"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  CalendarDays,
  MapPin,
  ArrowRight,
  CheckCircle2,
  CalendarHeart,
  Leaf,
  Heart,
  Sprout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroPage from "@/components/events/HeroPage";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

type EventStatus = "upcoming" | "completed";

type JoinedEvent = {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  image: string;
  status: EventStatus;
};

const joinedEvents: JoinedEvent[] = [
  {
    id: "1",
    title: "Tree Plantation Drive",
    category: "Plantation",
    date: "2026-11-15",
    time: "9:00 AM",
    location: "Central Park, Green City",
    organizer: "Green Earth",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Winter Clothes Distribution",
    category: "Donation",
    date: "2026-11-18",
    time: "10:00 AM",
    location: "Helping Hands Shelter",
    organizer: "Helping Hands",
    image: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=900",
    status: "upcoming",
  },
  {
    id: "3",
    title: "Clean Our Neighborhood",
    category: "Cleanup",
    date: "2026-11-20",
    time: "8:00 AM",
    location: "Main Street, Green City",
    organizer: "Green Earth",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900",
    status: "upcoming",
  },
  {
    id: "4",
    title: "Community Cleanup Day",
    category: "Cleanup",
    date: "2026-11-25",
    time: "9:00 AM",
    location: "City Park, Green City",
    organizer: "Green Earth",
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=900",
    status: "upcoming",
  },
  {
    id: "5",
    title: "Brighter Future Education Drive",
    category: "Education",
    date: "2026-10-10",
    time: "10:00 AM",
    location: "Little Stars School",
    organizer: "Bright Futures",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900",
    status: "completed",
  },
  {
    id: "6",
    title: "Food for the Needy",
    category: "Donation",
    date: "2026-10-05",
    time: "12:00 PM",
    location: "Hope Community Kitchen",
    organizer: "Helping Hands",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900",
    status: "completed",
  },
];

type FilterType = "all" | "upcoming" | "completed";

const categoryColors: Record<string, string> = {
  Plantation: "bg-[#13b981]",
  Donation: "bg-[#f16b79]",
  Cleanup: "bg-[#20b6d5]",
  Education: "bg-[#9b65db]",
  Charity: "bg-[#ff397e]",
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function JoinedEventsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const [sortOrder, setSortOrder] = useState("soonest");

  const {data}= authClient.useSession();
  // Set this to [] to preview the empty state.
  const [events,setEvents] = useState<JoinedEvent[]>([]);
useEffect(() => {
    async function fetchJoinedEvents() {
      try {
        const res = await fetch(`http://localhost:8000/joined-events/${data?.user?.email}`);

        if (!res.ok) {
          throw new Error("Failed to fetch joined events.");
        }

        const joinEventsData: JoinedEvent[] = await res.json();

        setEvents(joinEventsData);
      } catch (error) {
        
        toast.error(
          error instanceof Error
            ? error.message
            : "Something went wrong."
        );
      } finally {
       
        toast.success("Joined events loaded successfully!");
      }
  const counts = {
    all: events.length,
    upcoming: events.filter((e) => e.status === "upcoming").length,
    completed: events.filter((e) => e.status === "completed").length,
  };

  const filteredEvents = useMemo(() => {
    let result = [...events];

    if (activeFilter !== "all") {
      result = result.filter((event) => event.status === activeFilter);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return sortOrder === "soonest" ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [events, activeFilter, sortOrder]);

  const filters: {
    label: string;
    value: FilterType;
    count: number;
  }[] = [
    { label: "All Events", value: "all", count: counts.all },
    {
      label: "Upcoming",
      value: "upcoming",
      count: counts.upcoming,
    },
    {
      label: "Completed",
      value: "completed",
      count: counts.completed,
    },
  ];

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-12">
      <HeroPage
        title="Your Joined"
        highlight="Events"
        badge="Together We Can"
        description="Explore the events you've joined, stay connected with your community, and make a meaningful difference."
      />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {events.length === 0 ? (
          /* EMPTY STATE */
          <EmptyState />
        ) : (
          <>
            {/* PAGE HEADER */}
            <div className="mb-7">
              <div className="flex items-center gap-3">
                <CalendarCheck size={26} className="text-primary" />

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Your Joined Events
                </h1>
              </div>

              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Here are the events you&apos;ve joined and are participating in.
              </p>
            </div>

            {/* FILTERS AND SORT */}
            <div className="mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
              {/* Filter tabs */}
              <div className="flex flex-wrap items-center gap-2.5">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                      activeFilter === filter.value
                        ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/10"
                        : "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-foreground"
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>

              {/* Sorting */}
              <div className="flex items-center gap-3">
                <label
                  htmlFor="event-sort"
                  className="shrink-0 text-sm font-semibold text-muted-foreground"
                >
                  Sort by:
                </label>

                <select
                  id="event-sort"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="h-12 w-full min-w-50 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary"
                >
                  <option value="soonest">Event Date (Soonest)</option>
                  <option value="latest">Event Date (Latest)</option>
                </select>
              </div>
            </div>

            {/* EVENT GRID */}
            {filteredEvents.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card px-5 py-16 text-center">
                <CalendarHeart size={48} className="mx-auto text-primary" />

                <h2 className="mt-5 text-xl font-bold">
                  No {activeFilter} events
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Try selecting another category to see your joined events.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {filteredEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} wide={index >= 4} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

/* EVENT CARD */
function EventCard({
  event,
  wide = false,
}: {
  event: JoinedEvent;
  wide?: boolean;
}) {
  const isCompleted = event.status === "completed";

  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        wide ? "xl:col-span-2" : ""
      }`}
    >
      {/* Image */}
      <div className="relative h-[162px] overflow-hidden bg-muted">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Category */}
        <span
          className={`absolute left-0 top-0 min-w-43.75 rounded-br-xl px-4 py-4 text-base font-semibold text-white ${
            categoryColors[event.category] || "bg-[#ff397e]"
          }`}
        >
          {event.category}
        </span>

        {/* Status */}
        <span
          className={`absolute right-2 top-2 flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-bold ${
            isCompleted
              ? "bg-muted text-muted-foreground"
              : "bg-card text-emerald-600 dark:text-emerald-400"
          }`}
        >
          <CheckCircle2 size={14} />
          {isCompleted ? "Completed" : "Joined"}
        </span>
      </div>

      {/* Content */}
      <div className="flex min-h-55 flex-col p-4">
        <h2 className="line-clamp-1 text-xl font-bold tracking-tight">
          {event.title}
        </h2>

        {/* Event details */}
        <div className="mt-5 space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays size={17} className="shrink-0 text-primary" />
            <span>
              {formatDate(event.date)} • {event.time}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={17} className="shrink-0 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        {/* Organizer and button */}
        <div className="mt-auto flex items-end justify-between gap-2 pt-6">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Organized by</p>

            <p className="mt-1 truncate text-sm font-semibold text-foreground">
              {event.organizer}
            </p>
          </div>

          <Button className="h-11 shrink-0 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <Link href={`/events/${event.id}`}>
              View Details
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

/* EMPTY STATE */
function EmptyState() {
  return (
    <section className="relative flex min-h-73.75 flex-col items-center justify-center overflow-hidden rounded-2xl bg-card px-5 py-12 text-center">
      {/* Left decorative leaf */}
      <div className="pointer-events-none absolute -left-3 bottom-0 text-[#087b86]/40">
        <Sprout size={185} strokeWidth={1.2} />
      </div>

      {/* Right decorative leaf */}
      <div className="pointer-events-none absolute -right-3 bottom-0 -scale-x-100 text-[#a02d68]/30">
        <Sprout size={185} strokeWidth={1.2} />
      </div>

      {/* Center content */}
      <div className="relative z-10">
        <div className="mb-4 flex justify-center">
          <CalendarHeart
            size={55}
            strokeWidth={1.2}
            className="text-primary"
          />
        </div>

        <h2 className="text-2xl font-bold text-foreground">
          No Joined Events Yet?
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-lg">
          Get involved and make a difference. Find an event that inspires you!
        </p>

        <Button className="mt-5 h-14.5 rounded-xl bg-primary px-7 text-base font-bold text-primary-foreground transition hover:bg-primary/90">
          <Link href="/events">
            Explore Events
            <ArrowRight size={19} className="ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
