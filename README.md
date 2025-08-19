[![OSCI-Project-Banner.png](https://i.postimg.cc/76mJvBmF/OSCI-Project-Banner.png)](https://postimg.cc/8JfzMb84)


# KiddieGPT

**KiddieGPT** is a delightful AI-powered storytelling web application designed especially for kids. Using advanced AI models like Replicate API and Gemini AI, KiddieGPT generates engaging, customized stories that spark imagination and learning. The app features an intuitive UI built with Next.js and integrates PayPal for seamless story credit purchases.

---


## Table of Contents

- [Features](#features)  
- [Demo](#demo)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Installation](#installation)   

---

## Features

- **AI Story Generation:** Generate personalized children’s stories using GPT and Gemini AI models via Replicate API.  
- **User-friendly Interface:** Clean, colorful UI built with Next.js and React, perfect for kids and parents.  
- **Credits System:** Users purchase credits to unlock stories. Credits management integrated with database.  
- **Payment Gateway:** PayPal integration for secure, easy purchases of story credits.  
- **Custom Story Options:** Choose story themes, length, and more to tailor the experience.  
- **Responsive Design:** Works flawlessly on desktop, tablets, and mobile devices.  
- **History & Favorites:** Save favorite stories and access story history anytime.  

---

## Demo
`https://kiddie-gpt.vercel.app/`

---

## Tech Stack

- **Frontend:** Next.js (React) with Tailwind CSS for styling  
- **Backend:** Next.js API Routes  
- **AI APIs:** Replicate API, Gemini AI models for story generation  
- **Database:** PostgreSQL with Drizzle ORM  
- **Authentication:** Clerk for user management  
- **Payment:** PayPal Smart Buttons integration  
- **State Management:** React Context API  

---

## Getting Started

### Folder Structure
```
KiddieGPT/
├─ .github/
│  ├─ ISSUE_TEMPLATE/
│  │  ├─ bug_report.yml
│  │  ├─ config.yml
│  │  └─ feature_request.yml
│  └─ pull_request_template.md
├─ app/
│  ├─ _components/
│  │  ├─ Benefits.tsx
│  │  ├─ CTA.tsx
│  │  ├─ FeaturesSection.tsx
│  │  ├─ Footer.tsx
│  │  ├─ header.tsx
│  │  ├─ hero.tsx
│  │  ├─ HowItWorks.tsx
│  │  ├─ Testimonials.tsx
│  │  └─ TestimonialsSection.tsx
│  ├─ (auth)/
│  │  ├─ sign-in/
│  │  │  └─ [[...sign-in]]/
│  │  │     └─ page.tsx
│  │  └─ sign-up/
│  │     └─ [[...sign-up]]/
│  │        └─ page.tsx
│  ├─ api/
│  │  ├─ generate-image/
│  │  │  └─ route.ts
│  │  ├─ save-image/
│  │  │  └─ route.ts
│  │  └─ stories/
│  │     └─ route.ts
│  ├─ buy-credits/
│  │  └─ page.tsx
│  ├─ contact/
│  │  └─ page.tsx
│  ├─ create-story/
│  │  ├─ _components/
│  │  │  ├─ age-group.tsx
│  │  │  ├─ custom-loader.tsx
│  │  │  ├─ image-style.tsx
│  │  │  ├─ story-subject-input.tsx
│  │  │  └─ story-type.tsx
│  │  └─ page.tsx
│  ├─ dashboard/
│  │  ├─ _components/
│  │  │  ├─ dashboard-header.tsx
│  │  │  ├─ story-item-card.tsx
│  │  │  └─ user-story-list.tsx
│  │  └─ page.tsx
│  ├─ explore/
│  │  └─ page.tsx
│  ├─ view-story/
│  │  ├─ _components/
│  │  │  ├─ book-cover-page.tsx
│  │  │  ├─ last-page.tsx
│  │  │  └─ story-pages.tsx
│  │  └─ [storyId]/
│  │     └─ page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ not-found.js
│  ├─ page.tsx
│  └─ provider.tsx
├─ components/
│  └─ ui/
│     ├─ alert-dialog.tsx
│     ├─ button.tsx
│     ├─ card.tsx
│     ├─ input.tsx
│     ├─ label.tsx
│     ├─ select.tsx
│     ├─ sonner.tsx
│     └─ textarea.tsx
├─ config/
│  ├─ db.ts
│  ├─ firebase-config.ts
│  ├─ gemini-config.ts
│  └─ schema.ts
├─ context/
│  └─ UserDetailContext.tsx
├─ lib/
│  └─ utils.ts
└─ Additional Documents and Assets

```



Follow these steps to run KiddieGPT locally:

### Prerequisites

- Node.js (v18+)  
- PostgreSQL database  
- PayPal Developer account (Sandbox & Live credentials)  
- Replicate API key  
- Gemini AI API access (if applicable)  
- Clerk account for authentication  

---

## Installation

1. **Clone the repo:**

```bash
git clone https://github.com/yourusername/kiddiegpt.git
cd kiddiegpt
```

2. Install Dependencies

```bash
npm install
```

3. Configure environment variables:

```bash
DATABASE_URL=your_postgresql_url
REPLICATE_API_TOKEN=your_replicate_api_key
GEMINI_API_KEY=your_gemini_api_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

4. Run the development server:
   
```bash
npm run dev
```
Visit ```http://localhost:3000``` to view the app locally.


