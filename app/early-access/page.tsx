import { EarlyAccessForm } from "@/app/early-access/EarlyAccessForm";
import { PageShell } from "@/components/PageShell";

export default function EarlyAccessPage() {
  return (
    <PageShell>
      <main className="mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-6xl items-center gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:py-10">
        <section>
          <p className="mb-4 inline-flex rounded-md border border-gold/30 bg-gold/10 px-3 py-1.5 text-sm font-semibold text-gold">
            Early access for detailers
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Turn finished jobs into proof before the next lead asks.
          </h1>
          <p className="mt-5 text-lg leading-8 text-steel">
            Join the validation list for JobToProof: a workflow for mobile detailers who want posts, review asks, and shareable proof pages ready after each job.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-white">
            {["No card required", "Built around real detailing workflows", "No messages or posts are sent by this MVP"].map((item) => (
              <span key={item} className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-3">
                {item}
              </span>
            ))}
          </div>
        </section>
        <EarlyAccessForm />
      </main>
    </PageShell>
  );
}
