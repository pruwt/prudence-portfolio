export const caseStudies = [
  // ─── NEITHA COLLECTIVE ──────────────────────────────────────────────────────
  {
    title: "Neitha Collective",
    slug: "neitha",
    tags: ["Brand Design", "Identity", "Strategy"],
    hook: "Most brands ask what they look like. Neitha needed to figure out what it stood for first.",
    meta: {
      role: "Brand Strategist & Visual Designer",
      year: "2025",
      tools: "Adobe Illustrator, Figma",
      deliverable: "Full brand identity system",
    },
    coverImage: "/images/neitha.jpg",
    intro:
      "My friend Lorna, Neitha's founder, came with a name and an instinct. I turned that into a brand identity system ready to trade: logo, colour, typography, and every application built for a brand about to launch.",
    prototypeUrl: null,
    sections: [
      {
        type: "text",
        label: "The brief",
        heading: "A name and conviction. Nothing else.",
        body: "Neitha came to me with an instinct: bold, expressive, something that felt personal. But no visual language to show for it. No logo, no colour direction, no identity system. That's actually the hardest kind of brief to receive. There's nothing to react to. Everything has to come from listening carefully and then making strong decisions.",
      },
      {
        type: "text",
        label: "The tension",
        heading: "Bold without tipping into noise.",
        body: "The Kenyan fashion market has a sameness problem. Brands cluster around the same safe palettes and modes of expression. Neitha wasn't interested in settling. But bold fashion brands often tip into either aggressive maximalism or studied minimalism. The challenge was finding the space between: a clear point of view that didn't pin the brand to a single mood. Importantly, give people a chance to find clothes they want to wear, not just a brand they wanted to follow.",

      },
      {
        type: "images",
        intro: "A complete identity system. Not a concept. Every asset ready from day one: primary mark, alternate logotypes, colour palette, hang tags, shopping bags, business cards.",
        groups: [
          {
            layout: "full",
            items: [{ src: "/images/neitha/primary logo@2x.png", caption: "Primary brand mark" }],
          },
          {
            layout: "two-col",
            items: [
              { src: "/images/neitha/altlogo2.png", caption: "Alternative logo1", contain: true },
              { src: "/images/neitha/altlogo3.png", caption: "Alternative logo2", contain: true },
            ],
          },
          {
            layout: "three-col",
            items: [
              { src: "/images/neitha/neitha hang tag mockup - Copy.jpg", caption: "Hang tag" },
              { src: "/images/neitha/shopping bag design 1.jpg", caption: "Shopping bag" },
              { src: "/images/neitha/Business Card Mockup Stack 2.jpg", caption: "Business cards" },
            ],
          },
        ],
      },
      {
        type: "text",
        label: "The mark",
        heading: "Neither this nor that.",
        body: "The final logo references both the N and C, functioning like a yin and yang. It carries the idea embedded in the name itself: fluid, unrestricted, neither one thing nor another. The circular composition speaks to community and unity without rigidity. It works as a wordmark, a standalone icon, and everything in between.",
      },
      {
        type: "images",
        label: "Art direction",
        intro: "The visual language extended beyond the mark — into textures, compositions, and the feeling a brand creates before a product is even visible. The idea, to give the brand a dyanamic view while still being rooted in the mark's core idea of fluidity and duality.",
        groups: [
          {
            layout: "full",
            items: [{ src: "/images/neitha/art direction 1 logomark.jpg", caption: null, objectPosition: "center 30%" }],
          },
          {
            layout: "two-col",
            items: [
              { src: "/images/neitha/art direction 2 .jpg", caption: null },
              { src: "/images/neitha/art direction 3.jpg", caption: null },
            ],
          },
          {
            layout: "two-col",
            items: [
              { src: "/images/neitha/art direction 4.jpg", caption: null },
              { src: "/images/neitha/wall mockup.jpg", caption: null },
            ],
          },
        ],
      },
      {
        type: "images",
        label: "In the world",
        intro: "The identity in use across social: consistent, immediately recognisable, holding up exactly as designed.",
        groups: [
          {
            layout: "two-col",
            aspect: "aspect-[3/4]",
            items: [
              { src: "/images/neitha/neitha ig grid mockup layout.jpg", caption: "Instagram grid" },
              { src: "/images/neitha/ig story posts mockup.jpg", caption: "Instagram stories" },
            ],
          },
        ],
      },
      {
        type: "callout",
        label: "What this taught me",
        body: "When a client brings you a name and a feeling, the brief is everywhere: in how they talk about their customers, in what frustrates them about other brands, in the offhand things they say aren't quite right. A brand identity isn't done when the logo is approved. It's done when it's in the world and holding. A year on, Neitha's assets are consistently in use across her Instagram storefront, product photography, and packaging in the wild. This one is holding. If you're looking for custom wear, please check out @neithacollective on Instagram. Completely worth it.",
      },
    ],
    nextSlug: "nse",
  },

  // ─── NSE ONBOARDING ─────────────────────────────────────────────────────────
  {
    title: "NSE Onboarding",
    slug: "nse",
    tags: ["UX Design", "Product Design", "Prototyping", "Strategy"],
    hook: "The NSE's own strategy document admits their brand is perceived as elitist. I wanted to answer the question buried inside that admission.",
    meta: {
      role: "UX/UI Design, Prototyping",
      year: "2025",
      tools: "Figma, React, Vite",
      deliverable: "Live prototype",
    },
    coverImage: "/images/nse/nse-cover.png",
    coverImagePosition: "center 30%",
    intro:
      "A self-initiated onboarding experience for the Nairobi Securities Exchange. Turning a dense corporate strategy document into a flow a first-time investor could actually complete.",
    prototypeUrl: "https://nse-onboarding-5ek9.vercel.app/",
    sections: [
      {
        type: "text",
        label: "The brief",
        heading: "Reading a strategy doc as a design brief.",
        body: "The NSE's 2025-2029 strategy document admits something striking: their brand is perceived as elitist, and local retail investor participation has been falling for a decade. Their most ambitious goal, 9 million active retail investors by 2029, depends entirely on fixing that. Nobody commissioned this. I wanted to answer a question the strategy document couldn't: what would it actually feel like to sign up?",
      },
      {
        type: "quote",
        text: "The brand is perceived as elitist. It does not appeal to the retail investor who believes it is complicated to invest.",
        attribution: "NSE Strategy 2025-2029",
      },
      {
        type: "text",
        label: "The tension",
        heading: "Regulatory weight. Human-scale experience.",
        body: "Onboarding for a regulated financial institution can't be stripped bare. Compliance requirements are real. The challenge is making a necessarily thorough process feel light and trustworthy. Not a compliance gauntlet. The design had to carry the weight of an institution while feeling native to a phone, for someone who has never bought a share before.",
      },
      {
        type: "text",
        label: "The layer most people miss",
        heading: "Onboarding as strategic intelligence.",
        body: "Personalisation in onboarding isn't just good UX. In the context of the NSE's strategy, it's an intelligence layer. Every answer a user gives during signup is a signal: where they're based, how much they're looking to invest, what they're saving toward. The NSE plans to deploy 500 agents across every county. For that to work at scale, they need to know where their investors actually sit. Designed well, onboarding surfaces exactly that, and turns a necessary friction point into the most strategically valuable touchpoint the exchange has. If all the NSE's Direct Market Access platforms can be personalised based on the intelligence gathered during onboarding, the experience becomes more than just a signup flow. It becomes a first step toward building a relationship with an investor who might have been excluded from financial markets for too long.",
      },
      {
        type: "images",
        intro: "A snapshot of the onboarding flow. Click to explore.",
        groups: [
          {
            layout: "full",
            aspect: "aspect-[4/3]",
            items: [{ src: "/images/nse/nse mockup.png", caption: "NSE onboarding mockup" }],
          },
        ],
      },
      {
        type: "callout",
        label: "What I'd push further",
        body: "Usability testing with actual first-time investors, not assumptions about them. Of course, a tighter look at what happens after signup: does the first dashboard follow through on the promise the onboarding made? Good onboarding is a two-way value exchange. The user gets clarity and access. The exchange gets the intelligence to serve them better over time. Ultimately building a fully fledged, well informed investor platform is the real goal. Onboarding is just the first step toward that. But it's a critical one. If it doesn't work, nothing else does.",
      },
    ],
    nextSlug: "mali",
  },

  // ─── MALI ───────────────────────────────────────────────────────────────────
  {
    title: "MALI",
    slug: "mali",
    tags: ["UX Design", "Product Design"],
    hook: "The resources exist. They just weren't built for us.",
    meta: {
      role: "UX Designer & Product Thinker",
      year: "2024",
      tools: "Figma",
      deliverable: "High-fidelity UI mockup",
    },
    coverImage: "/images/mali2.png",
    intro:
      "A financial education platform for young Kenyans who want to make better money decisions, and find every existing resource too Western, too advanced, or built for someone else entirely.",
    prototypeUrl: null,
    sections: [
      {
        type: "text",
        label: "The brief",
        heading: "A gap that was personal.",
        body: "I've watched people my age: smart, digitally fluent, earning. They avoid thinking about money because every resource they encounter either talks down to them or assumes a financial reality built somewhere in North America. The tools exist. They just weren't made for a young Kenyan trying to figure out what an MMF is, whether they should have an emergency fund first, or what the NSE is even for. That gap was personal and it was real.",
      },
      {
        type: "text",
        label: "The tension",
        heading: "Credible enough to trust. Approachable enough to use.",
        body: "Finance content has a trust problem. Make it too casual and it feels unreliable. Make it too formal and it feels alienating. MALI had to thread that needle. That tension shaped every decision, from how the information architecture is organised to what the visual direction communicates before a single word is read.",
      },
      {
        type: "text",
        label: "The look",
        heading: "Dark and editorial. Intentionally.",
        body: "Most personal finance platforms default to clean whites and reassuring blues. MALI pushes against that. The dark editorial aesthetic treats financial education as something serious and worth engaging with. Without the cold, institutional feel that makes most finance products feel like they weren't made for you. It signals: this is for someone who actually wants to learn, not someone who needs to be managed.",
      },
      {
        type: "images",
        intro: "High-fidelity UI mockup covering the core experience: homepage, topic navigation, and article layout.",
        groups: [
          {
            layout: "full",
            items: [{ src: "/images/mali/Landing page - hifi.png", caption: "Homepage", objectPosition: "top" }],
          },
          {
            layout: "two-col",
            wide: true,
            aspect: "aspect-video",
            items: [
              { src: "/images/mali/topics-hifi.png", caption: "Topic navigation" },
              { src: "/images/mali/resources-hifi.png", caption: "Article layout" },
            ],
          },
          {
            layout: "full",
            items: [{ src: "/images/mali/single-featured articles.png", caption: "Featured article" }],
          },
          {
            layout: "three-col",
            wide: true,
            aspect: "aspect-[4/3]",
            items: [
              { src: "/images/mali/books-hifi.png", caption: "Books" },
              { src: "/images/mali/podcasts-hifi.png", caption: "Podcasts" },
              { src: "/images/mali/videos-hifi.png", caption: "Videos" },
            ],
          },
        ],
      },
      {
        type: "callout",
        label: "What I'd do next",
        body: "I would publish the site and prioritize user testing with actual first-time learners, not assumptions about them.  And a closer look at what happens after someone reads their first article: does the platform give them somewhere to go next, or does the journey just stop? MALI is a first pass. But first passes that ask the right questions are worth shipping. Ultimately, I worked on this project back in 2024, and I would definitely consider re-designing it in a way that's more informed by how people actually used it. The core tension would probably still be the same. But the way that tension manifests in the design might look very different after seeing how real users interact with it.",
      },
    ],
    nextSlug: "neitha",
  },
];
