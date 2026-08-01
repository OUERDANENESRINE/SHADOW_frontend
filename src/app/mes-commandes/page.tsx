"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { fetchMyOrders } from "@/lib/api";
import { Order, OrderStatus } from "@/types/order";
import { getColorHex } from "@/lib/variants";

const STATUT_LABELS: Record<OrderStatus, string> = {
  en_attente: "En attente",
  validee: "Validée",
  expediee: "Expédiée",
  annulee: "Annulée",
};

const statutStyle: Record<OrderStatus, string> = {
  en_attente: "bg-yellow-500/15 text-yellow-400",
  validee: "bg-blue-500/15 text-blue-400",
  expediee: "bg-lamp/15 text-lamp-soft",
  annulee: "bg-red-500/15 text-red-400",
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
}

function MesCommandesContent() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchMyOrders(user.id)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-void px-6 pt-28 pb-16 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 font-display text-4xl tracking-wide text-text-primary">
            Mes commandes
          </h1>

          {loading ? (
            <p className="text-text-muted">Chargement...</p>
          ) : orders.length === 0 ? (
            <p className="text-text-muted">Vous n&apos;avez encore passé aucune commande.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-lg border border-white/10 bg-surface p-5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <span className="font-display text-lg text-text-primary">
                        Commande #{order.id}
                      </span>
                      <p className="text-xs text-text-muted">
                        {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statutStyle[order.statut]}`}
                    >
                      {STATUT_LABELS[order.statut]}
                    </span>
                  </div>

                  <ul className="mb-3 flex flex-col gap-1.5">
                    {order.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-2 text-sm text-text-muted"
                      >
                        <span
                          className="h-3 w-3 rounded-full border border-white/20"
                          style={{ backgroundColor: getColorHex(item.variant?.couleur) }}
                        />
                        {item.quantite} × {item.variant?.product?.nom} (
                        {item.variant?.couleur}/{item.variant?.taille})
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-end border-t border-white/10 pt-3">
                    <span className="text-text-primary">
                      Total : {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function MesCommandesPage() {
  return (
    <ProtectedRoute>
      <MesCommandesContent />
    </ProtectedRoute>
  );
}