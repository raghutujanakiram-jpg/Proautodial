export type ClientItem = {
  name: string;
  focus: string;
  slug?: string;
};

export const CLIENTS: ClientItem[] = [
  { name: "Agarwal Packers", focus: "IVR & Dialer Hub", slug: "agarwal-packers" },
  { name: "AplusA IT Services", focus: "International Ops", slug: "aplusa-it-services" },
  { name: "Apna Loan Bazaar", focus: "Predictive Dialer", slug: "apna-loan-bazaar" },
  { name: "Best Tax Filer", focus: "USA Support Center", slug: "best-tax-filer" },
  { name: "Career Doctor", focus: "Counseling IVR", slug: "career-doctor" },
  { name: "LTW", focus: "Multi-City Routing", slug: "ltw" },
  { name: "PMC", focus: "Religious NGO Hub", slug: "pmc" },
  { name: "Square India", focus: "Missed Call API", slug: "square-india" },
  { name: "Squircle IT", focus: "AU Campaign Ops", slug: "squircle-it" },
  { name: "Edify School", focus: "Voice Logging", slug: "edify-school" },
  { name: "Vegetable Basket", focus: "Supply Chain Comms", slug: "vegetable-basket" },
  // Added per request
  { name: "Ankura Hospitals", focus: "Healthcare Contact Center", slug: "ankura" },
  { name: "Drive Assured", focus: "Insurance Ops", slug: "drive-assured" },
  { name: "Call Sos", focus: "Emergency Communications", slug: "call-sos" },
  { name: "Outlook Dental Clinic", focus: "Healthcare Outreach", slug: "outlook-dental" },
  { name: "Wenso Creative Solutions", focus: "IT Services", slug: "wenso-solutions" },
  { name: "Digit Insurance", focus: "Insurance Hub", slug: "digit-insurance" },
  { name: "Iconma", focus: "Staffing Communications", slug: "iconma" },
  { name: "Hearzap (Hearing Solutions)", focus: "Healthcare Support", slug: "hearzap-hearing-solutions" }
];
