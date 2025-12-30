export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
      <footer className="bg-background fixed bottom-0 w-full border-t py-2 text-center text-sm text-muted-foreground h-10">
        Copyright &copy; {new Date().getFullYear()} Al-Muslim Group. All rights
        reserved.
      </footer>
    </main>
  );
}
