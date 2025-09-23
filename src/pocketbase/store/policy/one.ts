import pocketClient from "@/pocketbase/client";
import { POLICY_COLLECTION } from "@/pocketbase/constants";
import type { PolicyType } from "@/types/store";

async function getOnePolicyPocket(slug: string) {
  return pocketClient
    .collection<PolicyType>(POLICY_COLLECTION)
    .getFirstListItem(`slug="${slug}"`);
}

export { getOnePolicyPocket };
