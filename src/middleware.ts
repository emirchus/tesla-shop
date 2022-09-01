import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('p', encodeURIComponent(req.nextUrl.pathname));
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname.startsWith('/admin')) {
    const validRoles = ['admin', 'super-user', 'SEO'];
    if (!validRoles.includes(session.user.role)) {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();

  // try {
  //   await jose.jwtVerify(
  //     req.cookies.get('authorization') as string,
  //     new TextEncoder().encode(process.env.JWT_SECRET)
  //   );

  //   return NextResponse.next();
  // } catch (error) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = '/auth/login';
  //   url.searchParams.set('p', encodeURIComponent(req.nextUrl.pathname));
  //   return NextResponse.redirect(url);
  // }
}

export const config = {
  matcher: ['/checkout/:path*', '/orders/:path*', '/admin/:path*', '/api/admin/:path*']
};
