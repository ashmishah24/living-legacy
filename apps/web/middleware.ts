import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { clerkPublishableKey, clerkSecretKey } from "./lib/clerk-env";

const isProtectedRoute = createRouteMatcher(["/archive(.*)", "/api/memories(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) await auth.protect();
}, { publishableKey: clerkPublishableKey, secretKey: clerkSecretKey });

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};
