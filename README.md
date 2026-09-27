# 🌾 Farmer AI — Your Intelligent Farming Assistant
### உங்கள் விவசாயத்திற்கு AI துணை

> **A production-ready, full-stack bilingual agriculture intelligence platform built specifically for Indian smallholder farmers.**

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?logo=prisma)](https://www.prisma.io/)
[![Google Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-8E75C2?logo=google)](https://aistudio.google.com/)
[![Open-Meteo](https://img.shields.io/badge/Weather-Open--Meteo-F59E0B)](https://open-meteo.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment_Ready-black?logo=vercel)](https://vercel.com/)

---

## 📖 Overview

**Farmer AI** is a comprehensive agricultural assistant designed to bridge modern AI technology with grassroots farming. The platform supports native **English**, **Tamil (தமிழ்)**, and **Tanglish** mixed conversational inputs.

Instead of generic chatbot responses, Farmer AI employs an **Agentic Tool Architecture** grounded in hyper-local weather conditions, transparent mandi net-profit calculations, custom machinery hiring, certified plant pathology vision, and verified government welfare portals.

---

## 🚜 Core Feature Modules

| Module | Route | Key Capabilities |
| :--- | :--- | :--- |
| **Bilingual Landing & Dashboard** | `/`, `/dashboard` | Dynamic welcome, hyper-local weather widget, smart alerts, quick actions grid, and integrated "Ask Farmer AI" input bar. |
| **Agentic AI Chat Assistant** | `/chat` | ChatGPT-style interface with multi-turn history, Web Speech API microphone voice input, text-to-speech reading, and real-time tool grounding. |
| **Crop Disease Diagnosis** | `/disease-detection` | Mobile camera and desktop drag-and-drop leaf upload with Gemini 2.5 Flash Vision pathology analysis and cautious non-guaranteed advisory notices. |
| **Agricultural Weather Intelligence** | `/weather` | Real-time Open-Meteo forecasts across all Tamil Nadu districts, 24-hour temperature & rain probability Recharts curves, and foliar spray advisories. |
| **Transparent Market Selling** | `/market` | Nearby APMC mandis & Uzhavar Sandhais with explicit net-profit formula: `Estimated Net = Gross Sale Value - Estimated Transport Cost`. |
| **Farm Machinery Marketplace** | `/machinery` | 22 agricultural implement categories (Tractors, Combine Harvesters, Paddy Transplanters, Power Tillers, Rotavators) with direct booking requests. |
| **Government Welfare Schemes** | `/schemes` | Verified Central & State schemes (PM-KISAN, SMAM, Kalaignar Scheme, PMFBY Crop Insurance, Drip Subsidies) with official portal links and reminders. |
| **Agri Education Scholarships** | `/scholarships` | Financial aid programs for farmers' children (Uzhavar Pathukappu Thittam, ICAR NTS, Higher Secondary stipends) with deadline trackers. |
| **Smart Notification Center** | `/notifications` | Multi-category agricultural alerts (Rain, Heat, Disease, Market, Schemes) with user preference category toggles. |
| **Farmer Profile & Settings** | `/profile`, `/settings` | Acreage, crop, village, and irrigation tracking used dynamically to personalize AI answers. |

---

## 🛠️ Architecture & Tech Stack

```mermaid
graph TD
    Client["Farmer Web / Mobile UI (Next.js 16 App Router)"]
    Lang["Bilingual Context (English & Tamil Dictionaries)"]
    Auth["Farmer Mobile & OTP Authentication"]

    subgraph Service_Layer["Domain Service Layer"]
        WeatherSvc["Open-Meteo Weather Service"]
        AgentSvc["FarmerAgent (8-Tool Orchestrator)"]
        GeminiSvc["Gemini 2.5 Flash Vision & Text Service"]
        MarketSvc["MarketProvider (Net-Profit Calculator)"]
        MachineSvc["Machinery Custom Hiring Provider"]
        SchemeSvc["Official Schemes & Scholarship Registry"]
    end

    subgraph Backend_Routes["Next.js Route Handlers (/api)"]
        API1["/api/ai/chat"]
        API2["/api/ai/analyze-image"]
        API3["/api/weather"]
        API4["/api/crops/recommend"]
        API5["/api/markets"]
        API6["/api/machinery"]
        API7["/api/schemes & /api/scholarships"]
        API8["/api/health"]
    end

    subgraph Database["Prisma ORM (15 Models)"]
        DB["PostgreSQL / SQLite Compatible Schema"]
    end

    Client --> Lang
    Client --> Auth
    Client --> Backend_Routes
    Backend_Routes --> Service_Layer
    Service_Layer --> Database
```

---

## 🔒 Security & Privacy Standard

- **No Sensitive Credential Requests**: Farmer AI never asks for bank passwords, UPI PINs, or sensitive Aadhaar numbers.
- **Server-Side API Key Protection**: `GEMINI_API_KEY` and `DATABASE_URL` are strictly accessed in server environments and never bundled into client JavaScript.
- **Strict TLS Certificate Verification**: Standard HTTPS validation is enforced using operating system root certificate authorities (`--use-system-ca`).
- **Cautious Agronomic Advisories**: All plant disease and chemical advice is explicitly designated as non-guaranteed AI-assisted identification, directing farmers to local Agricultural Extension Officers and Krishi Vigyan Kendras (KVK).

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` for local execution:

```bash
cp .env.example .env.local
```

### Required Variables:

```env
# Google Gemini API Key (for AI chat agent and crop disease image diagnosis)
# Obtain a key from: https://aistudio.google.com/
GEMINI_API_KEY="your_gemini_api_key_here"

# Database Connection URL (PostgreSQL for Supabase, Neon, or Vercel Postgres)
DATABASE_URL="postgresql://postgres:password@localhost:5432/farmer_ai?schema=public"
```

*Note: Open-Meteo weather does not require any API key for non-commercial agricultural usage.*

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v24.x recommended)
- **npm**: v9.x or higher

### 2. Install Dependencies
```bash
npm install
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Validation

```bash
# Run ESLint validation
npm run lint

# Run production build compilation
npm run build

# Validate Prisma schema
npx prisma validate
```

---

## 📦 GitHub Preparation

Initialize and push your clean repository:

```bash
# Initialize git repository
git init

# Stage all files (secret .env files are automatically excluded by .gitignore)
git add .

# Create initial commit
git commit -m "feat: complete production-ready Farmer AI platform"

# Set default branch
git branch -M main

# Link your GitHub repository
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git

# Push to GitHub
git push -u origin main
```

---

## ☁️ Vercel Deployment Guide

1. **Push your code to GitHub** following the steps above.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your `farmer-ai` repository.
4. Keep the Framework Preset as **Next.js**.
5. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Google AI Studio API key.
   - `DATABASE_URL`: Your hosted PostgreSQL connection string (from Vercel Postgres, Supabase, or Neon).
6. Click **Deploy**.
7. Once deployed, run database migrations on your remote database:
   ```bash
   npx prisma db push
   ```
8. Visit your production URL (e.g. `https://farmer-ai.vercel.app`) and test:
   - Weather forecasts
   - English & Tamil language toggles
   - AI Chat & Leaf Disease diagnosis
   - Market net-profit calculations

---

## 📄 License
This project is licensed under the MIT License — designed with ❤️ for Indian farmers.
