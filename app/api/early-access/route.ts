import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  business_name?: unknown;
  business_type?: unknown;
  social_link?: unknown;
  biggest_problem?: unknown;
  would_pay_20?: unknown;
  selected_tier?: unknown;
  source?: unknown;
  notes?: unknown;
};

type SelectedTier = "free_preview" | "premium_20";

const requiredFields = [
  "name",
  "email",
  "business_name",
  "business_type",
  "biggest_problem"
] as const;

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function optionalString(value: unknown) {
  const trimmed = asTrimmedString(value);
  return trimmed.length > 0 ? trimmed : null;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function selectedTier(value: unknown): SelectedTier {
  return value === "free_preview" || value === "premium_20" ? value : "premium_20";
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { message: "Lead capture is not configured yet." },
      { status: 500 }
    );
  }

  let payload: LeadPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid submission." }, { status: 400 });
  }

  const lead = {
    name: asTrimmedString(payload.name),
    email: asTrimmedString(payload.email).toLowerCase(),
    business_name: asTrimmedString(payload.business_name),
    business_type: asTrimmedString(payload.business_type),
    social_link: optionalString(payload.social_link),
    biggest_problem: asTrimmedString(payload.biggest_problem),
    would_pay_20: selectedTier(payload.selected_tier ?? payload.would_pay_20),
    source: asTrimmedString(payload.source) === "homepage_fast_pass" ? "homepage_fast_pass" : "early_access",
    notes: optionalString(payload.notes)
  };

  const missingField = requiredFields.find((field) => lead[field].length === 0);
  if (missingField) {
    return NextResponse.json(
      { message: "Please complete all required fields." },
      { status: 400 }
    );
  }

  if (!isValidEmail(lead.email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  const { error } = await supabase.from("early_access_leads").insert(lead);

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({
        duplicate: true,
        message: "This email is already on the early access list."
      });
    }

    console.error("Early access lead insert failed", error);
    return NextResponse.json(
      { message: "We could not save your request. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "You are on the early access list." });
}
