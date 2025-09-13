import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_URL } from "@/pocketbase/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatVND(n: number = 0) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(n);
}

export function convertToFileUrl(record: {
  id: string;
  collectionName: string;
  file: unknown;
}) {
  if (!record?.id) return;
  return `${API_URL}/api/files/${record?.collectionName}/${record?.id}/${record?.file}`;
}

export function slugify(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function isValidUrl(str: string) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}
