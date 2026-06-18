import Link from "next/link";
import { ArrowRight, CalendarCheck, CheckCircle2, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { BeforeAfter } from "@/components/BeforeAfter";
import { PageShell } from "@/components/PageShell";
import { DetailImagePair, detailImages } from "@/lib/demoContent";

const jobs = [
  {
    title: "Pet hair cleanup for a daily driver SUV",
    detail: "Interior reset focused on carpets, seat seams, and high-touch surfaces.",
    images: detailImages.petHair
  },
  {
    title: "Leather seat refresh before a family road trip",
    detail: "Cleaned and conditioned leather so the seat looks cared for without a fake glossy finish.",
    images: detailImages.leatherSeat
  },
  {
    title: "Stain treatment and dashboard reset for a commuter car",
    detail: "Dashboard, console, and cupholders wiped down for a cleaner daily-drive interior.",
    images: detailImages.dashboard
  }
] satisfies Array<{ title: string; detail: string; images: DetailImagePair }>;

export default function ProofPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <section className="surface rounded-lg p-5 gold-ring sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-md border border-gold/30 bg-gold/10 px-3 py-1.5 text-sm font-semibold text-gold">
                <ShieldCheck className="size-4" aria-hidden="true" />
                Shareable proof page
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">Elite Mobile Detailing</h1>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-steel">
                <span className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2">
                  <MapPin className="size-4 text-gold" aria-hidden="true" />
                  Austin, TX
                </span>
                <span className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2">
                  <CalendarCheck className="size-4 text-gold" aria-hidden="true" />
                  Full Interior Detail
                </span>
              </div>
              <p className="mt-6 text-lg leading-8 text-steel">
                A completed interior detail turned into a shareable page a mobile detailer could send when a new lead asks, "Can I see your work?"
              </p>
              <div className="mt-5 grid gap-3 text-sm text-white sm:grid-cols-3">
                {["Before/after photos", "Plain job summary", "Share-ready next step"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-ink px-3 py-3">
                    <CheckCircle2 className="size-4 shrink-0 text-gold" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-white/10 bg-ink p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Demo proof content</p>
                <p className="mt-3 text-sm leading-6 text-white/90">
                  This sample uses demo photos and example copy to show the shareable page format. A real page would use the detailer's own job photos, review link, and booking link.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/early-access" className="inline-flex items-center justify-center rounded-md bg-gold px-5 py-3 font-semibold text-ink shadow-glow hover:bg-gold-soft">
                  Get pages like this
                </Link>
                <Link href="/demo" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-5 py-3 font-semibold text-white hover:border-gold/60">
                  Back to demo
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <BeforeAfter {...detailImages.footwell} />
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-gold/25 bg-gold/10 p-5 sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                <Sparkles className="size-4" aria-hidden="true" />
                Built by JobToProof
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Want proof pages like this after every finished job?</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-steel">
                The MVP turns one completed detailing job into posts, review asks, and a page like this so the next customer has proof before booking.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 md:min-w-[22rem]">
              <Link href="/demo" className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-semibold text-ink shadow-glow hover:bg-gold-soft">
                Try the demo
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/early-access" className="inline-flex items-center justify-center rounded-md border border-white/15 px-4 py-3 text-sm font-semibold text-white hover:border-gold/60">
                Request early access
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">More proof</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Additional completed jobs</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-steel">
              These are static demo examples showing how a proof page could build trust without fake claims or inflated results.
            </p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {jobs.map((job) => (
              <article key={job.title} className="surface rounded-lg p-4">
                <div className="mb-4 overflow-hidden rounded-md border border-white/10">
                  <BeforeAfter {...job.images} compact />
                </div>
                <h3 className="font-semibold text-white">{job.title}</h3>
                <p className="mt-2 text-sm leading-6 text-steel">{job.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
