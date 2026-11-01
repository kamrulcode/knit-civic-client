export type EventCategoryId =
  | "plantation"
  | "donation"
  | "cleanup"
  | "education";

export interface Event {
  id: string;
  title: string;
  description: string;
  type: string;
  location: string;
  image: string;
  date: string;
  name?: string;
  email?: string;
  profileImg?: string;
  joined?: number;
}

export const eventCategories: {
  id: EventCategoryId;
  label: string;
  badgeClass: string;
}[] = [
  {
    id: "plantation",
    label: "Plantation",
    badgeClass: "bg-emerald-500 text-white",
  },
  { id: "donation", label: "Donation", badgeClass: "bg-red-400 text-white" },
  { id: "cleanup", label: "Cleanup", badgeClass: "bg-sky-400 text-white" },
  {
    id: "education",
    label: "Education",
    badgeClass: "bg-violet-400 text-white",
  },
];

export const categoryById = new Map(
  eventCategories.map((category) => [category.id, category]),
);

const categoryAliases: Record<string, EventCategoryId> = {
  plantation: "plantation",
  environment: "plantation",
  donation: "donation",
  charity: "donation",
  cleanup: "cleanup",
  education: "education",
};

export function getEventCategoryId(type: string): EventCategoryId | undefined {
  return categoryAliases[type.trim().toLowerCase()];
}

const EVENTS_URL = "http://localhost:8000/events";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseEvent(value: unknown): Event {
  if (!isRecord(value)) {
    throw new Error("The events response contains an invalid event.");
  }

  const id =
    typeof value.id === "string"
      ? value.id
      : typeof value._id === "string"
        ? value._id
        : undefined;

  if (
    !id ||
    typeof value.title !== "string" ||
    typeof value.description !== "string" ||
    typeof value.type !== "string" ||
    typeof value.location !== "string" ||
    typeof value.image !== "string" ||
    typeof value.date !== "string"
  ) {
    throw new Error("The events response contains incomplete event data.");
  }

  return {
    id,
    title: value.title,
    description: value.description,
    type: value.type,
    location: value.location,
    image: value.image,
    date: value.date,
    name: typeof value.name === "string" ? value.name : undefined,
    email: typeof value.email === "string" ? value.email : undefined,
    profileImg:
      typeof value.profileImg === "string" ? value.profileImg : undefined,
    joined: typeof value.joined === "number" ? value.joined : undefined,
  };
}

export async function fetchEvents(signal?: AbortSignal): Promise<Event[]> {
  const response = await fetch(EVENTS_URL, { signal, cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to load events (HTTP ${response.status}).`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("The events response must be a list.");
  }

  return data.map(parseEvent);
}
