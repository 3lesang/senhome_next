import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl.clone();

  // ⚡ Skip Next.js internals and static files
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/favicon.ico") ||
    url.pathname.startsWith("/assets") || // if you serve from /public/assets
    url.pathname.startsWith("/api") // let API routes work normally
  ) {
    return NextResponse.next();
  }

  // ✅ Main app domain → serve normally
  if (host.startsWith("web-dev.senhome.vn")) {
    return NextResponse.next();
  }

  // Extract subdomain (e.g., kedanang.senhome.vn → "kedanang")
  const subdomain = host.split(".")[0];

  // Skip root domain or www
  if (!subdomain || subdomain === "www") {
    return NextResponse.next();
  }

  // ✅ Rewrite subdomain to dynamic route
  url.pathname = `/${subdomain}`;
  return NextResponse.rewrite(url);
}
