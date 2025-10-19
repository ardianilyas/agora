import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // ✅ 1. Kalau belum login & akses halaman privat, redirect ke sign-in
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
  const isProtectedPage = pathname.startsWith("/dashboard");

  if (!sessionCookie && isProtectedPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // ✅ 2. Kalau sudah login & coba buka sign-in / sign-up, redirect ke home
  if (sessionCookie && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ✅ 3. Kalau tidak ada kondisi di atas, lanjutkan normal
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in", "/sign-up", "/dashboard/:path*"],
};
