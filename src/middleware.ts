import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("JWT");
  if (
    !token &&
    req.nextUrl.pathname !== "/login" &&
    req.nextUrl.pathname !== "/register" &&
    req.nextUrl.pathname !== "/"
  ) {
    const domain = req.nextUrl.origin;
    const loginUrl = domain + "/login";

    return NextResponse.redirect(loginUrl);
  } else if (
    token &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")
  ) {
    const domain = req.nextUrl.origin;
    const homeUrl = domain + "/";
    return NextResponse.redirect(homeUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!login|register|api|_next|fonts|examples|[\\w-]+\\.\\w+).*)",
    "/login",
    "/register",
  ],
};
