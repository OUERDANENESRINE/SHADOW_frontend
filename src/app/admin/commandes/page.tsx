"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import { fetchOrders, updateOrderStatus, fetchProducts, createWalkInOrder } from "@/lib/api";
import { Order, OrderStatus } from "@/types/order";
import { Product } from "@/types/product";

const STATUTS: { value: OrderStatus; label: string }[] = [
  { value: "en_attente", label: "En attente" },
  { value: "validee", label: "Validée" },
  { value: "expediee", label: "Expédiée" },
  { value: "annulee", label: "Annulée" },
];

const statutStyle: Record<OrderStatus, string> = {
  en_attente: "bg-yellow-500/15 text-yellow-400",
  validee: "bg-blue-500/15 text-blue-400",
  expediee: "bg-lamp/15 text-lamp-soft",
  annulee: "bg-red-500/15 text-red-400",
};

interface CartLine {
  variantId: number;
  quantite: number;
}

export default function AdminCommandesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [clientNom, setClientNom] = useState("");
  const [lines, setLines] = useState<CartLine[]>([{ variantId: 0, quantite: 1 }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const [ordersData, productsData] = await Promise.all([fetchOrders(), fetchProducts()]);
      setOrders(ordersData);
      setProducts(productsData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleStatusChange(id: number, statut: OrderStatus) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, statut } : o)));
    await updateOrderStatus(id, statut);
  }

  function addLine() {
    setLines([...lines, { variantId: 0, quantite: 1 }]);
  }

  function removeLine(index: number) {
    setLines(lines.filter((_, i) => i !== index));
  }

  function updateLine(index: number, field: "variantId" | "quantite", value: number) {
    setLines(lines.map((l, i) => (i === index ? { ...l, [field]: value } : l)));
  }

  function resetForm() {
    setClientNom("");
    setLines([{ variantId: 0, quantite: 1 }]);
    setShowForm(false);
    setError("");
  }

  async function handleCreateOrder(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const validLines = lines.filter((l) => l.variantId > 0 && l.quantite > 0);
    if (validLines.length === 0) {
      setError("Ajoutez au moins une variante valide");
      return;
    }

    setSaving(true);
    try {
      await createWalkInOrder(clientNom, validLines);
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la création");
    } finally {
      setSaving(false);
    }
  }

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-display text-3xl tracking-wide text-text-primary">Commandes</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-full bg-lamp px-5 py-2 text-sm font-medium text-void transition hover:bg-lamp-soft"
          >
            + Nouvelle commande (en boutique)
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleCreateOrder}
            className="mb-8 rounded-lg border border-white/10 bg-surface p-6"
          >
            <h2 className="mb-4 font-display text-xl text-text-primary">Commande en boutique</h2>

            {error && (
              <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                {error}
              </p>
            )}

            <div className="mb-4">
              <label className="mb-1 block text-sm text-text-muted">Nom du client</label>
              <input
                required
                value={clientNom}
                onChange={(e) => setClientNom(e.target.value)}
                className="w-full max-w-sm rounded-lg border border-white/10 bg-void px-3 py-2 text-text-primary outline-none focus:border-lamp/50"
                placeholder="Ex : Karim B."
              />
            </div>

            <div className="mb-4 flex flex-col gap-2">
              <label className="mb-1 block text-sm text-text-muted">
                Produits (variante précise)
              </label>
              {lines.map((line, i) => (
                <div key={i} className="flex items-center gap-2">
                  <select
                    value={line.variantId}
                    onChange={(e) => updateLine(i, "variantId", Number(e.target.value))}
                    className="flex-1 rounded-lg border border-white/10 bg-void px-3 py-2 text-sm text-text-primary outline-none focus:border-lamp/50"
                  >
                    <option value={0}>Sélectionner une variante</option>
                    {products.flatMap((p) =>
                      p.variants.map((v) => (
                        <option key={v.id} value={v.id}>
                          {p.nom} — {v.couleur}/{v.taille} ({v.stock} en stock)
                        </option>
                      )),
                    )}
                  </select>
                  <input
                    type="number"
                    min={1}
                    value={line.quantite}
                    onChange={(e) => updateLine(i, "quantite", Number(e.target.value))}
                    className="w-20 rounded-lg border border-white/10 bg-void px-3 py-2 text-sm text-text-primary outline-none focus:border-lamp/50"
                  />
                  {lines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLine(i)}
                      className="text-sm text-red-400 hover:underline"
                    >
                      Retirer
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addLine}
                className="mt-1 w-fit text-sm text-lamp-soft hover:underline"
              >
                + Ajouter une ligne
              </button>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-lamp px-5 py-2 text-sm font-medium text-void transition hover:bg-lamp-soft disabled:opacity-50"
              >
                {saving ? "Création..." : "Créer la commande"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-white/15 px-5 py-2 text-sm text-text-muted transition hover:text-text-primary"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <p className="text-text-muted">Chargement...</p>
        ) : orders.length === 0 ? (
          <p className="text-text-muted">Aucune commande pour le moment.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="overflow-hidden rounded-lg border border-white/10 bg-surface"
              >
                <button
                  onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-lg text-text-primary">#{order.id}</span>
                    <span className="text-sm text-text-muted">
                      {order.user
                        ? order.user.nom || order.user.email
                        : `${order.clientNom} (en boutique)`}
                    </span>
                    <span className="text-xs text-text-muted">
                      {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statutStyle[order.statut]}`}
                    >
                      {STATUTS.find((s) => s.value === order.statut)?.label}
                    </span>
                    <span className="text-text-primary">{order.total} €</span>
                  </div>
                </button>

                {expandedId === order.id && (
                  <div className="border-t border-white/10 px-5 py-4">
                    {(order.clientNom || order.telephone || order.adresse) && (
                      <div className="mb-4 rounded-lg border border-white/10 bg-void/50 p-3 text-sm">
                        {order.clientNom && (
                          <p className="text-text-primary">
                            <span className="text-text-muted">Nom : </span>
                            {order.clientNom}
                          </p>
                        )}
                        {order.telephone && (
                          <p className="text-text-primary">
                            <span className="text-text-muted">Téléphone : </span>
                            {order.telephone}
                          </p>
                        )}
                        {order.adresse && (
                          <p className="text-text-primary">
                            <span className="text-text-muted">Adresse : </span>
                            {order.adresse}
                          </p>
                        )}
                      </div>
                    )}

                    <ul className="mb-4 flex flex-col gap-1 text-sm text-text-muted">
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.quantite} × {item.variant?.product?.nom} (
                          {item.variant?.couleur}/{item.variant?.taille}) — {item.prixUnitaire} €
                        </li>
                      ))}
                    </ul>

                    <label className="mb-1 block text-xs text-text-muted">
                      Changer le statut
                    </label>
                    <select
                      value={order.statut}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value as OrderStatus)
                      }
                      className="rounded-lg border border-white/10 bg-void px-3 py-2 text-sm text-text-primary outline-none focus:border-lamp/50"
                    >
                      {STATUTS.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}