# Inibehe John (ZekTech) — Portfolio

A modern, responsive, and accessible portfolio website for Inibehe Ezekiel John
(ZekTech), a full-stack web developer. It features a polished multi-section
landing page, an **AI-powered assistant** (ZekTech AI) built on Groq, and a
working contact form powered by EmailJS.

![Stack](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![Stack](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)
![Stack](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8?logo=tailwindcss&logoColor=white)
![Stack](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)

---

## ✨ Features

- **Hero section** with typing roles, floating tech badges, and animated stats
- **About, Skills, Projects, Process, Services** sections with smooth scroll
  reveal animations
- **AI Assistant (ZekTech AI)** — a chat widget that answers questions about
  Inibehe's skills, projects, and services in real time
- **Contact section** combining the AI chat and an EmailJS contact form in one
  card
- **Light / dark mode** with accent theming and full accessibility labels
- **SEO & Open Graph** meta tags, lazy-loaded images, and an interactive favicon

---

## 🧱 Tech Stack

**Frontend**

- React 19
- Vite 8
- Tailwind CSS 4
- Framer Motion (animations)
- React Icons / Lucide / Iconify
- EmailJS (contact form)

**Backend (AI Assistant)**

- Node.js + Express 4
- Groq API (`openai/gpt-oss-20b`)
- Helmet, CORS, express-rate-limit

---

## 📁 Project Structure

```
my-portfolio/
├── index.html
├── vite.config.js
├── .env.example
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── Components/
│   │   ├── Layout/        (Header, Navigation, Footer, Layout)
│   │   ├── Sections/      (Hero, About, Skills, Projects, Process, Services, Contact)
│   │   ├── Chat/          (AIChat, ChatInput, ChatMessage, ContactForm, TalkingBotIcon)
│   │   ├── Common/        (FloatingBot, ScrollToTop, LazySection)
│   │   └── UI/            (SocialLinks, FigmaIcon)
│   └── Hooks/             (useChat)
├── server/
│   ├── index.js           (Express + Groq AI API)
│   ├── knowledge.js       (developer knowledge base)
│   └── .env.example
└── public/                (static assets, CV, images)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm
- A [Groq](https://console.groq.com/) API key
- An [EmailJS](https://www.emailjs.com/) account

### 1. Clone & install

```bash
git clone https://github.com/ZekTech-code/Portfolio.git
cd Portfolio
npm install
```

### 2. Configure environment

Copy the example env files and fill in your values:

```bash
cp .env.example .env
cp server/.env.example server/.env
```

| Variable | Description |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_API_URL` | Backend URL (e.g. `http://localhost:3001`) |
| `VITE_CONTACT_EMAIL` | Contact email shown on the site |
| `VITE_CONTACT_PHONE` | Contact phone number |
| `VITE_CONTACT_WHATSAPP` | WhatsApp number |
| `VITE_GITHUB_URL` / `VITE_LINKEDIN_URL` / `VITE_X_URL` / `VITE_INSTAGRAM_URL` | Social profile URLs |
| `GROQ_API_KEY` | Groq API key (server only) |
| `ALLOWED_ORIGINS` | Comma-separated CORS allow-list for the API |

> ⚠️ Never commit real env values. `.env` files are git-ignored by design.

### 3. Run the frontend

```bash
npm run dev
```

### 4. Run the AI backend (separate terminal)

```bash
cd server
npm install
npm run dev
```

The backend runs on `http://localhost:3001` and the frontend proxies `/api`
requests to it during development.

---

## 🏗️ Building for production

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```

---

## 🌍 Deployment

The app is split into a **static frontend** and a **Node API**. Deploy them
separately and set `VITE_API_URL` to your live API URL when building the
frontend.

**Frontend (Vercel / Netlify)**

1. Build command: `npm run build`
2. Output directory: `dist`

**Backend (Render / Railway / Fly.io)**

1. Root directory: `server`
2. Start command: `npm start`
3. Set environment variables: `GROQ_API_KEY`, `ALLOWED_ORIGINS`, `PORT`

---

## 🛡️ Security

- API keys are kept **server-side only** (Groq) and in `.env` files — never
  committed or bundled into the client
- Helmet security headers, CORS allow-list, rate limiting, and request body
  limits on the API
- Prompt-injection detection on the AI assistant
- EmailJS `PUBLIC_KEY` appears in the client bundle by design (it is a public
  key, not a secret)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋 Contact

- **Email:** hello.zektech@gmail.com
- **GitHub:** [@ZekTech-code](https://github.com/ZekTech-code)
- **LinkedIn:** [ZekTech](https://www.linkedin.com/in/zektechcode)

Made with ❤️ by Inibehe Ezekiel John (ZekTech).
