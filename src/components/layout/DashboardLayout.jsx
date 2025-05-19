import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar renderiza tudo internamente: botão mobile + drawer + sidebar desktop */}
      <Sidebar />

      {/* Main com padding e compensação lateral no desktop */}
      <main className="flex-1 p-4 md:p-6 md:ml-[240px]">
        {children}
      </main>
    </div>
  );
}
