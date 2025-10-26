import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { Role } from "@/constants/role"
import { betterFetch } from "@better-fetch/fetch";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
		baseURL: request.nextUrl.origin,
		headers: {
			cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
		},
	});

  // ✅ 1. Kalau belum login & akses halaman privat, redirect ke sign-in
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
  const isProtectedPage = pathname.startsWith("/dashboard");
  const isAdminPage = pathname.startsWith("/dashboard/admin");

  if (!session && isProtectedPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // ✅ 2. Kalau sudah login & coba buka sign-in / sign-up, redirect ke home
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if(session && isAdminPage) {
    const role = session?.user.role;

    if (role !== Role.ADMIN) {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  // ✅ 3. Kalau tidak ada kondisi di atas, lanjutkan normal
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in", "/sign-up", "/dashboard/:path*"],
};
