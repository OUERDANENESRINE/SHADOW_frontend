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
        <h1 className="mb-6 font-display text-2xl tracking-wide text-text-primary sm:text-3xl">
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
                className={`flex flex-col gap-3 rounded-lg border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 ${
                  n.lue ? "border-white/5 bg-surface/50" : "border-lamp/30 bg-lamp/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  {!n.lue && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-lamp shadow-[0_0_6px_2px_rgba(244,167,60,0.6)]" />
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
                    className="self-start text-xs text-lamp-soft hover:underline sm:self-auto"
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