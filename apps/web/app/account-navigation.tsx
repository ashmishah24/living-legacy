"use client";

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function AccountNavigation() {
  return (
    <nav className="account-navigation" aria-label="Account">
      <Link href="/" className="wordmark">Living Legacy</Link>
      <SignedOut>
        <div className="account-actions"><SignInButton><button className="text-button" type="button">Sign in</button></SignInButton><SignUpButton><button className="primary-button compact" type="button">Create account</button></SignUpButton></div>
      </SignedOut>
      <SignedIn>
        <div className="account-actions"><Link className="text-button" href="/archive">My archive</Link><UserButton /></div>
      </SignedIn>
    </nav>
  );
}
