"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: {
  children: React.ReactNode;
  requireAdmin?: boolean;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (requireAdmin && user.role !== "admin") {
      router.push("/");
    }
  }, [user, loading, requireAdmin, router]);

  if (loading || !user || (requireAdmin && user.role !== "admin")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void">
        <p className="text-text-muted">Chargement...</p>
      </div>
    );
  }

  return <>{children}</>;
}