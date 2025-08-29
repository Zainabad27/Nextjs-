import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // const token = await getToken({ req: request });
  // const { pathname } = request.nextUrl;

  // // Public routes
  // const isPublic =
  //   pathname.startsWith("/sign-in") ||
  //   pathname.startsWith("/sign-up") ||
  //   pathname.startsWith("/verify");

  // if (isPublic) {
  //   // If logged in, redirect away from auth pages
  //   if (token) {
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }
  //   return NextResponse.next();
  // }

  // // Protected routes → block if not logged in
  // if (!token) {
  //   return NextResponse.redirect(new URL("/sign-up", request.url));
  // }

  return NextResponse.next(); // ✅ let them in if logged in
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/home", "/verify/:path*"], // exclude sign-in/up
};
