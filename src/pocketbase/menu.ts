import type { MenuType } from "@/types/menu";
import pocketClient from "./client";
import { MENU_COLLECTION } from "./consts";

type MenuData = {
  items: MenuType[];
};

async function getMenuPocket(q: string) {
  return pocketClient.collection<MenuData>(MENU_COLLECTION).getFirstListItem(q);
}

export { getMenuPocket };
