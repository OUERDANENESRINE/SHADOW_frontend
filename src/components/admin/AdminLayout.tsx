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
    <div className="flex min-h-screen bg-void">
      <aside className="w-56 shrink-0 border-r border-white/10 px-4 py-6">
        <Link href="/" className="mb-8 block font-display text-lg tracking-[0.3em] text-text-primary">
          SHADOW
        </Link>

        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm tracking-wide transition ${
                pathname === link.href
                  ? "bg-lamp/15 text-lamp-soft"
                  : "text-text-muted hover:bg-white/5 hover:text-text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-8">
          <p className="mb-2 text-xs text-text-muted">{user?.email}</p>
          <button
            onClick={() => logout()}
            className="text-sm text-text-muted transition hover:text-lamp-soft"
          >
            Déconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 px-8 py-8">{children}</main>
    </div>
  );
}