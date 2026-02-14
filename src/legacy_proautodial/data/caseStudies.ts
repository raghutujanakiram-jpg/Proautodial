export type CaseStudy = {
  company: string;
  scenario: string;
  metric: string;
  description: string;
  story: string;
  coordination: string;
  location: string;
  icon: string;
  prompt: string;
  website: string;
  logoUrl: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    company: "Agarwal Packers & Movers",
    scenario: "24x7 Domestic Command Center",
    metric: "99% Operational Uptime",
    description: "End-to-End domestic call center solution featuring Inbound, Outbound, IVR, OS Ticket, and CRM integration.",
    story: "As our largest long-term deployment, we engineered a high-concurrency node for 70+ agents. Operating 24x7, this architecture handles complex relocation logistics inquiries through a unified hub that synchronizes carrier-grade IVR with deep OS Ticket and CRM workflows.",
    coordination: "Strategized with Mr. Raman (IT-Head) and coordinated daily with Mr. Vinay and admin leads.",
    location: "Ranigunj, Hyderabad",
    icon: "fa-box-open",
    prompt: "High-tech logistics hub with holographic delivery routes, coral and slate theme, cinematic lighting",
    website: "http://www.agarwalpackers.in",
    logoUrl: "https://www.agarwalpackers.in/images/logo.png"
  },
  {
    company: "AplusA IT Services",
    scenario: "International Multi-Node Support",
    metric: "Global Campaign Mastery",
    description: "International call center architecture supporting concurrent USA and UK campaigns across multiple regional hubs.",
    story: "We deployed a robust international solution for diverse campaigns. Despite the hectic multi-location requirements, we maintained peak performance across various teams, fostering a partnership that goes beyond business into deep technical friendship.",
    coordination: "Coordinated requirements and daily scaling challenges with Mr. Arafat Ghori.",
    location: "Neredmet, Begumpet & Ameerpet (Hyderabad)",
    icon: "fa-earth-americas",
    prompt: "Futuristic international operations center with glowing digital maps, vibrant red and yellow accents",
    website: "http://www.aplusait.com",
    logoUrl: "https://ui-avatars.com/api/?name=A+Plus+A&background=DB5D43&color=fff"
  },
  {
    company: "Square India",
    scenario: "Commodities Missed Call API",
    metric: "Real-time Data Push",
    description: "Custom Missed Call Alert logic integrated with live commodity rate APIs for regional trade transparency.",
    story: "In a pioneering regional deployment, we solved the challenge of providing instant commodity rates through a simple missed call. The architecture synchronizes live rate tools with automated SMS/Voice triggers, a first for the Vizianagaram trade node.",
    coordination: "Managed requirements with Mr. Pratap Kolagatla and operational metrics with Ms. Jyothi.",
    location: "Vizianagaram",
    icon: "fa-chart-line-up",
    prompt: "Abstract visualization of stock and commodity rates on a digital grid, glowing orange data lines",
    website: "http://www.squareindia.com",
    logoUrl: "https://www.squareindia.com/assets/logo.png"
  },
  {
    company: "Apna Loan Bazaar",
    scenario: "Financial Outreach Node",
    metric: "Zero-Latency Maintenance",
    description: "Domestic outbound predictive dialer and auto-dialing solution for high-volume loan inquiries.",
    story: "We provide a 6-day support window (9am-5pm) for this financial hub. To ensure zero downtime during business hours, all backup and maintenance sequences are strategically executed on Sundays and post-operational windows.",
    coordination: "Direct technical coordination with Mr. Naveen.",
    location: "Domestic Hub (India)",
    icon: "fa-comments-dollar",
    prompt: "Modern fintech office with glowing loan approval charts, professional financial atmosphere",
    website: "https://www.apnaloanbazaar.com",
    logoUrl: "https://apnaloanbazaar.com/logo.png"
  },
  {
    company: "Best Tax Filer",
    scenario: "USA International Night-Ops",
    metric: "Midnight Support Prowess",
    description: "Installation and optimization of Goautodial open-source suite for international USA tax cycles.",
    story: "Catering exclusively to the USA market, we manage their critical night-shift infrastructure. Our engineering team maintains a 99% uptime with immediate midnight support response to ensure zero disruption during the peak US filing seasons.",
    coordination: "Strategized deployment and performance monitoring with Mr. Harish.",
    location: "International Ops Hub",
    icon: "fa-file-invoice-dollar",
    prompt: "Clean professional accounting office with digital tax forms, midnight blue and coral lighting",
    website: "https://www.besttaxfiler.com/",
    logoUrl: "https://besttaxfiler.com/logo.png"
  },
  {
    company: "Career Doctor",
    scenario: "Counseling Appointment Suite",
    metric: "Deterministic Call Flow",
    description: "Domestic domestic solution featuring predictive dialing and automated inbound counseling routing.",
    story: "Working with business owners and long-term admins, we've built a seamless 6-day support engine. The system manages counselor availability and student callbacks with high precision, ensuring every inquiry is handled within business hours.",
    coordination: "Directly managed with Mr. Ankam Rambabu (Owner) and Mr. Suresh (Admin Lead).",
    location: "Education Hub (India)",
    icon: "fa-user-doctor",
    prompt: "Futuristic education counseling center with glowing career maps, welcoming tech-lite design",
    website: "http://careerdoctor.in",
    logoUrl: "https://careerdoctor.in/logo.png"
  },
  {
    company: "LTW (Leo Tech Wave)",
    scenario: "Multi-City Global Solutions",
    metric: "Cross-Region Neural Link",
    description: "International call center architecture for USA clients spanning multiple high-capacity regional nodes.",
    story: "Building across four major locations, we managed a hectic multi-campaign environment with passion. The architecture bridges international nodes in Hyderabad and Vizag into a single unified telephony fabric.",
    coordination: "Strategized with Mr. Bhanu for requirements and Mr. Sai for day-to-day operations.",
    location: "Begumpet, KPHB, Secunderabad & Visakhapatnam",
    icon: "fa-crown",
    prompt: "High-end corporate office with world map showing glowing multi-city nodes, luxury business aesthetic",
    website: "https://www.linkedin.com/company/leo-tech-wave/",
    logoUrl: "https://ui-avatars.com/api/?name=LTW&background=0B0E14&color=fff"
  },
  {
    company: "PMC - Peace In Every Home",
    scenario: "NGO Inbound Gateway",
    metric: "High-Trust IVR Routing",
    description: "Specialized domestic inbound and IVR solution for Islamic related queries and community NGO support.",
    story: "As a mission-critical support line, we provide a robust inbound node with specialized IVR menus. Operating on a strict 6-day schedule, the system ensures that every query finds its way to the right counselor during business hours.",
    coordination: "Long-term partnership with Mr. Imran for operational requirements and scaling.",
    location: "Boyinpally, Hyderabad",
    icon: "fa-dove",
    prompt: "Peaceful modern NGO center with glowing motifs of guidance and calm, warm lighting",
    website: "#",
    logoUrl: "https://ui-avatars.com/api/?name=PMC&background=334155&color=fff"
  },
  {
    company: "Squircle IT",
    scenario: "Australia Early-Morning Ops",
    metric: "Peak Morning Performance",
    description: "Installation and 24/7 support of Goautodial suite for Australian international campaigns.",
    story: "To align with the Australian timezone, we manage early-morning support cycles. Our Goautodial deployment maintains a 99% uptime, ensuring the outreach nodes are fully operational and optimized for the high-value AU market.",
    coordination: "Coordinated requirements and troubleshooting cycles with Ms. Swapna.",
    location: "International IT Corridor",
    icon: "fa-code-merge",
    prompt: "Modern tech consulting lab with neon code abstractions and multi-monitor setups",
    website: "http://squircle.in/",
    logoUrl: "https://squircleit.com/logo.png"
  }
];
