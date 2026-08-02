"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createOrder } from "@/lib/api";
import { getColorHex } from "@/lib/variants";

function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
}

export default function PanierPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const { user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [clientNom, setClientNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const orderItems = items.map((i) => ({
        variantId: i.variant.id,
        quantite: i.quantite,
      }));
      await createOrder({ clientNom, telephone, adresse }, orderItems);
      clearCart();
      router.push("/mes-commandes");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la commande");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-void px-6 pt-28 pb-16 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 font-display text-4xl tracking-wide text-text-primary">
            Votre panier
          </h1>

          {items.length === 0 ? (
            <div className="rounded-lg border border-white/10 bg-surface p-8 text-center">
              <p className="mb-4 text-text-muted">Votre panier est vide.</p>
              <Link href="/" className="text-lamp-soft hover:underline">
                Retourner à la collection
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-lg border border-white/10 bg-surface p-4"
                  >
                    <div className="flex-1">
                      <p className="font-display text-lg text-text-primary">
                        {item.product.nom}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-text-muted">
                        <span
                          className="h-3 w-3 rounded-full border border-white/20"
                          style={{ backgroundColor: getColorHex(item.variant.couleur) }}
                        />
                        {item.variant.couleur} · {item.variant.taille}
                      </div>
                    </div>

                    <input
                      type="number"
                      min={1}
                      max={item.variant.stock}
                      value={item.quantite}
                      onChange={(e) => updateQuantity(index, Number(e.target.value))}
                      className="w-16 rounded-lg border border-white/10 bg-void px-2 py-1.5 text-center text-text-primary outline-none focus:border-lamp/50"
                    />

                    <span className="w-20 text-right text-text-primary">
                      {formatPrice(item.product.prix * item.quantite)}
                    </span>

                    <button
                      onClick={() => removeItem(index)}
                      className="text-sm text-red-400 hover:underline"
                    >
                      Retirer
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                <span className="text-lg text-text-muted">Total</span>
                <span className="font-display text-2xl text-text-primary">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              {!loading && !user ? (
                <p className="mt-6 text-sm text-text-muted">
                  Vous devez être{" "}
                  <Link href="/login" className="text-lamp-soft hover:underline">
                    connecté
                  </Link>{" "}
                  pour valider votre commande.
                </p>
              ) : (
                <form onSubmit={handleCheckout} className="mt-8 flex flex-col gap-4">
                  <h2 className="font-display text-xl text-text-primary">
                    Informations de livraison
                  </h2>

                  {error && (
                    <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                      {error}
                    </p>
                  )}

                  <div>
                    <label className="mb-1 block text-sm text-text-muted">Nom et prénom</label>
                    <input
                      required
                      value={clientNom}
                      onChange={(e) => setClientNom(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-surface px-4 py-2.5 text-text-primary outline-none transition focus:border-lamp/50"
                      placeholder="Ex : Karim Belkacem"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm text-text-muted">
                      Numéro de téléphone
                    </label>
                    <input
                      required
                      type="tel"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-surface px-4 py-2.5 text-text-primary outline-none transition focus:border-lamp/50"
                      placeholder="Ex : 0555 12 34 56"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm text-text-muted">
                      Adresse de livraison
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={adresse}
                      onChange={(e) => setAdresse(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-surface px-4 py-2.5 text-text-primary outline-none transition focus:border-lamp/50"
                      placeholder="Adresse complète, ville, wilaya..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 w-full rounded-full bg-lamp py-3 text-sm font-medium tracking-wide text-void transition hover:bg-lamp-soft disabled:opacity-50"
                  >
                    {submitting ? "Traitement..." : "Valider la commande"}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}