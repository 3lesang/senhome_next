import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl.clone();

  // Allow main app
  if (host.startsWith("web-dev.senhome.vn")) {
    return NextResponse.next();
  }

  const subdomain = host.split(".")[0];

  if (!subdomain || subdomain === "www") {
    return NextResponse.next();
  }

  // Rewrite to dynamic route
  url.pathname = `/${subdomain}`;
  return NextResponse.rewrite(url);
}
