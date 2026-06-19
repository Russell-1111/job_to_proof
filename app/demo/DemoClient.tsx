"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Copy, ImagePlus, MessageSquareText, Sparkles, Wand2 } from "lucide-react";
import { BeforeAfter } from "@/components/BeforeAfter";
import { featuredProofPath } from "@/lib/demoBusinesses";
import { buildOutputs, defaultDemoValues, DemoFormValues, sampleAfterImage, sampleBeforeImage } from "@/lib/demoContent";

function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white">{label}</span>
      {children}
    </label>
  );
}

function inputClass() {
  return "w-full rounded-md border border-white/10 bg-ink/90 px-3 py-3 text-white outline-none transition placeholder:text-steel/60 focus:border-gold focus:ring-2 focus:ring-gold/15";
}

function CopyButton({ text }: { text: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "fallback">("idle");

  async function copyText() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setStatus("copied");
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setStatus("copied");
      }
    } catch {
      setStatus("fallback");
    }

    window.setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <button
      type="button"
      onClick={copyText}
      className="inline-flex shrink-0 items-center gap-2 rounded-md border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm font-semibold text-white hover:border-gold/60"
      aria-label="Copy generated text"
      data-testid="copy-output"
    >
      {status === "copied" ? <Check className="size-4 text-mint" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      {status === "copied" ? "Copied" : status === "fallback" ? "Select text" : "Copy"}
    </button>
  );
}

