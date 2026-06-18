export type DemoFormValues = {
  businessName: string;
  serviceType: string;
  jobLocation: string;
  customerType: string;
  jobDescription: string;
  reviewLink: string;
};

export type OutputCard = {
  title: string;
  channel: string;
  text: string;
  why: string;
  use: string;
};

export type DetailImagePair = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
};

export const defaultDemoValues: DemoFormValues = {
  businessName: "Elite Mobile Detailing",
  serviceType: "Full Interior Detail",
  jobLocation: "Austin, TX",
  customerType: "Busy car owner",
  jobDescription:
    "Full interior detail with pet hair removal, leather cleaning, stain treatment, and dashboard wipe-down.",
  reviewLink: "your-google-review-link"
};

export const detailImages = {
  footwell: {
    beforeSrc: "/demo/interior-footwell-before.jpg",
    afterSrc: "/demo/interior-footwell-after.jpg",
    beforeAlt: "Dirty passenger footwell before a mobile interior detail",
    afterAlt: "Clean passenger footwell after a mobile interior detail"
  },
  petHair: {
    beforeSrc: "/demo/pet-hair-before.jpg",
    afterSrc: "/demo/pet-hair-after.jpg",
    beforeAlt: "Rear seat and carpet with visible pet hair before cleanup",
    afterAlt: "Rear seat and carpet cleaned after pet hair removal"
  },
  leatherSeat: {
    beforeSrc: "/demo/leather-seat-before.jpg",
    afterSrc: "/demo/leather-seat-after.jpg",
    beforeAlt: "Dull leather front seat with dust before cleaning",
    afterAlt: "Clean conditioned leather front seat after detailing"
  },
  dashboard: {
    beforeSrc: "/demo/dashboard-before.jpg",
    afterSrc: "/demo/dashboard-after.jpg",
    beforeAlt: "Dusty dashboard and cupholder area before cleaning",
    afterAlt: "Clean dashboard and cupholder area after detailing"
  }
} satisfies Record<string, DetailImagePair>;

export const sampleBeforeImage = detailImages.footwell.beforeSrc;
export const sampleAfterImage = detailImages.footwell.afterSrc;

export function buildOutputs(values: DemoFormValues): OutputCard[] {
  const service = values.serviceType || "detailing service";
  const business = values.businessName || "your detailing business";
  const location = values.jobLocation || "your service area";
  const customer = values.customerType || "car owner";
  const description = values.jobDescription || "a completed detail";
  const reviewLink = values.reviewLink || "your-google-review-link";

  return [
    {
      title: "Instagram caption",
      channel: "Social post",
      text: `${service} finished in ${location}. This ${customer.toLowerCase()} needed a clean reset, and the before/after tells the story: ${description} Need your interior back under control? Book ${business}.`,
      why: "Turns the job into a clear proof post with the result and next step in one caption.",
      use: "Post with your before/after photos after the job is finished."
    },
    {
      title: "TikTok video idea",
      channel: "Short-form video",
      text: `Hook: "This interior looked normal until we lifted the mats." Show quick cuts of the before, pet hair removal, stain treatment, leather cleaning, and the final after shot. End card: "${business} - ${service} in ${location}."`,
      why: "Gives the detailer a simple short-form structure that can be recorded from real job footage.",
      use: "Use as a quick filming plan for Reels, Shorts, or TikTok."
    },
    {
      title: "Google review request",
      channel: "Review request",
      text: `Hi, thanks again for choosing ${business} for your ${service}. If the interior feels fresh and the service was helpful, would you mind leaving a quick Google review here? ${reviewLink}\n\nBefore sending, replace your-google-review-link with your own Google review link.`,
      why: "Makes the review ask polite, direct, and tied to the service the customer just received.",
      use: "Send manually after the customer has seen the finished vehicle."
    },
    {
      title: "Proof page summary",
      channel: "Shareable page",
      text: `${business} completed a ${service} in ${location} for a ${customer.toLowerCase()}. The job included ${description} The finished interior gives future customers a clear look at the result before they book.`,
      why: "Turns a single completed job into a shareable page for booking conversations.",
      use: "Send when a new lead asks to see examples of your work."
    }
  ];
}
