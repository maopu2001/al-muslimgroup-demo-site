import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

const protectedRoutes = ["/dashboard"];
const protectedUserRoutes = ["/dashboard/create-complain"];
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

  if (isAuthRoute && session?.user.type === "admin")
    return NextResponse.redirect(new URL("/dashboard", request.url));

  const isProtectedUserRoute = protectedUserRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!isProtectedUserRoute && session?.user.type === "user") {
    return NextResponse.redirect(
      new URL("/dashboard/create-complain", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};
