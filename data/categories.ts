import type { Category } from "./types";

export const categories: Category[] = [
  {
    id: "design",
    label: "Design",
    icon: "color-palette-outline",
    color: "#9C27B0",
  },
  {
    id: "art",
    label: "Art",
    icon: "brush-outline",
    color: "#E91E63",
  },
  {
    id: "sports",
    label: "Sports",
    icon: "basketball-outline",
    color: "#F76B10",
  },
  {
    id: "music",
    label: "Music",
    icon: "musical-notes-outline",
    color: "#7C4DFF",
  },
  {
    id: "food",
    label: "Food",
    icon: "restaurant-outline",
    color: "#29A65A",
  },
  {
    id: "others",
    label: "Others",
    icon: "apps-outline",
    color: "#3E82F7",
  },
];

export const getCategoryById = (id: string) =>
  categories.find((c) => c.id === id);
