# ZorgNotitie — AI-gestuurde verslaglegging voor de zorg

Professionele marketing website voor een Nederlandse SaaS-startup in de zorgsector. Het platform neemt gesprekken op en zet deze met AI om in gestructureerde samenvattingen, rapportages en dossiervorming.

## Tech Stack

| Technologie | Versie | Doel |
|---|---|---|
| **Next.js** | 16 (App Router) | Framework — SSR, routing, optimalisaties |
| **TypeScript** | 5 | Type safety |
| **Tailwind CSS** | 4 | Utility-first styling |
| **Lucide React** | latest | Iconenset |
| **Inter** | Google Fonts | Typografie |

## Installatie

```bash
# Clone het project
git clone <repo-url>
cd windsurf-project

# Installeer dependencies
npm install

# Start de development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## Projectstructuur

```
src/
├── app/
│   ├── globals.css          # Design tokens & Tailwind config
│   ├── layout.tsx           # Root layout (Inter font, metadata)
│   └── page.tsx             # Homepage (assembleert alle secties)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Navigatie met mobiel menu
│   │   └── Footer.tsx       # Footer met links & certificeringen
│   ├── sections/
│   │   ├── Hero.tsx         # Hero met value proposition
│   │   ├── HowItWorks.tsx   # "Hoe werkt het?" — 4 stappen
│   │   ├── Benefits.tsx     # Voordelen voor zorgverleners
│   │   ├── Security.tsx     # Veiligheid & AVG sectie
│   │   └── CTA.tsx          # Call-to-action
│   └── ui/
│       ├── Button.tsx       # Herbruikbare button (primary/secondary/outline)
│       ├── Container.tsx    # Max-width container
│       └── SectionHeading.tsx # Herbruikbare sectie heading
```

## Architectuurbeslissingen

### Waarom Next.js (App Router)?
- Server-side rendering voor SEO (cruciaal voor een marketing site)
- File-based routing maakt uitbreiding eenvoudig
- Ingebouwde optimalisaties (fonts, images, bundling)
- Eenvoudig uit te breiden met API routes, middleware, authenticatie

### Waarom Tailwind CSS v4?
- Utility-first: snelle iteratie, geen CSS-bestanden per component
- Design tokens via `@theme` in `globals.css` — één bron van waarheid
- Geen runtime overhead

### Component-architectuur
- **`ui/`** — Herbruikbare, generieke UI-componenten (Button, Container)
- **`layout/`** — Structurele componenten (Navbar, Footer)
- **`sections/`** — Paginasecties, specifiek voor de homepage

### Design systeem
- **Primary (blauw)**: Vertrouwen, professionaliteit, zorg
- **Accent (groen)**: Gezondheid, veiligheid, bevestiging
- **Slate (grijs)**: Neutrale tekst en achtergronden
- Veel witruimte, subtiele schaduwen, geen dark mode

## Uitbreiden

### Authenticatie toevoegen
Voeg NextAuth.js of Clerk toe in `src/app/api/auth/`.

### API-koppelingen
Maak API routes aan in `src/app/api/` (bijv. `/api/transcribe`, `/api/summarize`).

### Dashboard
Voeg een beschermde route toe in `src/app/dashboard/` met eigen layout.

## Scripts

| Commando | Beschrijving |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Productie build |
| `npm run start` | Start productie server |
| `npm run lint` | ESLint check |
