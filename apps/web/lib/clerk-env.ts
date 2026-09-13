/**
 * Vercel Marketplace resources can be installed with a custom key prefix.
 * Keep that infrastructure detail at this boundary so the application itself
 * consistently uses Clerk's normal configuration model.
 */
export const clerkPublishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_livinglegacy_CLERK_PUBLISHABLE_KEY;

export const clerkSecretKey =
  process.env.CLERK_SECRET_KEY ?? process.env.livinglegacy_CLERK_SECRET_KEY;
