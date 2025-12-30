import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

const protectedRoutes = ["/dashboard", "/admin"];
const authRoutes = ["/signin", "/signup"];

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !session)
    return NextResponse.redirect(new URL("/signin", request.url));

  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isAuthRoute && session)
    return NextResponse.redirect(new URL("/dashboard", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};
