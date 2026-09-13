"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export function AccountNavigation() {
  const { isSignedIn } = useAuth();
  return (
    <nav className="account-navigation" aria-label="Account">
      <Link href="/" className="wordmark">Living Legacy</Link>
      {isSignedIn ? <div className="account-actions"><Link className="text-button" href="/archive">My archive</Link><UserButton /></div> : <div className="account-actions"><Link className="text-button" href="/sign-in">Sign in</Link><Link className="primary-button compact" href="/sign-up">Create account</Link></div>}
    </nav>
  );
}
