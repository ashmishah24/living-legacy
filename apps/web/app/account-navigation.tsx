"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export function AccountNavigation() {
  const { isSignedIn } = useAuth();
  return (
    <nav className="account-navigation" aria-label="Account">
      <Link href="/" className="brand-lockup"><Image alt="Living Legacy" className="brand-logo" height={54} priority src="/brand/living-legacy-logo.png" width={54} /><span>Living Legacy</span></Link>
      {isSignedIn ? <div className="account-actions"><Link className="text-button" href="/archive">My archive</Link><UserButton /></div> : <div className="account-actions"><Link className="text-button" href="/sign-in">Sign in</Link><Link className="primary-button compact" href="/sign-up">Create account</Link></div>}
    </nav>
  );
}
