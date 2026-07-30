"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import { fetchNotifications, markNotificationRead } from "@/lib/api";
import { Notification } from "@/types/order";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchNotifications();
      setNotifications(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleMarkRead(id: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lue: true } : n)),
    );
    await markNotificationRead(id);
  }

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout>
        <h1 className="mb-6 font-display text-3xl tracking-wide text-text-primary">
          Notifications
        </h1>

        {loading ? (
          <p className="text-text-muted">Chargement...</p>
        ) : notifications.length === 0 ? (
          <p className="text-text-muted">Aucune notification.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-center justify-between rounded-lg border px-5 py-4 ${
                  n.lue
                    ? "border-white/5 bg-surface/50"
                    : "border-lamp/30 bg-lamp/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  {!n.lue && (
                    <span className="h-2 w-2 rounded-full bg-lamp shadow-[0_0_6px_2px_rgba(244,167,60,0.6)]" />
                  )}
                  <div>
                    <p className="text-sm text-text-primary">{n.message}</p>
                    <p className="text-xs text-text-muted">
                      {new Date(n.createdAt).toLocaleString("fr-FR")}
                    </p>
                  </div>
                </div>

                {!n.lue && (
                  <button
                    onClick={() => handleMarkRead(n.id)}
                    className="text-xs text-lamp-soft hover:underline"
                  >
                    Marquer comme lue
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}