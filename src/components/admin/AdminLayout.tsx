"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const links = [
  { href: "/admin/produits", label: "Produits" },
  { href: "/admin/commandes", label: "Commandes" },
  { href: "/admin/notifications", label: "Notifications" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-void sm:flex-row">
      <aside className="flex w-full flex-col border-b border-white/10 px-4 py-4 sm:h-screen sm:w-56 sm:shrink-0 sm:border-b-0 sm:border-r sm:py-6">
        <div className="mb-4 flex items-center justify-between sm:mb-8 sm:block">
          <Link href="/" className="block font-display text-lg tracking-[0.3em] text-text-primary">
            SHADOW
          </Link>
          <p className="text-xs text-text-muted sm:hidden">{user?.email}</p>
        </div>

        <nav className="-mx-1 flex gap-1 overflow-x-auto pb-1 sm:mx-0 sm:flex-col sm:overflow-visible sm:pb-0">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm tracking-wide transition ${
                pathname === link.href
                  ? "bg-lamp/15 text-lamp-soft"
                  : "text-text-muted hover:bg-white/5 hover:text-text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-4 hidden pt-4 sm:mt-auto sm:block sm:border-t sm:border-white/10 sm:pt-6">
          <p className="mb-2 text-xs text-text-muted">{user?.email}</p>
          <button
            onClick={() => logout()}
            className="text-sm text-text-muted transition hover:text-lamp-soft"
          >
            Déconnexion
          </button>
        </div>

        <button
          onClick={() => logout()}
          className="mt-3 self-start text-xs text-text-muted transition hover:text-lamp-soft sm:hidden"
        >
          Déconnexion
        </button>
      </aside>

      <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-8 sm:py-8">{children}</main>
    </div>
  );
}