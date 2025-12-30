import DashboardSidebar from "@/components/dashboard-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-screen relative">
      <DashboardSidebar />
      <div className="ml-80 px-2 py-5">{children}</div>
      <footer className="bg-background fixed bottom-0 w-full border-t py-2 text-center text-sm text-muted-foreground h-10">
        Copyright &copy; {new Date().getFullYear()} Al-Muslim Group. All rights
        reserved.
      </footer>
    </main>
  );
}
