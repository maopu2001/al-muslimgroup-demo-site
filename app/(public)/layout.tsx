import Footer from "@/components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mt-12 min-h-screen">
      {children}
      <Footer />
      <footer className="bg-background border-t py-2 text-center text-sm text-muted-foreground">
        Copyright &copy; {new Date().getFullYear()} Al-Muslim Group. All rights
        reserved.
      </footer>
    </main>
  );
}
