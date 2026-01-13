import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";
import { sequence } from "astro:middleware";

const isProtectedRoute = createRouteMatcher(['/admin(.*)'])

const clerkAuth = clerkMiddleware((auth, context) => {
  const { userId, has, redirectToSignIn } = auth();
  const isAuthenticated = !!userId;

  if (!isAuthenticated && isProtectedRoute(context.request) && (!has({permission: 'org:admin:example1'}) || !has({permission: 'org:admin:example2'}))) {

    return redirectToSignIn();
    
  }
    
});

const cspMiddleware = async (context: any, next: any) => {
  const response = await next();
  
  // Eliminar cualquier CSP restrictivo que Clerk pueda estar agregando
  response.headers.delete('Content-Security-Policy');
  
  return response;
};

export const onRequest = sequence(clerkAuth, cspMiddleware);
