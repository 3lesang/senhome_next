import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl.clone();

  // Main app domain
  if (host.startsWith("web-dev.senhome.vn")) {
    return NextResponse.next();
  }

  // Extract subdomain
  const subdomain = host.split(".")[0];

  // Skip root domain or www
  if (!subdomain || subdomain === "www") {
    return NextResponse.next();
  }

  // Directly map subdomain → folder in /landing
  url.pathname = `/landing/${subdomain}`;
  return NextResponse.rewrite(url);
}
