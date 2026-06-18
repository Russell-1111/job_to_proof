"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";

const problems = [
  "Getting more reviews",
  "Posting consistently",
  "Showing proof to new customers",
  "Turning completed jobs into the next booking"
];

function fieldClass() {
  return "w-full rounded-md border border-white/10 bg-ink px-3 py-3 text-white outline-none transition placeholder:text-steel/60 focus:border-gold focus:ring-2 focus:ring-gold/15";
}

export function EarlyAccessForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

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
      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setMessage(result?.message ?? "We could not save your request. Please try again.");
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
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
        <fieldset className="sm:col-span-2">
          <legend className="mb-3 text-sm font-semibold text-white">
            Optional: would you consider paying $20/month if this helped turn completed jobs into proof?
          </legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Yes", "Maybe", "No"].map((answer) => (
              <label key={answer} className="flex cursor-pointer items-center gap-3 rounded-md border border-white/10 bg-ink px-3 py-3 text-white hover:border-gold/60">
                <input type="radio" name="would_pay_20" value={answer} className="accent-gold" />
                {answer}
              </label>
            ))}
          </div>
        </fieldset>
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
