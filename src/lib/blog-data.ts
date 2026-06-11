export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-grahbook-whatsapp-commerce",
    title: "Building Grahbook: WhatsApp Commerce for 600M+ Indian Merchants",
    description:
      "How I built a full-stack WhatsApp commerce platform that turns any WhatsApp number into an AI-powered store with UPI payments, order management, and automated ledger entries.",
    date: "2026-06-01",
    readTime: "8 min read",
    tags: ["React", "WhatsApp", "India", "E-Commerce", "AI"],
    content: `## The Problem: 600M+ Merchants Trapped in WhatsApp

India has over 600 million small businesses — kiranas, street vendors, local shops — that run entirely on WhatsApp. They chat with customers, take orders, share photos, and close deals all inside WhatsApp. But there's a massive gap: **zero tools** to manage orders, payments, or inventory within the app they already use.

Merchants juggle spreadsheets, paper notebooks, and manual UPI screenshots. Revenue tracking is impossible. Order management is chaos.

## Why I Built Grahbook

I wanted to solve a real problem for real people. Grahbook turns any WhatsApp number into an AI-powered store — customers can browse catalogs, place orders, and pay via UPI without ever leaving the chat.

## The Tech Stack

- **React + TypeScript** for the merchant dashboard
- **Vite** for lightning-fast builds
- **Framer Motion** for buttery animations
- **Firebase** for real-time data sync
- **TailwindCSS** for the design system

## Key Features

### AI-Powered Ledger
Every conversation is automatically parsed into structured ledger entries. Revenue tracking happens in real-time without manual input.

### WhatsApp-Native Interface
Customers don't need to download anything. They chat with the merchant's existing WhatsApp number and get a catalog experience.

### UPI Payment Integration
Payments happen through the same UPI flow merchants already use, but now with proper order linking and reconciliation.

## Results

Grahbook has been deployed and is being actively iterated on. The merchant dashboard shows AI-powered ledger entries, automated revenue tracking, and a bento-grid metrics layout — all animated with Framer Motion.

## Lessons Learned

1. **Start with the user problem, not the technology.** I didn't pick React because it's trendy — I picked it because the merchant dashboard needed real-time updates.
2. **AI should solve problems, not impress investors.** The ledger AI is invisible to merchants but saves them hours every week.
3. **Deploy early, iterate fast.** The first version was rough. But real users gave better feedback than any spec document.`,
  },
  {
    slug: "formlabs-zero-dependency-form-builder",
    title: "FormLabs: Building a Drag-and-Drop Form Builder with Zero Dependencies",
    description:
      "How I created a visual form builder using HTML5 Drag and Drop API with zero external dependencies, shipping clean HTML and React code in one click.",
    date: "2026-05-15",
    readTime: "6 min read",
    tags: ["Next.js", "TypeScript", "Drag and Drop", "Forms", "Open Source"],
    content: `## Why Another Form Builder?

I was building client projects and spending 2-3 hours on every form. Hand-coding fields, styling them, managing state, adding validation — it was killing productivity. Existing form builders were either too basic or locked behind paywalls.

So I built FormLabs.

## Zero External Dependencies

The core interaction — dragging fields onto a canvas and configuring them — uses the **HTML5 Drag and Drop API**. No react-dnd, no dnd-kit, no SortableJS. Just native browser APIs.

Why? Because dependencies break, get abandoned, and bloat your bundle. Native APIs don't.

## The Architecture

### 11 Field Types
Text, Email, Phone, Number, Date, Time, Select, Checkbox, Radio, Textarea, and File Upload. Each field type has its own configuration panel.

### Real-Time Canvas
Drag a field from the palette onto the canvas. See it appear instantly. Click to configure — label, placeholder, required state, validation rules. Changes preview in real-time.

### One-Click Export
Hit "Export" and get clean, production-ready HTML or React code. No framework lock-in, no weird wrappers. Just code you can paste into any project.

## Tech Stack

- **Next.js** for the app framework
- **TypeScript** for type safety
- **Framer Motion** for animations
- **highlight.js** for code preview syntax highlighting

## What I Learned

The hardest part wasn't the drag-and-drop. It was making the canvas feel responsive. When you drag a field, the canvas needs to show drop zones, highlight valid targets, and handle edge cases like dragging onto nested sections.

HTML5 DnD API has quirks — the drag image, the dataTransfer object, the event lifecycle. But once you understand it, it's powerful enough for complex interactions.

## Open Source

FormLabs is open source on GitHub. If you build forms for clients, give it a try. Or fork it and make it your own.`,
  },
  {
    slug: "codesnap-ai-code-screenshots",
    title: "CodeSnap: AI-Powered Code Screenshots with GPT-4o-mini Explain",
    description:
      "How I built a code screenshot tool with CodeMirror editor, 4 presentation themes, and an AI explain feature using GPT-4o-mini for instant code understanding.",
    date: "2026-04-20",
    readTime: "5 min read",
    tags: ["Next.js", "AI", "CodeMirror", "GPT-4o-mini", "Developer Tools"],
    content: `## The Problem

Every time I wanted to share code on X (Twitter) or in a blog post, I'd waste 15-20 minutes formatting it. Open an editor, paste the code, take a screenshot, crop it, adjust the font size. Repeat for every code block.

There had to be a better way.

## What CodeSnap Does

CodeSnap is a live code editor that generates beautiful, presentation-ready screenshots in one click.

### Live Code Editor
Powered by CodeMirror, the same editor used in VS Code. Full syntax highlighting, line numbers, and proper indentation.

### 4 Presentation Themes
Dark, Light, Nord, and Monokai. These cover 99% of what developers actually want for code presentation.

### One-Click Export
Click "Download" and get a 2x resolution PNG ready for social media, presentations, or documentation.

### AI Explain Feature
This is the killer feature. Click "Explain" and GPT-4o-mini generates a clear, line-by-line explanation of what the code does. Perfect for:
- Understanding unfamiliar code
- Creating tutorial content
- Preparing code walkthroughs

## Tech Stack

- **Next.js** + TypeScript
- **CodeMirror** for the editor
- **highlight.js** for syntax themes
- **html-to-image** for screenshot export
- **GPT-4o-mini** via OpenAI API for code explanation

## The AI Explain Integration

The explain feature uses GPT-4o-mini because it's fast and cheap. For a code explanation, you don't need GPT-4. The prompt engineering is straightforward — send the code with a system instruction to explain line-by-line in plain English.

The response streams in real-time, so users see the explanation building as the AI generates it.

## What's Next

I want to add:
- Custom themes (user-uploaded color schemes)
- PDF export
- Code diff visualization
- Collaborative editing

## Deployed on Vercel

CodeSnap is live at codesnap-eta.vercel.app. Try it — paste some code, pick a theme, download the screenshot.`,
  },
];
