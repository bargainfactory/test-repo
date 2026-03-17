// Mock / seed data for demo purposes

export const MOCK_USER = {
  id: "user_demo_001",
  name: "Alex Rivera",
  email: "alex@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  savingsScore: 78,
  totalSaved: 1247,
  monthlyIncome: 5800,
  monthlyExpenses: 4320,
};

export const MOCK_EXPENSES = [
  { id: "1", category: "Housing", merchant: "Sunset Apartments", amount: 1850, date: "2026-03-01", type: "debit", ai_tip: "Negotiate a 3-month lock-in to save ~$185/mo" },
  { id: "2", category: "Groceries", merchant: "Whole Foods Market", amount: 342, date: "2026-03-03", type: "debit", ai_tip: "Switch to Aldi for similar items — save ~$120/mo" },
  { id: "3", category: "Utilities", merchant: "City Electric Co.", amount: 178, date: "2026-03-05", type: "debit", ai_tip: "Green energy plan saves avg $34/mo at same reliability" },
  { id: "4", category: "Streaming", merchant: "Netflix", amount: 22.99, date: "2026-03-07", type: "debit", ai_tip: "Share plan with family — split to $7.67/person" },
  { id: "5", category: "Streaming", merchant: "Spotify", amount: 11.99, date: "2026-03-07", type: "debit", ai_tip: "Student/Family plan saves ~$6/mo" },
  { id: "6", category: "Insurance", merchant: "BlueCross Health", amount: 380, date: "2026-03-08", type: "debit", ai_tip: "ACA marketplace alternatives could save $90-140/mo" },
  { id: "7", category: "Transport", merchant: "Uber / Lyft", amount: 215, date: "2026-03-10", type: "debit", ai_tip: "Bike-share membership cuts this cost by 60%" },
  { id: "8", category: "Dining", merchant: "Chipotle", amount: 67, date: "2026-03-12", type: "debit", ai_tip: "Meal prep Sundays saves avg $180/mo on dining" },
  { id: "9", category: "Internet", merchant: "Spectrum Cable", amount: 89, date: "2026-03-14", type: "debit", ai_tip: "Threaten to cancel — they typically offer $30/mo off" },
  { id: "10", category: "Phone", merchant: "Verizon Wireless", amount: 95, date: "2026-03-15", type: "debit", ai_tip: "Mint Mobile MVNO same coverage at $30/mo" },
];

export const MOCK_BILLS = [
  {
    id: "b1",
    name: "Sunset Apartments",
    category: "Rent",
    amount: 1850,
    dueDate: "2026-04-01",
    status: "upcoming",
    negotiable: true,
    potentialSaving: 185,
    icon: "🏠",
  },
  {
    id: "b2",
    name: "BlueCross Health",
    category: "Insurance",
    amount: 380,
    dueDate: "2026-04-08",
    status: "upcoming",
    negotiable: true,
    potentialSaving: 95,
    icon: "🏥",
  },
  {
    id: "b3",
    name: "Spectrum Cable",
    category: "Internet",
    amount: 89,
    dueDate: "2026-04-14",
    status: "upcoming",
    negotiable: true,
    potentialSaving: 30,
    icon: "📡",
  },
  {
    id: "b4",
    name: "City Electric Co.",
    category: "Utilities",
    amount: 178,
    dueDate: "2026-04-05",
    status: "upcoming",
    negotiable: false,
    potentialSaving: 34,
    icon: "⚡",
  },
  {
    id: "b5",
    name: "Verizon Wireless",
    category: "Phone",
    amount: 95,
    dueDate: "2026-04-20",
    status: "upcoming",
    negotiable: true,
    potentialSaving: 65,
    icon: "📱",
  },
  {
    id: "b6",
    name: "Netflix Premium",
    category: "Streaming",
    amount: 22.99,
    dueDate: "2026-04-07",
    status: "upcoming",
    negotiable: false,
    potentialSaving: 15,
    icon: "🎬",
  },
];

export const MOCK_DEALS = [
  {
    id: "d1",
    title: "Aldi Weekly Savings",
    category: "Groceries",
    discount: "Up to 40% off",
    expires: "2026-03-24",
    estSaving: 120,
    logo: "🛒",
    badge: "Hot",
  },
  {
    id: "d2",
    title: "Mint Mobile - $30/mo Plan",
    category: "Phone",
    discount: "Save $65/mo vs Verizon",
    expires: "2026-03-31",
    estSaving: 65,
    logo: "📱",
    badge: "Best Value",
  },
  {
    id: "d3",
    title: "Lemonade Renters Insurance",
    category: "Insurance",
    discount: "Starting at $5/mo",
    expires: "2026-04-30",
    estSaving: 45,
    logo: "🏡",
    badge: "New",
  },
  {
    id: "d4",
    title: "GreenPower Energy Plan",
    category: "Utilities",
    discount: "19% cheaper than avg",
    expires: "2026-04-15",
    estSaving: 34,
    logo: "🌱",
    badge: "Eco",
  },
  {
    id: "d5",
    title: "Costco Membership",
    category: "Groceries",
    discount: "$65/yr saves avg $600",
    expires: "2026-05-01",
    estSaving: 535,
    logo: "🏪",
    badge: "Top Pick",
  },
  {
    id: "d6",
    title: "Amazon Prime Annual",
    category: "Shopping",
    discount: "Pay yearly — save $40",
    expires: "2026-03-31",
    estSaving: 40,
    logo: "📦",
    badge: "Limited",
  },
];

