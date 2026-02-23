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
import { UsersPage } from "@/pages/users/users-page";
import { CreateUserPage } from "@/pages/users/create-user-page";
import { EditUserPage } from "@/pages/users/edit-user-page";

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
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/new" element={<CreateUserPage />} />
            <Route path="/users/:userId/edit" element={<EditUserPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
