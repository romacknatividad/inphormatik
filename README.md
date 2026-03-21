# InPHormatik Website

## Overview

This project is the website for **InPHormatik**, a digital company focused on:

- Web services
- Software development
- Data analysis
- AI-enabled solutions
- Digital products

The website is designed to present the company in a modern, professional, and visual way. It acts as both a brand presence and a platform for showcasing services, software products, and organizational structure.

## Purpose of the Website

The website exists to:

- introduce InPHormatik as a technology-focused company
- present its services in a structured way
- showcase software products that can be offered to organizations and institutions
- show the company team and organizational structure
- support future growth into a fuller business website or software showcase platform

## Current Pages

The application currently includes these main routes:

- `/`
  Home page with company overview, core offerings, and website section highlights
- `/about`
  Company overview, positioning, and visual brand story section with embedded video
- `/team`
  Organizational structure page with executive leadership, departments, and team member profiles
- `/services`
  Service offerings covering systems architecture, systems design, web design and development, maintenance, QA, data analysis, systems integration, AI integration, and machine learning model engineering
- `/products`
  Software product showcase featuring booking and scheduling software, payroll and HRM system, school attendance monitoring system, student records management system, university ERP, and barangay management system

## Recent Updates

Recent work on the site includes:

- replaced the default starter content with InPHormatik-specific branding and content
- redesigned the site into a modern, colorful, more professional visual style
- expanded the website from a compact landing page into multiple dedicated pages
- removed the old portfolio page to keep the structure cleaner
- improved the products page so it reflects actual software offerings instead of placeholders
- improved the services page with clearer grouping and better presentation
- clarified the difference between the About page and Team page
- upgraded the Team page into a more realistic organization view with leadership and departments
- added stock imagery and symbolic visual sections across multiple pages
- added an embedded video section to the About page
- revised overly promotional wording into more direct professional copy
- removed the term `umbrella` from public-facing brand language

## Tech Stack

- React 19
- TanStack Start
- TanStack Router
- Tailwind CSS v4
- Clerk for authentication UI
- Vite
- Vitest

## Project Structure

Important files and folders:

- `src/routes/`
  File-based route pages
- `src/components/`
  Shared layout components such as the header and footer
- `src/content/site.ts`
  Shared website content for services, products, and team structure
- `src/styles.css`
  Global styles, theme tokens, and shared visual treatments

## Development

Install dependencies:

```bash
npm install
```

Run the app locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm run test
```

Preview the production build:

```bash
npm run preview
```

## Notes

- The current images used on several pages are external stock images.
- The Team page currently uses random profile images for visual structure and can later be replaced with real team photos.
- The About page video section currently uses an embedded placeholder video and can be swapped with a real company or promotional video later.