export const MOCK_HUSTLES = [
  {
    id: "h1",
    title: "Freelance Web Development",
    category: "Tech",
    earnings: "$50–$150/hr",
    difficulty: "Medium",
    time: "5–20 hrs/wk",
    platforms: ["Upwork", "Toptal", "Fiverr"],
    description: "Your profile shows tech skills. Build projects on nights/weekends.",
    match: 95,
    icon: "💻",
  },
  {
    id: "h2",
    title: "DoorDash / Instacart",
    category: "Gig",
    earnings: "$18–$28/hr",
    difficulty: "Easy",
    time: "Flexible",
    platforms: ["DoorDash", "Instacart", "Uber Eats"],
    description: "Immediate income, flexible schedule. Great while building other skills.",
    match: 88,
    icon: "🛵",
  },
  {
    id: "h3",
    title: "Online Tutoring",
    category: "Education",
    earnings: "$25–$80/hr",
    difficulty: "Easy",
    time: "3–15 hrs/wk",
    platforms: ["Wyzant", "VIPKid", "Chegg"],
    description: "Strong GPA/skills detected. Teach what you know on your schedule.",
    match: 82,
    icon: "📚",
  },
  {
    id: "h4",
    title: "AI Prompt Engineering",
    category: "Tech",
    earnings: "$35–$100/hr",
    difficulty: "Low–Medium",
    time: "10–30 hrs/wk",
    platforms: ["Scale AI", "Remotasks", "Upwork"],
    description: "Booming 2026 skill. Annotate, train, and consult on AI systems.",
    match: 91,
    icon: "🤖",
  },
  {
    id: "h5",
    title: "Etsy Digital Products",
    category: "Creative",
    earnings: "$200–$2k/mo passive",
    difficulty: "Low",
    time: "5 hrs to set up",
    platforms: ["Etsy", "Gumroad", "Payhip"],
    description: "Create once, sell forever. Templates, printables, digital art.",
    match: 74,
    icon: "🎨",
  },
  {
    id: "h6",
    title: "Real Estate Wholesaling",
    category: "Real Estate",
    earnings: "$5k–$20k per deal",
    difficulty: "Hard",
    time: "20+ hrs/wk",
    platforms: ["PropStream", "DealMachine"],
    description: "Find motivated sellers, assign contracts to investors. High reward.",
    match: 58,
    icon: "🏘️",
  },
];

export const MOCK_SAVINGS_CHART = [
  { month: "Oct", savings: 245, expenses: 4980, income: 5800 },
  { month: "Nov", savings: 312, expenses: 4820, income: 5800 },
  { month: "Dec", savings: 180, expenses: 5100, income: 5800 },
  { month: "Jan", savings: 520, expenses: 4650, income: 5800 },
  { month: "Feb", savings: 688, expenses: 4490, income: 5800 },
  { month: "Mar", savings: 1247, expenses: 4320, income: 5800 },
];

export const MOCK_NET_WORTH = [
  { month: "Oct", nominal: 24500, adjusted: 23800 },
  { month: "Nov", nominal: 25100, adjusted: 24200 },
  { month: "Dec", nominal: 24800, adjusted: 23700 },
  { month: "Jan", nominal: 26400, adjusted: 25100 },
  { month: "Feb", nominal: 28300, adjusted: 26800 },
  { month: "Mar", nominal: 30850, adjusted: 29100 },
];

export const MOCK_TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Nurse, Chicago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    quote: "ThriveGuard found $340/mo in hidden savings I was leaving on the table. My rent negotiation letter worked first try — landlord gave me $150 off!",
    saved: 340,
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus T.",
    role: "Software Engineer, Austin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    quote: "The AI advisor told me exactly which bills to call about and what to say. Saved $89/mo on internet + $65/mo switching phone plans in one afternoon.",
    saved: 154,
    rating: 5,
  },
  {
    id: 3,
    name: "Priya K.",
    role: "Teacher, Seattle",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    quote: "Cost of living is brutal right now. ThriveGuard's hustle quiz matched me to online tutoring — I'm making an extra $800/mo while keeping my teaching job.",
    saved: 800,
    rating: 5,
  },
  {
    id: 4,
    name: "James W.",
    role: "Restaurant Manager, NYC",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    quote: "Thought I was already cutting corners everywhere. ThriveGuard found 9 more places to save. $1,100 more in my account every month now.",
    saved: 1100,
    rating: 5,
  },
];

