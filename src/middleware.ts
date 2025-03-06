import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {

  if (request.nextUrl.pathname === "/user") {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user"],
};
