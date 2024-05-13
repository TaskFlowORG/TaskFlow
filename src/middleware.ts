import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { useContext } from "react";
import { URL } from "url";
import { UserContext } from "./contexts/UserContext";
import { Route } from "react-router-dom";

export async function middleware(req: NextRequest) {

  const token = req.cookies.get("JWT");
  if (
    !token &&
    req.nextUrl.pathname !== "/login" &&
    req.nextUrl.pathname !== "/register" &&
    req.nextUrl.pathname !== "/forgotPassword" &&
    req.nextUrl.pathname !== "/two-factor" &&
    req.nextUrl.pathname !== "/"
  ) {
    const domain = req.nextUrl.origin;
    const loginUrl = domain + "/login";

    return NextResponse.redirect(loginUrl);
  } else if (
    token &&
    (req.nextUrl.pathname === "/login" ||
      req.nextUrl.pathname === "/register" ||
      req.nextUrl.pathname === "/forgotPassword" ||
      req.nextUrl.pathname === "/two-factor" ||
      req.nextUrl.pathname === "/")
  ) {
    const username = req.cookies.get("username")?.value; 
    const domain = req.nextUrl.origin;
    const homeUrl = domain + "/"+username ;
    console.log(req)
    return NextResponse.redirect(homeUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!login|register|public|img|Assets|api|_next|fonts|examples|[\\w-]+\\.\\w+).*)",
    "/login",
    "/register",
  ],
};
