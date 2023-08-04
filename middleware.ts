import { NextResponse, NextRequest } from 'next/server'
 
import * as jose from 'jose';
import { jwt } from './utils';
import { useRouter } from 'next/router';
 
export async function middleware(req: NextRequest) {
  const previousPage = req.nextUrl.pathname;
 
  if (previousPage.startsWith('/recetario')) {
    const token = req.cookies.get('token')?.value || '';
    // useRouter().reload();
 
    try {
      await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(
        new URL(`/auth/login?p=${previousPage}`, req.url)
      );
    }
  }

  if (req.nextUrl.pathname.startsWith('/auth')) {
    const token = req.cookies.get('token')?.value || '';
    const previousPage = req.nextUrl.pathname;
 
    try {
      await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
      return NextResponse.redirect(
       new URL(`/auth/login?p=${previousPage}`, req.url)
     );
    } catch (error) {
      return NextResponse.next();
    }
  }

};
 
export const config = {
  matcher: [
    '/recetario/:path*',
    '/auth/:path*'
  ],
};