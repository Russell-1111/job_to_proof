"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

function fieldClass() {
  return "w-full rounded-md border border-white/10 bg-ink/90 px-3 py-3 text-white outline-none transition placeholder:text-steel/60 focus:border-gold focus:ring-2 focus:ring-gold/15";
}

export function HomeFastPassForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "duplicate">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setMessage(null);
    setStatus("idle");

    try {
      const formData = new FormData(form);
      const payload = {
        name: "Homepage fast-pass lead",
        email: String(formData.get("email") ?? ""),
        business_name: "Not provided",
        business_type: "Mobile detailer",
        social_link: String(formData.get("social_link") ?? ""),
        biggest_problem: "Fast-pass signup from homepage",
        selected_tier: "premium_20",
        source: "homepage_fast_pass",
        notes: "Submitted from the homepage fast-pass form."
      };

      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = (await response.json().catch(() => null)) as { duplicate?: boolean; message?: string } | null;

      if (!response.ok) {
        setMessage(result?.message ?? "We could not save your request. Please try again.");
        return;
      }

      setStatus(result?.duplicate ? "duplicate" : "success");
      setMessage(result?.duplicate ? "You are already on the early access list." : "You are on the early access list.");
      form.reset();
    } catch {
      setMessage("We could not save your request. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="early-access-fast-pass" className="scroll-mt-24 px-4 pb-12 sm:px-6 lg:pb-16">
      <div className="mx-auto grid max-w-7xl gap-5 rounded-lg border border-gold/25 bg-gold/10 p-4 shadow-glow sm:p-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Fast-pass early access</p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Already interested from a video? Join with two fields.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-steel">
            Try the demo if you want to see the workflow, or join early access now and we will know where to look at your business.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-white">Email</span>
            <input required className={fieldClass()} name="email" type="email" autoComplete="email" placeholder="you@business.com" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-white">Business/social link</span>
            <input required className={fieldClass()} name="social_link" autoComplete="url" placeholder="Instagram, TikTok, website..." />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-md bg-gold px-5 py-3 font-semibold text-ink hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Joining..." : "Join early access"}
            {!isSubmitting ? <ArrowRight className="size-4" aria-hidden="true" /> : null}
          </button>

          <div className="sm:col-span-3">
            {message ? (
              <p
                className={`rounded-md border px-3 py-2 text-sm font-medium ${
                  status === "success" || status === "duplicate"
                    ? "border-mint/30 bg-mint/10 text-mint"
                    : "border-red-400/30 bg-red-500/10 text-red-100"
                }`}
                role={status === "success" || status === "duplicate" ? "status" : "alert"}
                aria-live="polite"
              >
                {status === "success" || status === "duplicate" ? <CheckCircle2 className="mr-2 inline size-4" aria-hidden="true" /> : null}
                {message}
              </p>
            ) : (
              <p className="text-xs leading-5 text-steel">
                No account or card. Want to explain more? Use the full{" "}
                <Link href="/early-access" className="font-semibold text-gold hover:text-gold-soft">
                  early access form
                </Link>
                .
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
