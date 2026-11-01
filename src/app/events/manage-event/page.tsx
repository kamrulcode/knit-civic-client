"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Grid2X2,
  ListFilter,
  CalendarDays,
  MapPin,
  Pencil,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Plus,
  CalendarX,
} from "lucide-react";
import { toast } from "sonner";
import HeroPage from "@/components/events/HeroPage";

type Event = {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  time: string;
  location: string;
  description: string;
  createdAt: string;
};

const initialEvents: Event[] = [
  {
    id: "1",
    title: "Tree Plantation Drive",
    category: "Plantation",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900",
    date: "2026-11-15",
    time: "9:00 AM",
    location: "Central Park, Green City",
    description: "Let's plant trees and build a greener world for everyone.",
    createdAt: "2026-10-20",
  },
  {
    id: "2",
    title: "Winter Clothes Distribution",
    category: "Donation",
    image: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=900",
    date: "2026-11-18",
    time: "10:00 AM",
    location: "Helping Hands Shelter",
    description: "Share warmth and kindness with those who need it most.",
    createdAt: "2026-10-22",
  },
  {
    id: "3",
    title: "Clean Our Neighborhood",
    category: "Cleanup",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900",
    date: "2026-11-20",
    time: "8:00 AM",
    location: "Main Street, Green City",
    description: "Join us to make our neighborhood clean and beautiful.",
    createdAt: "2026-10-25",
  },
  {
    id: "4",
    title: "Brighter Future Education Drive",
    category: "Education",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900",
    date: "2026-12-02",
    time: "10:00 AM",
    location: "Little Stars School",
    description: "Help children learn, grow and build a brighter future.",
    createdAt: "2026-10-28",
  },
  {
    id: "5",
    title: "Food for the Needy",
    category: "Donation",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900",
    date: "2026-10-15",
    time: "12:00 PM",
    location: "Hope Community Kitchen",
    description: "Provide nutritious meals to families in need.",
    createdAt: "2026-10-01",
  },
  {
    id: "6",
    title: "Community Health Awareness",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900",
    date: "2026-10-10",
    time: "9:00 AM",
    location: "Community Health Center",
    description: "Promoting healthy living through awareness and education.",
    createdAt: "2026-09-25",
  },
];

const categories = [
  "All Event Types",
  "Plantation",
  "Donation",
  "Cleanup",
  "Education",
  "Healthcare",
];

const categoryColors: Record<string, string> = {
  Plantation: "bg-[#13b981]",
  Donation: "bg-[#f16b79]",
  Cleanup: "bg-[#20b6d5]",
  Education: "bg-[#9b65db]",
  Healthcare: "bg-[#0693e3]",
};

