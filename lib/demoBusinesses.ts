import { detailImages, type DetailImagePair } from "@/lib/demoContent";

export type ProofJob = {
  title: string;
  detail: string;
  images: DetailImagePair;
};

export type DemoBusiness = {
  slug: string;
  name: string;
  location: string;
  serviceType: string;
  description: string;
  featureItems: string[];
  demoNote: string;
  heroImages: DetailImagePair;
  jobs: ProofJob[];
};

export const featuredDemoBusinessSlug = "elite-mobile-detailing";
export const featuredProofPath = `/proof/${featuredDemoBusinessSlug}`;

export const demoBusinesses: Partial<Record<string, DemoBusiness>> = {
  [featuredDemoBusinessSlug]: {
    slug: featuredDemoBusinessSlug,
    name: "Elite Mobile Detailing",
    location: "Austin, TX",
    serviceType: "Full Interior Detail",
    description:
      'A sample interior detail page showing the kind of before/after proof a mobile detailer could send when a new lead asks, "Can I see your work?"',
    featureItems: ["Before/after photos", "What was cleaned", "Easy next step"],
    demoNote:
      "This is demo proof content, not a customer case study. A real page would use the detailer's own job photos, actual service notes, Google review link, and booking link.",
    heroImages: detailImages.footwell,
    jobs: [
      {
        title: "Pet hair cleanup for a daily driver SUV",
        detail: "A realistic example of turning a pet-hair cleanup into a clear before/after result for booking conversations.",
        images: detailImages.petHair
      },
      {
        title: "Leather seat refresh before a family road trip",
        detail: "Shows the kind of plain-language service note a detailer could pair with seat photos after a finished job.",
        images: detailImages.leatherSeat
      },
      {
        title: "Stain treatment and dashboard reset for a commuter car",
        detail: "Uses specific areas cleaned, not inflated claims, so a future customer can quickly understand the work.",
        images: detailImages.dashboard
      }
    ]
  }
};

export function getDemoBusiness(slug: string) {
  return demoBusinesses[slug];
}
