import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Firebase Authentication is handled on the client-side and through server components.
  // The middleware is simplified as we rely on Firebase's session management.
  // Redirect logic will be handled within the page or layout components based on auth state.
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
