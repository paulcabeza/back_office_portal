import { Outlet } from "react-router-dom";
import { Header } from "./header";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
