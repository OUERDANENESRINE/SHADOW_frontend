const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include", // essentiel : envoie/reçoit les cookies cross-origin
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

export async function login(email: string, motDePasse: string) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, motDePasse }),
  });
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