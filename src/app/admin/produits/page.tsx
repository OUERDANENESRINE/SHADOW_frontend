"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import { fetchProducts, createProduct, updateProduct, deleteProduct, uploadImages } from "@/lib/api";
import { Product } from "@/types/product";
import { TAILLES, COULEURS } from "@/lib/variants";

const emptyForm = {
  nom: "",
  description: "",
  prix: "",
};

function variantKey(couleur: string, taille: string) {
  return `${couleur}__${taille}`;
}

export default function AdminProduitsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [selectedCouleurs, setSelectedCouleurs] = useState<string[]>([]);
  const [selectedTailles, setSelectedTailles] = useState<string[]>([]);
  const [stocks, setStocks] = useState<Record<string, string>>({});
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

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

  function resetVariantSelection() {
    setSelectedCouleurs([]);
    setSelectedTailles([]);
    setStocks({});
  }

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    resetVariantSelection();
    setImageUrls([]);
    setShowForm(true);
  }

  function openEditForm(product: Product) {
    setEditingId(product.id);
    setForm({
      nom: product.nom,
      description: product.description || "",
      prix: String(product.prix),
    });

    const couleurs = Array.from(new Set(product.variants.map((v) => v.couleur)));
    const tailles = Array.from(new Set(product.variants.map((v) => v.taille)));
    const newStocks: Record<string, string> = {};
    product.variants.forEach((v) => {
      newStocks[variantKey(v.couleur, v.taille)] = String(v.stock);
    });

    setSelectedCouleurs(couleurs);
    setSelectedTailles(tailles);
    setStocks(newStocks);
    setImageUrls(product.imageUrls || []);
    setShowForm(true);
  }

  function toggleCouleur(c: string) {
    setSelectedCouleurs((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  }

  function toggleTaille(t: string) {
    setSelectedTailles((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  }

  function updateStock(couleur: string, taille: string, value: string) {
    setStocks((prev) => ({ ...prev, [variantKey(couleur, taille)]: value }));
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");
    try {
      const urls = await uploadImages(Array.from(files));
      setImageUrls((prev) => [...prev, ...urls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'upload des photos");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeImageUrl(index: number) {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (selectedCouleurs.length === 0 || selectedTailles.length === 0) {
      setError("Sélectionnez au moins une couleur et une taille");
      setSaving(false);
      return;
    }

    const variants = selectedCouleurs.flatMap((couleur) =>
      selectedTailles.map((taille) => ({
        couleur,
        taille,
        stock: Number(stocks[variantKey(couleur, taille)]) || 0,
      })),
    );

    const payload = {
      nom: form.nom,
      description: form.description || undefined,
      prix: Number(form.prix),
      imageUrls,
      variants,
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
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <h1 className="font-display text-2xl tracking-wide text-text-primary sm:text-3xl">
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
            className="mb-8 flex flex-col gap-5 rounded-lg border border-white/10 bg-surface p-6"
          >
            <h2 className="font-display text-xl text-text-primary">
              {editingId ? "Modifier le produit" : "Nouveau produit"}
            </h2>

            <div>
              <label className="mb-1 block text-sm text-text-muted">Nom</label>
              <input
                required
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-void px-3 py-2 text-text-primary outline-none focus:border-lamp/50"
              />
            </div>

            <div>
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
    className="w-full rounded-lg border border-white/10 bg-void px-3 py-2 text-text-primary outline-none focus:border-lamp/50 sm:max-w-xs"
  />
</div>

            {/* Photos multiples — import réel de fichiers */}
            <div>
              <label className="mb-2 block text-sm text-text-muted">Photos du produit</label>

              {imageUrls.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-3">
                  {imageUrls.map((url, i) => (
                    <div key={i} className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt=""
                        className="h-20 w-20 rounded-lg border border-white/10 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImageUrl(i)}
                        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white transition hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <label
                className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed px-4 py-2 text-sm transition ${
                  uploading
                    ? "cursor-not-allowed border-white/10 text-text-muted"
                    : "border-white/20 text-text-muted hover:border-lamp/50 hover:text-text-primary"
                }`}
              >
                {uploading ? "Envoi en cours..." : "+ Importer des photos"}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            {/* Sélection multi-couleurs */}
            <div>
              <label className="mb-2 block text-sm text-text-muted">
                Couleurs disponibles (sélection multiple)
              </label>
              <div className="flex flex-wrap gap-2">
                {COULEURS.map((c) => (
                  <button
                    key={c.nom}
                    type="button"
                    onClick={() => toggleCouleur(c.nom)}
                    className={`flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 text-sm transition ${
                      selectedCouleurs.includes(c.nom)
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

            {/* Sélection multi-tailles */}
            <div>
              <label className="mb-2 block text-sm text-text-muted">
                Tailles disponibles (sélection multiple)
              </label>
              <div className="flex flex-wrap gap-2">
                {TAILLES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTaille(t)}
                    className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-medium transition ${
                      selectedTailles.includes(t)
                        ? "border-lamp bg-lamp/15 text-lamp-soft"
                        : "border-white/10 text-text-muted hover:border-white/25 hover:text-text-primary"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Grille stock par combinaison */}
            {selectedCouleurs.length > 0 && selectedTailles.length > 0 && (
              <div>
                <label className="mb-2 block text-sm text-text-muted">
                  Stock par combinaison
                </label>
                <div className="overflow-x-auto rounded-lg border border-white/10">
                  <table className="w-full text-sm">
                    <thead className="bg-void/50 text-text-muted">
                      <tr>
                        <th className="px-3 py-2 text-left">Couleur</th>
                        {selectedTailles.map((t) => (
                          <th key={t} className="px-3 py-2 text-center">
                            {t}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCouleurs.map((couleur) => {
                        const hex = COULEURS.find((c) => c.nom === couleur)?.hex || "#555";
                        return (
                          <tr key={couleur} className="border-t border-white/5">
                            <td className="px-3 py-2">
                              <div className="flex items-center gap-2">
                                <span
                                  className="h-4 w-4 rounded-full border border-white/20"
                                  style={{ backgroundColor: hex }}
                                />
                                {couleur}
                              </div>
                            </td>
                            {selectedTailles.map((taille) => (
                              <td key={taille} className="px-3 py-2 text-center">
                                <input
                                  type="number"
                                  min={0}
                                  value={stocks[variantKey(couleur, taille)] || ""}
                                  onChange={(e) => updateStock(couleur, taille, e.target.value)}
                                  placeholder="0"
                                  className="w-16 rounded-lg border border-white/10 bg-void px-2 py-1.5 text-center text-text-primary outline-none focus:border-lamp/50"
                                />
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving || uploading}
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
          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <div key={product.id} className="rounded-lg border border-white/10 bg-surface p-4">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-3">
      {product.imageUrls && product.imageUrls.length > 0 && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.imageUrls[0]}
          alt=""
          className="h-12 w-12 shrink-0 rounded-lg border border-white/10 object-cover"
        />
      )}
      <div>
        <p className="font-display text-lg text-text-primary">{product.nom}</p>
        <p className="text-sm text-text-muted">{product.prix} DZD</p>
      </div>
    </div>
    <div className="flex gap-3 sm:shrink-0">
      <button
        onClick={() => openEditForm(product)}
        className="text-sm text-lamp-soft hover:underline"
      >
        Modifier
      </button>
      <button
        onClick={() => handleDelete(product.id)}
        className="text-sm text-red-400 hover:underline"
      >
        Supprimer
      </button>
    </div>
  </div>

  <div className="mt-3 flex flex-wrap gap-2">
    {product.variants.map((v) => (
      <span
        key={v.id}
        className={`rounded-full border px-2.5 py-1 text-xs ${
          v.stock > 0 ? "border-white/10 text-text-muted" : "border-red-500/20 text-red-400"
        }`}
      >
        {v.couleur} / {v.taille} — {v.stock}
      </span>
    ))}
  </div>
</div>
            ))}
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}