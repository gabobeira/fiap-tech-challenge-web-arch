import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  // Permite acesso à página de login
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  // Se não houver token, redireciona para login
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configura as rotas protegidas
export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
