/**
 * Shared domain types for EventWave.
 *
 * These model the shape we expect a future Firebase/Firestore backend to
 * return, so the mock data in this folder can be swapped for real
 * `getDocs()`/`onSnapshot()` results later with minimal changes to the
 * screens that consume them.
 */

export type CategoryId =
  | "design"
  | "art"
  | "sports"
  | "music"
  | "food"
  | "others";

export type Category = {
  id: string;
  label: string;
  icon: string;
  color: string;
};

export type EventUser = {
  id: string;
  name: string;
  avatar: number; // require() result
  followers: number;
  following: number;
  eventsCount: number;
  isOrganizer?: boolean;
  about?: string;
};

export type EventTicketTier = {
  id: "vip" | "economy";
  label: string;
  price: number;
  seatsAvailable: number;
};

export type EventItem = {
  id: string;
  title: string;
  category: CategoryId;
  image: number; // require() result, used as list thumbnail
  heroImage?: number; // require() result, used as detail/hero backdrop
  startDate: string; // ISO date
  endDate?: string; // ISO date, for multi-day events
  time?: string;
  location: string;
  venue?: string;
  price: number;
  currency: string;
  description: string;
  organizerId: string;
  membersJoinedAvatars: number[];
  membersJoinedCount: number;
  isFeatured?: boolean;
  ticketTiers: EventTicketTier[];
  latitude?: number;
  longitude?: number;
};

export type BookingStatus = "upcoming" | "past" | "booked";

export type Booking = {
  id: string;
  eventId: string;
  tierId: EventTicketTier["id"];
  seats: number;
  totalPrice: number;
  purchasedAt: string;
  status: BookingStatus;
};

export type Review = {
  id: string;
  eventId?: string;
  authorId: string;
  rating: number; // 1-5
  comment: string;
  date: string;
};

export type NotificationItem = {
  id: string;
  type: "follow" | "invite" | "comment" | "like" | "reminder";
  fromUserId: string;
  message: string;
  timeAgo: string;
  isNew?: boolean;
  requiresAction?: boolean;
  eventId?: string;
};

export type PaymentMethodType = "apple-pay" | "google-pay" | "paypal" | "card";

export type SavedCard = {
  id: string;
  brand: "visa" | "mastercard";
  holder: string;
  last4: string;
  expiry: string;
};

export type Country = {
  code: string;
  name: string;
  flag: string; // emoji
};
