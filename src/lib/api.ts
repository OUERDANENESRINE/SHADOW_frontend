const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Une erreur est survenue" }));
    throw new Error(error.message || "Une erreur est survenue");
  }

  return res.json();
}

// --- Produits ---

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Impossible de récupérer les produits");
  return res.json();
}

export async function fetchProduct(id: number) {
  const res = await fetch(`${API_URL}/products/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Produit introuvable");
  return res.json();
}

interface ProductVariantInput {
  taille: string;
  couleur: string;
  stock: number;
}

interface ProductInput {
  nom: string;
  description?: string;
  prix: number;
  imageUrls?: string[];
  variants: ProductVariantInput[];
}

export async function createProduct(data: ProductInput) {
  return apiFetch("/products", { method: "POST", body: JSON.stringify(data) });
}

export async function updateProduct(id: number, data: Partial<ProductInput>) {
  return apiFetch(`/products/${id}`, { method: "PATCH", body: JSON.stringify(data) });
}

export async function deleteProduct(id: number) {
  return apiFetch(`/products/${id}`, { method: "DELETE" });
}

// --- Auth ---

export async function login(email: string, motDePasse: string) {
  return apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ email, motDePasse }) });
}

export async function register(nom: string, email: string, motDePasse: string) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ nom, email, motDePasse }),
  });
}

export async function logout() {
  return apiFetch("/auth/logout", { method: "POST" });
}

export async function getMe() {
  return apiFetch("/auth/me", { method: "POST" });
}

// --- Commandes ---

interface DeliveryInfo {
  clientNom: string;
  telephone: string;
  adresse: string;
}

export async function createOrder(
  delivery: DeliveryInfo,
  items: { variantId: number; quantite: number }[],
) {
  return apiFetch("/orders", {
    method: "POST",
    body: JSON.stringify({ ...delivery, items }),
  });
}

export async function createWalkInOrder(
  clientNom: string,
  items: { variantId: number; quantite: number }[],
) {
  return apiFetch("/orders/walk-in", {
    method: "POST",
    body: JSON.stringify({ clientNom, items }),
  });
}

export async function fetchOrders() {
  return apiFetch("/orders");
}

export async function fetchMyOrders(userId: number) {
  return apiFetch(`/orders/user/${userId}`);
}

export async function updateOrderStatus(id: number, statut: string) {
  return apiFetch(`/orders/${id}/statut`, { method: "PATCH", body: JSON.stringify({ statut }) });
}

// --- Notifications ---

export async function fetchNotifications() {
  return apiFetch("/notifications");
}

export async function markNotificationRead(id: number) {
  return apiFetch(`/notifications/${id}/lue`, { method: "PATCH" });
}

export async function uploadImages(files: File[]): Promise<string[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const res = await fetch(`${API_URL}/uploads`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Erreur lors de l'upload" }));
    throw new Error(error.message || "Erreur lors de l'upload");
  }

  const data = await res.json();
  return data.urls.map((url: string) => `${API_URL}${url}`);
}