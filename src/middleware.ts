import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/api/webhook/clerk'],
  ignoredRoutes: ['/api/webhook/clerk', '/api/quote', '/api/socket(.*)', '/call(.*)', '/contact(.*)'],

  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== '/org-selection') {
      const orgSelection = new URL('/org-selection', req.url);

      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ['/', '/((?!.*\\..*|_next).*)', '/(api|trpc)(.*)'],
};
