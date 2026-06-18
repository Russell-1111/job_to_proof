import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, FileText, MessageSquareText, Play, Quote, Share2, Sparkles } from "lucide-react";
import { BeforeAfter } from "@/components/BeforeAfter";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { detailImages } from "@/lib/demoContent";

const steps = [
  {
    title: "Start with the job you just finished",
    text: "Use the sample detail, or add the service, location, short summary, review link, and before/after photos.",
    icon: ClipboardCheck
  },
  {
    title: "Create proof assets in one pass",
    text: "Generate captions, short-form video prompts, review requests, and a proof-page draft from the same job.",
    icon: Play
  },
  {
    title: "Use the proof while the job is fresh",
    text: "Copy the assets, ask for the review, and send the proof page when the next lead wants to see your work.",
    icon: Share2
  }
];

const previews = [
  {
    title: "Instagram post",
    body: "A caption built around the finished job, the result, and a simple booking cue.",
    icon: FileText
  },
  {
    title: "Review request",
    body: "A polite follow-up message tied to the exact service the customer just received.",
    icon: MessageSquareText
  },
  {
    title: "Proof page",
    body: "A shareable page with before/after photos, job summary, review prompt, and booking CTA.",
    icon: CheckCircle2
  }
];

const proofStats = ["Social caption", "Review ask", "Proof page"];

export default function HomePage() {
  return (
    <PageShell>
      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-12 pt-8 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:gap-10 lg:pb-20 lg:pt-16">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-gold/30 bg-gold/10 px-3 py-1.5 text-sm font-semibold text-gold">
              <Sparkles className="size-4" aria-hidden="true" />
              For mobile detailers who need proof ready fast
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.04] text-white sm:text-6xl lg:text-7xl">
              Turn every finished detailing job into proof that helps win the next customer.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-steel">
              JobToProof turns before/after photos and a short job summary into ready-to-copy posts, review asks, and a shareable proof page.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/demo" className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-5 py-3.5 font-semibold text-ink shadow-glow hover:bg-gold-soft">
                Try the sample demo
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/early-access" className="inline-flex items-center justify-center rounded-md border border-white/15 px-5 py-3.5 font-semibold text-white hover:border-gold/60">
                Request early access
              </Link>
            </div>
            <p className="mt-3 text-sm text-steel">No login. No card. Sample detailing job already loaded.</p>
            <div className="mt-7 grid max-w-xl grid-cols-3 gap-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-steel">
              {proofStats.map((stat) => (
                <span key={stat} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-3">
                  {stat}
                </span>
              ))}
            </div>
          </div>
          <div className="surface rounded-lg p-3 shadow-glow">
            <BeforeAfter {...detailImages.footwell} priority />
            <div className="mt-3 rounded-md border border-gold/20 bg-gold/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Sample job becomes</p>
              <p className="mt-2 text-sm leading-6 text-white">
                A short-form post idea, a review request message, and a proof page a detailer can send to the next lead.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03] px-4 py-14 sm:px-6">
          <SectionHeading title="The work is visible. The proof still gets missed.">
            Mobile detailers create transformations every day. Too often the photos stay in the camera roll, the review ask goes out late, and the next lead never sees the reason to book.
          </SectionHeading>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <SectionHeading eyebrow="How it works" title="One completed job becomes proof you can use immediately" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="surface rounded-lg p-6">
                <div className="mb-5 flex items-center justify-between">
                  <step.icon className="size-8 text-gold" aria-hidden="true" />
                  <span className="text-sm font-semibold text-steel">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 leading-7 text-steel">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03] px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="What it creates" title="Assets for the exact moments that win trust" />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {previews.map((preview) => (
                <article key={preview.title} className="rounded-lg border border-white/10 bg-ink p-5 shadow-[0_20px_70px_rgba(0,0,0,0.22)]">
                  <preview.icon className="mb-4 size-6 text-gold" aria-hidden="true" />
                  <h3 className="font-semibold text-white">{preview.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-steel">{preview.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="surface grid gap-8 rounded-lg p-6 md:grid-cols-[0.85fr_1fr] md:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">For mobile operators</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-white">Built for detailers who want every finished job to support the next sale.</h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-steel">
              <p>
                Use JobToProof after an interior detail, ceramic maintenance wash, odor treatment, or fleet cleanup. The MVP focuses on fast, honest assets a solo operator can copy and share from a phone.
              </p>
              <div className="rounded-md border border-white/10 bg-ink p-4">
                <Quote className="mb-3 size-5 text-gold" aria-hidden="true" />
                <p className="text-base leading-7 text-white/90">
                  The goal is simple: make every completed job easier to post, easier to review, and easier to show when a new customer asks for proof.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-5xl rounded-lg border border-gold/30 bg-gold p-8 text-center text-ink shadow-glow">
            <h2 className="text-3xl font-semibold">Generate proof from a sample detail in under 30 seconds.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-ink/75">
              See the core workflow before accounts, payments, AI generation, or integrations are added.
            </p>
            <Link href="/demo" className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-ink px-5 py-3 font-semibold text-white hover:bg-black">
              Open the Demo
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
