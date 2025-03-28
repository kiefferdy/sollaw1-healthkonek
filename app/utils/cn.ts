import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function that merges multiple class names together and resolves Tailwind CSS class conflicts.
 * Uses clsx for conditional class names and tailwind-merge to handle conflicting Tailwind classes.
 * 
 * @param inputs - Class name values or objects for conditional class application
 * @returns Merged class string with resolved Tailwind conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}