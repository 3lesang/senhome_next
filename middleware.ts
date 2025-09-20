import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const subdomain = host.split(".")[0];

  if (!subdomain || subdomain === "www") {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = `/landing/${subdomain}/`;
  return NextResponse.rewrite(url);
}
