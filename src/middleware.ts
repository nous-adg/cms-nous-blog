import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isProtectedRoute = createRouteMatcher(['/admin(.*)'])

export const onRequest = clerkMiddleware((auth, context) => {
  const { userId, has, redirectToSignIn } = auth();
  const isAuthenticated = !!userId;

  if (!isAuthenticated && isProtectedRoute(context.request) && (!has({permission: 'org:admin:example1'}) || !has({permission: 'org:admin:example2'}))) {

    return redirectToSignIn();
    
  }
    
});
