import PocketBase from "pocketbase";

export const API_URL = "https://b0m772h91854471.pocketbasecloud.com";

const pocketClient = new PocketBase(API_URL);

pocketClient.autoCancellation(false);

export default pocketClient;
