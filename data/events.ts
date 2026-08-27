import { Images } from "@/constants/images";
import type { EventItem } from "./types";

const memberAvatars = [
  Images.avatarAlexLee,
  Images.avatarMichealUllasi,
  Images.avatarDavidSilbia,
];

export const events: EventItem[] = [
  {
    id: "e-band-concert",
    title: "International Band Music Concert 22",
    category: "music",
    image: Images.eventHeroBandConcert,
    heroImage: Images.eventHeroBandConcert,
    startDate: "2022-10-12",
    endDate: "2022-10-15",
    location: "ABC Avenue, Kigali",
    venue: "ABC Avenue",
    price: 5000,
    currency: "RWF",
    isFeatured: true,
    description:
      "Utricies arcu venenatis in lorem faucibus lobortis at. East odio varius nisl congue aliquam nunc est sit pull convallis magna. Est scelerisque dignissim non ribh arcu venenatis in lorem faucibus lobortis at. East odio...",
    organizerId: "u-tamim",
    membersJoinedAvatars: memberAvatars,
    membersJoinedCount: 157999,
    ticketTiers: [
      { id: "vip", label: "VIP Ticket", price: 50, seatsAvailable: 40 },
      {
        id: "economy",
        label: "Economy Ticket",
        price: 20,
        seatsAvailable: 120,
      },
    ],
    latitude: 23.793,
    longitude: 90.404,
  },
  {
    id: "e-shere-bangla",
    title: "Shere Bangla Band Music Concert",
    category: "music",
    image: Images.eventHeroShereBangla,
    heroImage: Images.eventHeroShereBangla,
    startDate: "2022-10-25",
    endDate: "2022-10-27",
    location: "Mirpur Cricket Stadium, Dhaka",
    venue: "Mirpur Cricket Stadium",
    price: 10,
    currency: "USD",
    isFeatured: true,
    description:
      "Utricies arcu venenatis in lorem faucibus lobortis at. East odio varius nisl congue aliquam nunc est sit pull convallis magna. Est scelerisque dignissim non ribh arcu venenatis in lorem faucibus lobortis at. East odio...",
    organizerId: "u-tamim",
    membersJoinedAvatars: memberAvatars,
    membersJoinedCount: 15700,
    ticketTiers: [
      { id: "vip", label: "VIP Ticket", price: 55, seatsAvailable: 25 },
      { id: "economy", label: "Economy Ticket", price: 25, seatsAvailable: 90 },
    ],
    latitude: 23.807,
    longitude: 90.365,
  },
  {
    id: "e-designers-meetup",
    title: "Designers Meetup 2022",
    category: "design",
    image: Images.eventDesignersMeetup,
    heroImage: Images.eventDesignersMeetup,
    startDate: "2022-10-03",
    location: "Gulshan, Dhaka",
    price: 10,
    currency: "USD",
    description:
      "A gathering of product and visual designers to share work, swap feedback, and talk shop over coffee.",
    organizerId: "u-tamim",
    membersJoinedAvatars: memberAvatars,
    membersJoinedCount: 240,
    ticketTiers: [
      {
        id: "economy",
        label: "Standard Ticket",
        price: 10,
        seatsAvailable: 60,
      },
    ],
  },
  {
    id: "e-dribbblers-meetup",
    title: "Dribbblers Meetup 2022",
    category: "design",
    image: Images.eventDribbblersMeetup,
    heroImage: Images.eventDribbblersMeetup,
    startDate: "2022-10-07",
    location: "Banani, Dhaka",
    price: 15,
    currency: "USD",
    description: "Monthly meetup for the local Dribbble design community.",
    organizerId: "u-tamim",
    membersJoinedAvatars: memberAvatars,
    membersJoinedCount: 180,
    ticketTiers: [
      {
        id: "economy",
        label: "Standard Ticket",
        price: 15,
        seatsAvailable: 45,
      },
    ],
  },
  {
    id: "e-food-competition",
    title: "Food Competition Event",
    category: "food",
    image: Images.eventFoodCompetition,
    heroImage: Images.eventFoodCompetition,
    startDate: "2022-10-10",
    location: "Mirpur, Dhaka",
    price: 28,
    currency: "USD",
    description:
      "A city-wide cooking competition featuring local chefs and food trucks.",
    organizerId: "u-tamim",
    membersJoinedAvatars: memberAvatars,
    membersJoinedCount: 320,
    ticketTiers: [
      { id: "economy", label: "Entry Ticket", price: 28, seatsAvailable: 80 },
    ],
  },
  {
    id: "e-basketball-final",
    title: "Basketball Final Match",
    category: "sports",
    image: Images.eventBasketballFinal,
    heroImage: Images.eventBasketballFinal,
    startDate: "2022-10-10",
    location: "Uttara, Dhaka",
    price: 9,
    currency: "USD",
    description:
      "The season-ending championship match at the Uttara sports complex.",
    organizerId: "u-tamim",
    membersJoinedAvatars: memberAvatars,
    membersJoinedCount: 410,
    ticketTiers: [
      {
        id: "economy",
        label: "Standard Ticket",
        price: 9,
        seatsAvailable: 150,
      },
    ],
  },
  {
    id: "e-arb-stunt-riders",
    title: "ARB Stunt Riders Event",
    category: "sports",
    image: Images.eventArbStuntRiders,
    heroImage: Images.eventArbStuntRiders,
    startDate: "2022-10-22",
    location: "M Baddo, Dhaka",
    price: 30,
    currency: "USD",
    description:
      "Freestyle motorbike stunt riders show off tricks in an open-air arena.",
    organizerId: "u-tamim",
    membersJoinedAvatars: memberAvatars,
    membersJoinedCount: 95,
    ticketTiers: [
      {
        id: "economy",
        label: "Standard Ticket",
        price: 30,
        seatsAvailable: 70,
      },
    ],
  },
  {
    id: "e-international-music-co",
    title: "International Music Co.",
    category: "music",
    image: Images.eventInternationalMusicCo,
    heroImage: Images.eventInternationalMusicCo,
    startDate: "2022-10-30",
    location: "Gulshan, Dhaka",
    price: 12,
    currency: "USD",
    description:
      "A showcase of international touring acts performing one night only.",
    organizerId: "u-tamim",
    membersJoinedAvatars: memberAvatars,
    membersJoinedCount: 500,
    ticketTiers: [
      {
        id: "economy",
        label: "Standard Ticket",
        price: 12,
        seatsAvailable: 200,
      },
    ],
  },
  {
    id: "e-football-final",
    title: "Footaball Final Match",
    category: "sports",
    image: Images.eventFootballFinal,
    heroImage: Images.eventFootballFinal,
    startDate: "2022-10-03",
    location: "Gulshan, Dhaka",
    price: 10,
    currency: "USD",
    description:
      "Local league final — two unbeaten sides face off for the title.",
    organizerId: "u-tamim",
    membersJoinedAvatars: memberAvatars,
    membersJoinedCount: 610,
    ticketTiers: [
      {
        id: "economy",
        label: "Standard Ticket",
        price: 10,
        seatsAvailable: 300,
      },
    ],
  },
];

export const getEventById = (id: string | undefined) =>
  events.find((e) => e.id === id);
export const featuredEvents = events.filter((e) => e.isFeatured);
export const getEventsByCategory = (categoryId: string) =>
  events.filter((e) => e.category === categoryId);
export const getEventsByOrganizer = (organizerId: string) =>
  events.filter((e) => e.organizerId === organizerId);