export function DemoClient() {
  const [values, setValues] = useState<DemoFormValues>(defaultDemoValues);
  const [generated, setGenerated] = useState(false);
  const [beforeSrc, setBeforeSrc] = useState(sampleBeforeImage);
  const [afterSrc, setAfterSrc] = useState(sampleAfterImage);
  const [beforeName, setBeforeName] = useState("Footwell before detail");
  const [afterName, setAfterName] = useState("Footwell after detail");
  const outputRef = useRef<HTMLDivElement>(null);
  const outputs = useMemo(() => buildOutputs(values), [values]);
  const beforeIsUpload = beforeSrc.startsWith("data:");
  const afterIsUpload = afterSrc.startsWith("data:");

  function updateValue<K extends keyof DemoFormValues>(key: K, value: DemoFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>, side: "before" | "after") {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      if (side === "before") {
        setBeforeSrc(result);
        setBeforeName(file.name);
      } else {
        setAfterSrc(result);
        setAfterName(file.name);
      }
    };
    reader.readAsDataURL(file);
  }

  function generateProof() {
    setGenerated(true);
    window.setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="surface rounded-lg p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Sample job loaded</p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight text-white sm:text-4xl">Turn one finished detail into proof you can copy</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-steel">
              Tap generate for the instant sample, or make a quick edit first. The form is already filled for a mobile interior detail.
            </p>
          </div>
          <span className="hidden rounded-md border border-gold/30 bg-gold/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold sm:inline-flex">
            Static demo
          </span>
        </div>

        <div className="mt-5 grid gap-3 rounded-lg border border-gold/20 bg-gold/10 p-3 text-sm text-gold-soft sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="grid gap-2 sm:grid-cols-3">
            {["Before/after photos", "Job summary", "Review link"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-md border border-gold/20 bg-black/15 px-3 py-2">
                <Check className="size-4 text-gold" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
          <button type="button" onClick={generateProof} className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 font-semibold text-ink shadow-glow hover:bg-gold-soft">
            Generate sample proof
            <Wand2 className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Optional edits</p>
          <p className="mt-2 text-sm leading-6 text-steel">
            For the fastest demo, leave these as-is and generate. Change only the details you want to see reflected in the copy.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Business name">
            <input className={inputClass()} value={values.businessName} onChange={(event) => updateValue("businessName", event.target.value)} />
          </Field>
          <Field label="Service type">
            <input className={inputClass()} value={values.serviceType} onChange={(event) => updateValue("serviceType", event.target.value)} />
          </Field>
          <Field label="Job location">
            <input className={inputClass()} value={values.jobLocation} onChange={(event) => updateValue("jobLocation", event.target.value)} />
          </Field>
          <Field label="Customer type">
            <input className={inputClass()} value={values.customerType} onChange={(event) => updateValue("customerType", event.target.value)} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Job description">
              <textarea className={`${inputClass()} min-h-28 resize-y`} value={values.jobDescription} onChange={(event) => updateValue("jobDescription", event.target.value)} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Google review link">
              <input className={inputClass()} value={values.reviewLink} onChange={(event) => updateValue("reviewLink", event.target.value)} />
            </Field>
            <p className="mt-2 text-xs leading-5 text-steel">
              Demo placeholder only. Paste your own Google review link here before sending the generated request to a customer.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-ink p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image src={beforeSrc} alt="Before detailing image preview" fill className="object-cover" unoptimized={beforeIsUpload} sizes="(min-width: 640px) 50vw, 100vw" />
            </div>
            <p className="mt-3 truncate text-sm text-steel">{beforeName}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-white/15 px-3 py-2.5 text-sm font-semibold text-white hover:border-gold/60">
                <ImagePlus className="size-4" aria-hidden="true" />
                Upload
                <input className="sr-only" type="file" accept="image/*" onChange={(event) => handleImageUpload(event, "before")} />
              </label>
              <button type="button" className="rounded-md border border-white/15 px-3 py-2.5 text-sm font-semibold text-white hover:border-gold/60" onClick={() => { setBeforeSrc(sampleBeforeImage); setBeforeName("Footwell before detail"); }}>
                Use sample
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-ink p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image src={afterSrc} alt="After detailing image preview" fill className="object-cover" unoptimized={afterIsUpload} sizes="(min-width: 640px) 50vw, 100vw" />
            </div>
            <p className="mt-3 truncate text-sm text-steel">{afterName}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-white/15 px-3 py-2.5 text-sm font-semibold text-white hover:border-gold/60">
                <ImagePlus className="size-4" aria-hidden="true" />
                Upload
                <input className="sr-only" type="file" accept="image/*" onChange={(event) => handleImageUpload(event, "after")} />
              </label>
              <button type="button" className="rounded-md border border-white/15 px-3 py-2.5 text-sm font-semibold text-white hover:border-gold/60" onClick={() => { setAfterSrc(sampleAfterImage); setAfterName("Footwell after detail"); }}>
                Use sample
              </button>
            </div>
          </div>
        </div>

        <button type="button" onClick={generateProof} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-5 py-4 text-base font-semibold text-ink shadow-glow hover:bg-gold-soft">
          <Wand2 className="size-5" aria-hidden="true" />
          Generate Proof
        </button>
      </section>

      <section ref={outputRef} className="surface scroll-mt-24 rounded-lg p-4 sm:p-6 lg:sticky lg:top-20 lg:self-start">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Generated proof assets</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{generated ? "Your shareable proof page is ready" : "Your proof appears here"}</h2>
          </div>
        </div>

        {!generated ? (
          <div className="mt-6 grid min-h-[24rem] place-items-center rounded-lg border border-dashed border-white/15 bg-ink p-6 text-center">
            <div>
              <Sparkles className="mx-auto size-10 text-gold" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold text-white">See the assets from this sample job</h3>
              <p className="mx-auto mt-3 max-w-sm leading-7 text-steel">
                Generate proof to create a social caption, short-form video idea, review messages, and a proof-page summary.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            <article className="rounded-lg border border-gold/30 bg-ink p-4 shadow-glow">
              <div className="grid gap-4">
                <div>
                  <p className="mb-2 inline-flex items-center gap-2 rounded-md border border-gold/20 bg-gold/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                    Visual proof asset
                  </p>
                  <h3 className="text-xl font-semibold text-white">Your shareable proof page is ready</h3>
                  <p className="mt-3 text-sm leading-6 text-steel">
                    This is the asset that helps turn one finished job into trust for the next customer: a proof page with the job result, before/after images, and a clear next step.
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                  <BeforeAfter
                    beforeSrc={beforeSrc}
                    afterSrc={afterSrc}
                    beforeAlt="Generated proof before image preview"
                    afterAlt="Generated proof after image preview"
                  />
                  <div className="mt-3 rounded-md border border-white/10 bg-ink p-3">
                    <p className="text-sm font-semibold text-white">{values.businessName || "Your detailing business"} proof page preview</p>
                    <p className="mt-2 text-xs leading-5 text-steel">
                      {values.serviceType || "Detailing service"} in {values.jobLocation || "your service area"} with job notes, before/after photos, and a booking-ready CTA.
                    </p>
                  </div>
                </div>

                <Link href={featuredProofPath} className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-semibold text-ink hover:bg-gold-soft">
                  View proof page
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </article>

            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Bonus: copy-ready posts and review requests</p>
              <p className="mt-2 text-sm leading-6 text-steel">
                These are secondary outputs you can copy after the visual proof page is ready.
              </p>
            </div>

            {outputs.map((output) => (
              <article key={output.title} className="rounded-lg border border-white/10 bg-ink p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="mb-2 inline-flex items-center gap-2 rounded-md border border-gold/20 bg-gold/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                      <MessageSquareText className="size-3.5" aria-hidden="true" />
                      {output.channel}
                    </p>
                    <h3 className="text-lg font-semibold text-white">{output.title}</h3>
                  </div>
                  <CopyButton text={output.text} />
                </div>
                <p className="mt-3 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs leading-5 text-steel">
                  Use it for: {output.use}
                </p>
                <p className="mt-3 whitespace-pre-line rounded-md border border-white/10 bg-white/[0.03] p-3 text-sm leading-6 text-white/90">{output.text}</p>
                <p className="mt-3 rounded-md border border-gold/20 bg-gold/10 px-3 py-2 text-xs leading-5 text-gold-soft">
                  Why this helps: {output.why}
                </p>
              </article>
            ))}
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Next step</p>
              <p className="mt-2 text-sm leading-6 text-steel">
                This is the core loop: finished job in, visual proof page first, supporting copy underneath. Request early access if this would save time after real jobs.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <Link href={featuredProofPath} className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-semibold text-ink hover:bg-gold-soft">
                  View proof page
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link href="/early-access" className="inline-flex items-center justify-center rounded-md border border-white/15 px-4 py-3 text-sm font-semibold text-white hover:border-gold/60">
                  Join early access
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
