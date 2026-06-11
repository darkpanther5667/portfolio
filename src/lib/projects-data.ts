export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  gradient: string;
  accent: string;
  liveUrl: string;
  githubUrl: string;
  metrics: string[];
  ogImage?: string;
  longDescription?: string;
  problem?: string;
  solution?: string;
  results?: string;
  features?: string[];
}

export const projectsData: Project[] = [
  {
    slug: "grahbook",
    title: "Grahbook",
    tagline: "WhatsApp Commerce for Indian Merchants",
    description: "Built from the ground up as a full commerce platform for local Indian merchants who run their business through WhatsApp. The problem: small shops in India rely entirely on WhatsApp to chat with customers, but have no way to manage orders, payments, or inventory within the app. Grahbook turns any WhatsApp number into an AI-powered store — customers can browse catalogs, place orders, and pay via UPI without ever leaving the chat.",
    longDescription: "Grahbook is a full-stack WhatsApp commerce platform that solves the critical problem of Indian small businesses operating entirely through WhatsApp. Before Grahbook, merchants had zero tools to manage their WhatsApp-based businesses — no order management, no payment processing, no inventory tracking.",
    problem: "Indian small businesses (kiranas, local shops) rely 100% on WhatsApp to communicate with customers but have no digital tools to manage orders, payments, or inventory within the same platform.",
    solution: "Turn any WhatsApp number into an AI-powered store where customers can browse catalogs, place orders, and pay via UPI without leaving the chat. Built with React, TypeScript, Framer Motion, Firebase, and TailwindCSS.",
    results: "Successfully launched with AI-powered ledger entries, automated revenue tracking, and a bento-grid metrics layout. The platform enables merchants to convert WhatsApp conversations into sales without technical expertise.",
    features: [
      "AI-powered order management",
      "WhatsApp-native interface",
      "UPI payment integration",
      "Real-time inventory tracking",
      "Automated revenue analytics",
      "Dark/light theme support",
      "Live chat simulation",
    ],
    tech: ["React", "TypeScript", "Vite", "Framer Motion", "Firebase", "TailwindCSS"],
    gradient: "from-emerald-700/30 via-green-600/20 to-teal-600/20",
    accent: "bg-emerald-500",
    liveUrl: "https://grahbook.vercel.app",
    githubUrl: "https://github.com/darkpanther5667/grahbook",
    metrics: ["WhatsApp Commerce", "AI Ledger", "UPI Payments"],
    ogImage: "/opengraph-image",
  },
  {
    slug: "formlabs",
    title: "FormLabs",
    tagline: "Visual drag-and-drop form builder",
    description: "Built from scratch when I needed a faster way to ship forms for client projects. The problem: hand-coding every form field, styling, and state management was killing productivity. FormLabs lets you drag fields onto a canvas, configure properties in real-time, and export clean HTML or React code in one click.",
    longDescription: "FormLabs was created to solve the productivity nightmare of building forms from scratch for client projects. Traditional form builders were either too basic or too expensive, and hand-coding every field was taking days instead of hours.",
    problem: "Building client forms required hand-coding every field, styling, and state management — taking days instead of hours and killing productivity.",
    solution: "Visual drag-and-drop interface with real-time property configuration and one-click export to clean HTML or React code. Used HTML5 Drag and Drop API with zero external dependencies for core interactions.",
    results: "Successfully ships complete forms with proper labels, validation, and state handling. Used by multiple clients to accelerate their development cycles and reduce form-building time by 80%.",
    features: [
      "11 Field Types (Text, Email, Phone, Date, etc.)",
      "Drag & Drop Canvas Interface",
      "Real-time Property Configuration",
      "One-Click HTML Export",
      "One-Click React Export",
      "Built-in Validation",
      "Responsive Design",
      "Zero External Dependencies",
    ],
    tech: ["Next.js", "TypeScript", "Framer Motion", "highlight.js"],
    gradient: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20",
    accent: "bg-emerald-500",
    liveUrl: "https://formlabs-eight.vercel.app",
    githubUrl: "https://github.com/darkpanther5667/formlabs",
    metrics: ["11 Field Types", "Drag & Drop", "Code Export"],
    ogImage: "/opengraph-image",
  },
  {
    slug: "codesnap",
    title: "CodeSnap",
    tagline: "AI-powered code screenshot tool",
    description: "I noticed developers spend time manually formatting code for social media posts and presentations. CodeSnap solves this with a live code editor (CodeMirror), syntax highlighting via highlight.js, and one-click PNG export at 2x resolution. Added an AI explain feature using GPT-4o-mini for when you need to quickly understand or present someone else\'s code.",
    longDescription: "CodeSnap was born from observing developers struggling to present code professionally. Whether for social media, blog posts, or presentations, developers needed a fast way to generate clean, highlighted code images without manual formatting.",
    problem: "Developers spend hours manually formatting code for social media posts, presentations, and blog articles — needing syntax highlighting, clean layouts, and export options.",
    solution: "Live code editor with CodeMirror, highlight.js syntax highlighting, one-click PNG export at 2x resolution, and AI explain feature using GPT-4o-mini for instant code understanding.",
    results: "Four themes (Dark, Light, Nord, Monokai) cover major presentation styles developers actually use. AI explain feature helps developers quickly understand or present someone else\'s code in seconds.",
    features: [
      "Live Code Editor (CodeMirror)",
      "Syntax Highlighting (highlight.js)",
      "One-Click PNG Export (2x resolution)",
      "AI Explain Feature (GPT-4o-mini)",
      "4 Presentation Themes (Dark, Light, Nord, Monokai)",
      "Copy to Clipboard",
      "Download History",
      "Theme Persistence",
    ],
    tech: ["Next.js", "TypeScript", "CodeMirror", "AI", "html-to-image"],
    gradient: "from-sky-600/20 via-blue-600/20 to-indigo-600/20",
    accent: "bg-sky-500",
    liveUrl: "https://codesnap-eta.vercel.app",
    githubUrl: "https://github.com/darkpanther5667/codesnap",
    metrics: ["Syntax Highlighting", "4 Themes", "AI Explain"],
    ogImage: "/opengraph-image",
  },
  {
    slug: "jee-os",
    title: "JEE OS",
    tagline: "AI-powered exam preparation platform (in development)",
    description: "Currently building a comprehensive OS-like platform for JEE preparation. Focused on AI-powered study recommendations, real-time progress tracking, and personalized learning paths. The architecture uses Next.js with PostgreSQL and Prisma for the data layer, with AI recommendations powered by OpenAI.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "AI"],
    gradient: "from-blue-600/20 via-purple-600/20 to-pink-600/20",
    accent: "bg-blue-500",
    liveUrl: "",
    githubUrl: "",
    metrics: ["In Development", "AI Powered", "Full Stack"],
  },
  {
    slug: "ai-study-planner",
    title: "AI Study Planner",
    tagline: "Smart scheduling with AI (in development)",
    description: "An intelligent study planner concept that uses AI to create optimized study schedules based on your learning patterns. The idea is to adapt in real-time as you progress, identifying weak areas and adjusting the curriculum automatically.",
    tech: ["React", "Node.js", "OpenAI", "PostgreSQL", "Redis"],
    gradient: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20",
    accent: "bg-emerald-500",
    liveUrl: "",
    githubUrl: "",
    metrics: ["In Development", "Smart Scheduling", "Adaptive"],
  },
];