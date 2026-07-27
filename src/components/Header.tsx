"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout, loading } = useAuth();

  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 sm:px-10">
      <Link href="/" className="font-display text-lg tracking-[0.3em] text-text-primary">
        SHADOW
      </Link>

      <div className="flex items-center gap-4">
        {!loading && (
          <>
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    href="/admin/produits"
                    className="text-sm tracking-wide text-lamp-soft hover:underline"
                  >
                    Espace admin
                  </Link>
                )}
                <span className="text-sm text-text-muted">
                  {user.nom || user.email}
                </span>
                <button
                  onClick={() => logout()}
                  className="text-sm tracking-wide text-text-muted transition hover:text-lamp-soft"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm tracking-wide text-text-muted transition hover:text-lamp-soft"
              >
                Connexion
              </Link>
            )}
          </>
        )}

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-text-muted transition hover:border-lamp/50 hover:text-lamp-soft"
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
          </svg>
        </a>
      </div>
    </header>
  );
}