function isUpcoming(date: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(`${date}T00:00:00`) >= today;
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ManageEventsPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Event Types");
  const [sort, setSort] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const EVENTS_PER_PAGE = 4;

  // SEARCH + FILTER + SORT
  const filteredEvents = useMemo(() => {
    let result = [...events];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query),
      );
    }

    if (category !== "All Event Types") {
      result = result.filter((event) => event.category === category);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return sort === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [events, search, category, sort]);

  // PAGINATION
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE,
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategory = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleSort = (value: string) => {
    setSort(value);
    setCurrentPage(1);
  };

  // DELETE EVENT
  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event? This action cannot be undone.",
    );

    if (!confirmed) return;

    setEvents((prev) => prev.filter((event) => event.id !== id));

    toast.success("Event deleted successfully!");

    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-10">
      <HeroPage
        title="Manage Your"
        highlight="Events"
        badge="Your Community Impact"
        description="Manage the events you've created, track participation, and keep your community engaged."
      />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* SEARCH AND FILTER BAR */}
        <section className="mb-7 grid grid-cols-1 gap-4 rounded-2xl border border-border bg-card p-4 md:grid-cols-[minmax(0,1fr)_220px_220px]">
          {/* Search */}
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search your events..."
              className="h-[60px] w-full rounded-xl border border-border bg-background pl-12 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          {/* Category filter */}
          <div className="relative">
            <Grid2X2
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
            />

            <select
              value={category}
              onChange={(e) => handleCategory(e.target.value)}
              className="h-[60px] w-full appearance-none rounded-xl border border-border bg-background pl-11 pr-9 text-sm text-foreground outline-none focus:border-primary"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <ChevronDownIcon />
          </div>

          {/* Sort */}
          <div className="relative">
            <ListFilter
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
            />

            <select
              value={sort}
              onChange={(e) => handleSort(e.target.value)}
              className="h-[60px] w-full appearance-none rounded-xl border border-border bg-background pl-11 pr-9 text-sm text-foreground outline-none focus:border-primary"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            <ChevronDownIcon />
          </div>
        </section>

        {/* HEADING */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Your Created Events ({filteredEvents.length})
            </h1>

            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Manage the events you&apos;ve created and keep your community engaged.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            <Plus size={18} />
            Create Event
          </Link>
        </div>

        {/* EVENT LIST */}
        {paginatedEvents.length > 0 ? (
          <div className="space-y-5">
            {paginatedEvents.map((event) => {
              const upcoming = isUpcoming(event.date);

              return (
                <article
                  key={event.id}
                  className="grid grid-cols-1 gap-5 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/40 lg:grid-cols-[260px_minmax(0,1fr)_195px] lg:items-center"
                >
                  {/* IMAGE */}
                  <div className="relative h-[180px] overflow-hidden rounded-lg bg-muted">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />

                    <span
                      className={`absolute left-0 top-0 min-w-[155px] rounded-br-xl px-4 py-4 text-base font-semibold text-white ${
                        categoryColors[event.category] || "bg-[#ff397e]"
                      }`}
                    >
                      {event.category}
                    </span>
                  </div>

                  {/* EVENT INFORMATION */}
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold leading-snug sm:text-2xl">
                      {event.title}
                    </h2>

                    <div className="mt-3 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
                      <CalendarDays size={16} className="text-primary" />
                      {formatDate(event.date)} • {event.time}
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={17} className="shrink-0 text-primary" />
                      <span>{event.location}</span>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {event.description}
                    </p>

                    <p className="mt-2 text-xs text-muted-foreground">
                      Created on {formatDate(event.createdAt)}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-col gap-2">
                    <div className="mb-2 flex justify-start lg:justify-center">
                      <span
                        className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold ${
                          upcoming
                            ? "bg-[#064b3b]/70 text-[#13c98b]"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            upcoming ? "bg-[#13c98b]" : "bg-[#91a2b8]"
                          }`}
                        />
                        {upcoming ? "Upcoming" : "Completed"}
                      </span>
                    </div>

                    <Link
                      href={`/events/edit/${event.id}`}
                      className="flex h-10 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(event.id)}
                      className="flex h-10 items-center justify-center gap-2 rounded-xl border border-border text-sm font-semibold text-muted-foreground transition hover:border-red-500/60 hover:bg-red-500/10 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                    <Link
                      href={`/events/${event.id}`}
                      className="flex h-10 items-center justify-center gap-2 rounded-xl border border-border text-sm font-semibold text-muted-foreground transition hover:border-primary hover:text-foreground"
                    >
                      <Eye size={17} />
                      View Details
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* EMPTY SEARCH RESULT */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card px-5 py-20 text-center">
            <CalendarX size={48} className="text-primary" />

            <h2 className="mt-5 text-xl font-bold">No Events Found</h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              We couldn&apos;t find any events matching your search. Try another
              keyword or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All Event Types");
                setCurrentPage(1);
              }}
              className="mt-5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={19} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-bold transition ${
                    currentPage === page
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function ChevronDownIcon() {
  return (
    <ChevronRight
      size={17}
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-muted-foreground"
    />
  );
}
