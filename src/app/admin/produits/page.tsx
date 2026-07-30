"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "@/lib/api";
import { Product } from "@/types/product";
import { TAILLES, COULEURS, getColorHex } from "@/lib/variants";

const emptyForm = {
  nom: "",
  description: "",
  prix: "",
  taille: "",
  couleur: "",
  stock: "",
  imageUrl: "",
};

export default function AdminProduitsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function loadProducts() {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(product: Product) {
    setEditingId(product.id);
    setForm({
      nom: product.nom,
      description: product.description || "",
      prix: String(product.prix),
      taille: product.taille || "",
      couleur: product.couleur || "",
      stock: String(product.stock),
      imageUrl: product.imageUrl || "",
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      nom: form.nom,
      description: form.description || undefined,
      prix: Number(form.prix),
      taille: form.taille || undefined,
      couleur: form.couleur || undefined,
      stock: form.stock ? Number(form.stock) : 0,
      imageUrl: form.imageUrl || undefined,
    };

    try {
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }
      setShowForm(false);
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Supprimer ce produit ?")) return;
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la suppression");
    }
  }

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-display text-3xl tracking-wide text-text-primary">
            Produits
          </h1>
          <button
            onClick={openCreateForm}
            className="rounded-full bg-lamp px-5 py-2 text-sm font-medium text-void transition hover:bg-lamp-soft"
          >
            + Ajouter un produit
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 grid grid-cols-2 gap-4 rounded-lg border border-white/10 bg-surface p-6"
          >
            <h2 className="col-span-2 mb-2 font-display text-xl text-text-primary">
              {editingId ? "Modifier le produit" : "Nouveau produit"}
            </h2>

            <div className="col-span-2">
              <label className="mb-1 block text-sm text-text-muted">Nom</label>
              <input
                required
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-void px-3 py-2 text-text-primary outline-none focus:border-lamp/50"
              />
            </div>

            <div className="col-span-2">
              <label className="mb-1 block text-sm text-text-muted">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full rounded-lg border border-white/10 bg-void px-3 py-2 text-text-primary outline-none focus:border-lamp/50"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-text-muted">Prix (DZD)</label>
              <input
                required
                type="number"
                step="0.01"
                min="0"
                value={form.prix}
                onChange={(e) => setForm({ ...form, prix: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-void px-3 py-2 text-text-primary outline-none focus:border-lamp/50"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-text-muted">Stock</label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-void px-3 py-2 text-text-primary outline-none focus:border-lamp/50"
              />
            </div>

            <div className="col-span-2">
  <label className="mb-2 block text-sm text-text-muted">Taille</label>
  <div className="flex flex-wrap gap-2">
    {TAILLES.map((t) => (
      <button
        key={t}
        type="button"
        onClick={() => setForm({ ...form, taille: t })}
        className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-medium transition ${
          form.taille === t
            ? "border-lamp bg-lamp/15 text-lamp-soft"
            : "border-white/10 text-text-muted hover:border-white/25 hover:text-text-primary"
        }`}
      >
        {t}
      </button>
    ))}
  </div>
</div>

<div className="col-span-2">
  <label className="mb-2 block text-sm text-text-muted">Couleur</label>
  <div className="flex flex-wrap gap-2">
    {COULEURS.map((c) => (
      <button
        key={c.nom}
        type="button"
        onClick={() => setForm({ ...form, couleur: c.nom })}
        className={`flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 text-sm transition ${
          form.couleur === c.nom
            ? "border-lamp bg-lamp/15 text-lamp-soft"
            : "border-white/10 text-text-muted hover:border-white/25 hover:text-text-primary"
        }`}
      >
        <span
          className="h-5 w-5 rounded-full border border-white/20"
          style={{ backgroundColor: c.hex }}
        />
        {c.nom}
      </button>
    ))}
  </div>
</div>

            <div className="col-span-2">
              <label className="mb-1 block text-sm text-text-muted">URL de l'image</label>
              <input
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full rounded-lg border border-white/10 bg-void px-3 py-2 text-text-primary outline-none focus:border-lamp/50"
              />
            </div>

            <div className="col-span-2 flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-lamp px-5 py-2 text-sm font-medium text-void transition hover:bg-lamp-soft disabled:opacity-50"
              >
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-full border border-white/15 px-5 py-2 text-sm text-text-muted transition hover:text-text-primary"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <p className="text-text-muted">Chargement...</p>
        ) : products.length === 0 ? (
          <p className="text-text-muted">Aucun produit pour le moment.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-text-muted">
                <tr>
                  <th className="px-4 py-3">Nom</th>
                  <th className="px-4 py-3">Prix</th>
                  <th className="px-4 py-3">Taille</th>
                  <th className="px-4 py-3">Couleur</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-white/5">
                    <td className="px-4 py-3 text-text-primary">{product.nom}</td>
                    <td className="px-4 py-3 text-text-primary">{product.prix} DZD</td>
                    <td className="px-4 py-3 text-text-muted">{product.taille || "—"}</td>
                    <td className="px-4 py-3 text-text-muted">{product.couleur || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={product.stock > 0 ? "text-lamp-soft" : "text-red-400"}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openEditForm(product)}
                        className="mr-3 text-lamp-soft hover:underline"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-400 hover:underline"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}