export const MOCK_CHAT_RESPONSES: Record<string, string> = {
  default: "Great question! Based on your spending patterns, I can see several opportunities to optimize your finances. Would you like me to dig into your highest expense categories?",
  rent: "To negotiate your rent down 15%, here's your game plan:\n\n1. **Research comparable units** — check Zillow/Apartments.com for similar apartments in your area priced lower\n2. **Time it right** — negotiate 60 days before lease renewal, never last-minute\n3. **Offer concessions** — longer lease term (18-24 months) in exchange for lower monthly rate\n4. **Use my template letter** — it has a 73% success rate with landlords\n\nShall I generate your personalized negotiation letter now?",
  grocery: "Here's how to slash your grocery bill by 30-40%:\n\n• **Switch stores**: Aldi, Lidl, or WinCo save avg $150/mo vs Whole Foods\n• **Meal prep Sundays**: reduces food waste and impulse buys\n• **Cashback apps**: Ibotta + Fetch Rewards stack for 5-8% back\n• **Store brands**: 95% identical, 30% cheaper\n• **Shop seasonally**: in-season produce is 40% cheaper\n\nYour current grocery spend is $342/mo. Target: $200/mo saving $142.",
  side: "Based on your profile, here are your top 3 income boosters:\n\n🥇 **Freelance Web Dev** — $50-150/hr, 5-10hrs/wk = $1,000-3,000 extra/mo\n🥈 **AI Prompt Engineering** — Fastest growing skill in 2026, $35-100/hr\n🥉 **Online Tutoring** — Flexible schedule, $25-80/hr\n\nI recommend starting with tutoring to build confidence, then scaling to freelance dev. Want me to create your Upwork profile pitch?",
};

export function generateNegotiationEmail(bill: typeof MOCK_BILLS[0]): string {
  const templates: Record<string, string> = {
    Rent: `Subject: Lease Renewal Discussion - Unit [Your Unit #]

Dear [Landlord/Property Manager Name],

I hope this message finds you well. I have been a resident at [Property Name] since [Move-in Date] and have consistently paid rent on time. I genuinely enjoy living here and would love to continue our positive relationship.

As my lease approaches renewal, I've been reviewing my budget carefully. With current economic pressures, I'm finding it challenging to sustain the current rent of $${bill.amount}/month. I've researched comparable units in the neighborhood and found similar properties listing at $${(bill.amount - bill.potentialSaving).toFixed(0)}-${(bill.amount - bill.potentialSaving * 0.7).toFixed(0)}/month.

I'd like to propose a renewal at $${(bill.amount - bill.potentialSaving).toFixed(0)}/month in exchange for signing an 18-month lease, which provides you the security of a long-term committed tenant.

I would appreciate the opportunity to discuss this. Thank you for your consideration.

Warm regards,
[Your Name]
[Phone Number]`,

    Internet: `Subject: Service Review & Retention Discussion

Dear Spectrum Customer Service,

I am a loyal customer (Account #[XXXXX]) and have been with Spectrum for [X] years. I'm reaching out because I recently received an offer from a competing provider — [Competitor] is offering comparable speeds at $${(bill.amount - bill.potentialSaving).toFixed(0)}/month.

Before I make a switch, I wanted to give Spectrum the opportunity to match this rate. I'd prefer to stay given the relationship we've built, but I need to make financially sound decisions.

Could you please connect me with your retention department to discuss available options? I'd love to stay, but need a rate of $${(bill.amount - bill.potentialSaving).toFixed(0)}/month or lower.

Thank you for your understanding,
[Your Name]`,

    Phone: `Subject: Account Review - Retention Request

Dear Verizon Retention Team,

I've been a Verizon customer for [X] years and truly value the network quality. However, I've been approached by competitors (Mint Mobile, T-Mobile) offering similar coverage at $${(bill.amount - bill.potentialSaving).toFixed(0)}/month — significantly less than my current $${bill.amount}/month plan.

I'm requesting a loyalty discount or plan adjustment to $${(bill.amount - bill.potentialSaving).toFixed(0)}/month to reflect my long-standing relationship. I'd rather stay, but financially I need to reduce this expense.

Please let me know what retention offers are available. I'm happy to discuss via phone at [Your Number].

Thank you,
[Your Name]`,

    Insurance: `Subject: Policy Review & Premium Reduction Request

Dear [Insurance Provider] Team,

I've been a policyholder (Policy #[XXXXX]) for [X] years with a clean claims history. Given this track record and rising living costs, I'd like to formally request a premium review.

I've received competing quotes from other providers for equivalent coverage at approximately $${(bill.amount - bill.potentialSaving).toFixed(0)}-${(bill.amount - bill.potentialSaving * 0.7).toFixed(0)}/month. Before switching, I wanted to give you the chance to match this rate.

Could you review my policy for any applicable discounts, bundle options, or loyalty credits? A reduction to $${(bill.amount - bill.potentialSaving).toFixed(0)}/month would allow me to remain a loyal customer.

Best regards,
[Your Name]`,
  };

  return templates[bill.category] || `Subject: Service Rate Review Request

Dear [Company Name],

I've been a loyal customer and would like to discuss my current rate of $${bill.amount}/month. Based on my research and competing offers, I believe a rate of $${(bill.amount - bill.potentialSaving).toFixed(0)}/month would be more appropriate.

Please let me know how we can resolve this to our mutual benefit.

Thank you,
[Your Name]`;
}
