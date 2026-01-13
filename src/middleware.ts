import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";
import { sequence } from "astro:middleware";

const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

const clerkAuth = clerkMiddleware((auth, context) => {
  const { userId, has, redirectToSignIn } = auth();
  const isProtected = isProtectedRoute(context.request);

  // 1) Si es ruta protegida y no hay sesión -> login
  if (isProtected && !userId) {
    return redirectToSignIn();
  }

});

export const onRequest = sequence(clerkAuth);

