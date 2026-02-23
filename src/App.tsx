import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { AppLayout } from "@/components/layout/app-layout";
import { LoginPage } from "@/pages/login/login-page";
import { DashboardPage } from "@/pages/dashboard/dashboard-page";
import { KitSelectionPage } from "@/pages/enrollment/kit-selection-page";
import { EnrollmentFormPage } from "@/pages/enrollment/enrollment-form-page";
import { ConfirmationPage } from "@/pages/enrollment/confirmation-page";

export default function App() {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route
              path="/enrollment/kits"
              element={<KitSelectionPage />}
            />
            <Route
              path="/enrollment/form"
              element={<EnrollmentFormPage />}
            />
            <Route
              path="/enrollment/confirmation"
              element={<ConfirmationPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
