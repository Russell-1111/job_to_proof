"use client";

import { FormEvent, useRef, useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";

type SelectedTier = "free_preview" | "premium_20";

const problems = [
  "Getting more reviews",
  "Posting consistently",
  "Showing proof to new customers",
  "Turning completed jobs into the next booking"
];

const pricingTiers: Array<{
  value: SelectedTier;
  title: string;
  price: string;
  features: string[];
  selectText: string;
  featured?: boolean;
}> = [
  {
    value: "free_preview",
    title: "Free Preview",
    price: "$0 / early preview",
    features: ["See example proof pages", "Get launch updates", "Limited preview access if invited"],
    selectText: "Select Free Preview"
  },
  {
    value: "premium_20",
    title: "Premium Early Access",
    price: "$20 / month after launch",
    features: [
      "Custom-branded proof pages",
      "Interactive before/after sliders",
      "More proof pages for active jobs",
      "Share-ready proof links for customer follow-up"
    ],
    selectText: "I\u2019d Try This at $20/month",
    featured: true
  }
];

function fieldClass() {
  return "w-full rounded-md border border-white/10 bg-ink px-3 py-3 text-white outline-none transition placeholder:text-steel/60 focus:border-gold focus:ring-2 focus:ring-gold/15";
}

export function EarlyAccessForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<SelectedTier>("premium_20");
  const fieldsRef = useRef<HTMLDivElement>(null);
  const tierConfirmation =
    selectedTier === "premium_20"
      ? {
          title: "You selected Premium Early Access \u2014 $20/month after launch.",
          detail: "This helps us prioritize detailers interested in JobToProof as a paid product.",
          className: "border-gold/25 bg-gold/10 text-gold-soft",
          dotClassName: "bg-gold"
        }
      : {
          title: "You selected Free Preview.",
          detail: "We\u2019ll send launch updates and limited preview access if available.",
          className: "border-white/10 bg-white/[0.04] text-steel",
          dotClassName: "bg-steel"
        };

  function selectTier(tier: SelectedTier) {
    setSelectedTier(tier);
    window.requestAnimationFrame(() => {
      fieldsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const formData = new FormData(event.currentTarget);
      const payload = Object.fromEntries(formData.entries());
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

      if (result?.duplicate) {
        setMessage(result.message ?? "This email is already on the early access list.");
        return;
      }

      setSubmitted(true);
    } catch (error) {
      setMessage("We could not save your request. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="surface rounded-lg p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-gold" aria-hidden="true" />
        <h1 className="mt-4 text-3xl font-semibold text-white">Request submitted.</h1>
        <p className="mt-3 text-lg leading-7 text-steel">
          Thanks. This MVP does not create an account or charge a card. Your request is on the JobToProof early access list.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="surface rounded-lg p-5 sm:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Early access</p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-white sm:text-4xl">Get the workflow for turning jobs into proof</h2>
        <p className="mt-4 leading-7 text-steel">
          Tell us where proof breaks down after a completed detail. This form is short, and it does not create an account, charge a card, or send messages.
        </p>
        <div className="mt-5 rounded-md border border-gold/20 bg-gold/10 p-4 text-sm leading-6 text-gold-soft">
          <ShieldCheck className="mb-2 size-5 text-gold" aria-hidden="true" />
          Built for solo and small mobile detailing businesses that want more reviews, better posts, and proof they can share with new leads.
        </div>
      </div>

      <section className="mt-8" aria-labelledby="pricing-intent-heading">
        <div className="mb-4">
          <h3 id="pricing-intent-heading" className="text-xl font-semibold text-white">
            Choose your early access intent
          </h3>
          <p className="mt-2 text-sm leading-6 text-steel">
            Choose the access level you would realistically want. This helps us validate whether JobToProof is worth building beyond the MVP.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {pricingTiers.map((tier) => {
            const isSelected = selectedTier === tier.value;
            const cardClass = tier.featured
              ? `rounded-lg border p-5 transition ${isSelected ? "border-gold bg-gold/15 shadow-glow" : "border-gold/50 bg-gold/10 hover:border-gold"}`
              : `rounded-lg border p-5 transition ${isSelected ? "border-white/30 bg-white/[0.06]" : "border-white/10 bg-ink hover:border-white/25 hover:bg-white/[0.04]"}`;
            const buttonClass = tier.featured
              ? "mt-5 inline-flex w-full items-center justify-center rounded-md bg-gold px-4 py-3 text-sm font-semibold text-ink hover:bg-gold-soft focus:outline-none focus:ring-2 focus:ring-gold/40"
              : "mt-5 inline-flex w-full items-center justify-center rounded-md border border-white/15 bg-transparent px-4 py-3 text-sm font-semibold text-white hover:border-white/25 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-white/20";

            return (
              <article key={tier.value} className={cardClass}>
                <div className="flex h-full flex-col">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{tier.title}</h4>
                    <p className={tier.featured ? "mt-2 text-2xl font-semibold text-gold" : "mt-2 text-2xl font-semibold text-white"}>
                      {tier.price}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm leading-6 text-steel">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <span className={tier.featured ? "mt-2 size-1.5 shrink-0 rounded-full bg-gold" : "mt-2 size-1.5 shrink-0 rounded-full bg-steel"} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className={buttonClass}
                    aria-pressed={isSelected}
                    onClick={() => selectTier(tier.value)}
                  >
                    {isSelected ? "Selected \u2713" : tier.selectText}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <input type="hidden" name="selected_tier" value={selectedTier} />

      <div ref={fieldsRef} className="mt-8 scroll-mt-24">
        <div className={`mb-4 rounded-md border px-4 py-3 text-sm leading-6 ${tierConfirmation.className}`}>
          <p className="flex min-w-0 items-start gap-2 font-semibold text-white">
            <span className={`mt-2 size-1.5 shrink-0 rounded-full ${tierConfirmation.dotClassName}`} aria-hidden="true" />
            <span className="min-w-0">{tierConfirmation.title}</span>
          </p>
          <p className="mt-1 pl-3.5 text-xs leading-5">{tierConfirmation.detail}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-white">Your name</span>
          <input required className={fieldClass()} name="name" autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-white">Best email</span>
          <input required className={fieldClass()} name="email" type="email" autoComplete="email" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-white">Business name</span>
          <input required className={fieldClass()} name="business_name" autoComplete="organization" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-white">Business type</span>
          <input required className={fieldClass()} name="business_type" defaultValue="Mobile detailer" />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-white">Instagram, TikTok, or website link <span className="font-normal text-steel">(optional)</span></span>
          <input className={fieldClass()} name="social_link" placeholder="https://..." />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-white">Where do finished jobs lose momentum?</span>
          <select required className={fieldClass()} name="biggest_problem" defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {problems.map((problem) => (
              <option key={problem}>{problem}</option>
            ))}
          </select>
        </label>
      </div>

      {message ? (
        <p className="mt-5 rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-100" role="alert">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-gold px-5 py-4 font-semibold text-ink hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Request early access"}
      </button>
    </form>
  );
}
