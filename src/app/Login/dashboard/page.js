'use client';
import ProtectedRoute from '../components/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="p-4">¡Bienvenido a tu diario!</div>
    </ProtectedRoute>
  );
}
