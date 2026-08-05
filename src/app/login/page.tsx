"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import NightSky from "@/components/NightSky";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, motDePasse);
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <NightSky />

      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="font-display text-2xl tracking-[0.3em] text-text-primary">
            SHADOW
          </span>
          <p className="mt-2 text-sm text-text-muted">Connexion à votre compte</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <div>
            <label className="mb-1.5 block text-sm text-text-muted">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-surface/80 px-4 py-2.5 text-text-primary outline-none backdrop-blur-sm transition focus:border-lamp/50"
              placeholder="vous@exemple.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-text-muted">Mot de passe</label>
            <input
              type="password"
              required
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-surface/80 px-4 py-2.5 text-text-primary outline-none backdrop-blur-sm transition focus:border-lamp/50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-lamp py-2.5 text-sm font-medium tracking-wide text-void transition hover:bg-lamp-soft disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-lamp-soft hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}