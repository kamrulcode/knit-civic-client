import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Heart, MapPin, Users } from "lucide-react";
import JoinEventButton from "./JoinEventButton";

type EventDetailsPageProps = {
  params: Promise<{ id: string }>;
};

type Event = {
  _id: string;
  title: string;
  description: string;
  type: string;
  location: string;
  image: string;
  date: string;
  time?: string;
  joined?: number;
  name?: string;
};

function formatDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;
  const response = await fetch("http://localhost:8000/events", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load events (HTTP ${response.status}).`);
  }

  const events: Event[] = await response.json();
  const event = events.find((item) => item._id === id);

  if (!event) notFound();

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6">
      <article className="mx-auto w-full max-w-6xl">
        <Link
          href="/events/upcomingevents"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to your events
        </Link>

        <div className="grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-2">
          <div className="relative min-h-72 overflow-hidden bg-muted sm:min-h-96">
            <img
              src={event.image}
              alt={event.title}
              fetchPriority="high"
              className="absolute inset-0 size-full object-cover"
            />
            <span className="absolute left-0 top-0 rounded-br-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
              {event.type}
            </span>
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              <Heart className="size-3.5" fill="currentColor" />
              Together We Can
            </span>

            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              {event.title}
            </h1>

            <p className="mt-4 leading-7 text-muted-foreground">
              {event.description}
            </p>

            <dl className="mt-8 space-y-5">
              <div className="flex items-center gap-3">
                <CalendarDays className="size-5 shrink-0 text-primary" />
                <div>
                  <dt className="text-xs text-muted-foreground">
                    Date and time
                  </dt>
                  <dd className="mt-1 text-sm font-medium">
                    {formatDate(event.date)}
                    {event.time ? ` at ${event.time}` : ""}
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="size-5 shrink-0 text-primary" />
                <div>
                  <dt className="text-xs text-muted-foreground">Location</dt>
                  <dd className="mt-1 text-sm font-medium">{event.location}</dd>
                </div>
              </div>
              {typeof event.joined === "number" && (
                <div className="flex items-center gap-3">
                  <Users className="size-5 shrink-0 text-primary" />
                  <div>
                    <dt className="text-xs text-muted-foreground">
                      Participants
                    </dt>
                    <dd className="mt-1 text-sm font-medium">
                      {event.joined} people already joined
                    </dd>
                  </div>
                </div>
              )}
              {event.name && (
                <div>
                  <dt className="text-xs text-muted-foreground">Organizer</dt>
                  <dd className="mt-1 text-sm font-medium">{event.name}</dd>
                </div>
              )}
            </dl>

            <JoinEventButton event={{ ...event, id: event._id }} />
          </div>
        </div>
      </article>
    </main>
  );
}
