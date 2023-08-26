import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/api/webhook/clerk'],
  ignoredRoutes: [
    '/api/webhook/clerk',
    '/api/quote',
    '/api/socket(.*)',
    '/room(.*)',
    '/animate(.*)',
  ],

  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});

export const config = {
  matcher: ['/', '/((?!.*\\..*|_next).*)', '/(api|trpc)(.*)'],
};
