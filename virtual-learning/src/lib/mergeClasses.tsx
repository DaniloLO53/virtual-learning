import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// it resolves potential conflicts from clsx merge css styles
export function cn(...input: ClassValue[]) {
  return twMerge(clsx(input)); // clsx transforms strings array to a string
}