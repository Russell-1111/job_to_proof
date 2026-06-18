import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { featuredProofPath } from "@/lib/demoBusinesses";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 py-1 text-sm font-semibold text-white">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-gold text-ink shadow-glow">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <span>JobToProof</span>
        </Link>
        <nav className="flex items-center gap-1.5 text-sm text-steel sm:gap-2">
          <Link className="hidden rounded-md px-3 py-2.5 hover:text-white md:inline-flex" href={featuredProofPath}>
            Proof page
          </Link>
          <Link className="rounded-md border border-white/10 px-2.5 py-2.5 font-semibold text-white hover:border-gold/60 sm:px-3" href="/early-access">
            Early access
          </Link>
          <Link className="inline-flex items-center gap-1.5 rounded-md bg-gold px-2.5 py-2.5 font-semibold text-ink hover:bg-gold-soft sm:px-3" href="/demo">
            Demo
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
