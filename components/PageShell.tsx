import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { featuredProofPath } from "@/lib/demoBusinesses";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink text-white">
      <SiteHeader />
      {children}
      <footer className="border-t border-white/10 px-4 py-8 text-sm text-steel sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>JobToProof turns finished detailing jobs into proof assets for the next customer.</p>
          <nav className="flex flex-wrap gap-2 font-semibold">
            <Link className="rounded-md px-1 py-2.5 hover:text-white" href="/demo">
              Demo
            </Link>
            <Link className="rounded-md px-1 py-2.5 hover:text-white" href={featuredProofPath}>
              Proof page
            </Link>
            <Link className="rounded-md px-1 py-2.5 text-gold hover:text-gold-soft" href="/early-access">
              Early access
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
