import type { PageType } from "@/types/page";
import pocketClient from "./client";
import { PAGE_COLLECTION } from "./consts";

async function getPagePocket(slug: string) {
  return pocketClient
    .collection<PageType>(PAGE_COLLECTION)
    .getFirstListItem(`slug="${slug}"`);
}

export { getPagePocket };
