import { DifficultyLevel } from "@/types/quiz";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get difficulty color
export const getDifficultyColor = (difficulty: DifficultyLevel) => {
  switch (difficulty) {
      case "Beginner":
          return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Intermediate":
          return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Advanced":
          return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
          return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};