# Navprayas Certificate Portal

A responsive React + Vite portal for verifying and downloading Navprayas certificates.

The project provides a certificate verification flow and a PDF download flow that uses Supabase Edge functions with fallback support for local demo data.

## Features

- Verify certificate authenticity by certificate number
- Download an official PDF certificate with certificate number and registered full name
- Handles verified responses where PDF generation is unavailable and displays a positive success message
- Responsive UI built with React and modern layout components
- Uses client-side routing for home, verify, and download pages

## Tech stack

- React 19
- Vite 4
- React Router DOM 7
- jsPDF for PDF generation utilities
- Lucide React icons

## Getting started

### Prerequisites

- Node.js >= 20.19.0
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the local server URL shown in the terminal, usually `http://localhost:5173`.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Environment variables

Create a `.env` file in the project root to configure the Supabase endpoints.

```dotenv
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
# Optional fallback API base URL for local certificate lookup
# VITE_API_BASE_URL=http://localhost:5000
```

If the environment variables are not provided and no `VITE_API_BASE_URL` is configured, the app may use built-in demo data for local certificate lookups.

## Application routes

- `/` — Home page with quick access cards
- `/verify` — Verify certificate authenticity by number
- `/download` — Download certificate PDF using certificate number and registered full name

## Important behavior notes

- The verify page uses `src/services/certificateService.js` to call the Supabase function at `/functions/v1/verify-certificate`.
- The download page submits certificate details to the Supabase function at `/functions/v1/generate-certificate`.
- When the API response contains `verified: true` but `downloadable: false`, the app now displays a green success alert and does not treat it as a failure.
- Download errors and validation issues are shown using the form alert UI.

## Project structure

- `src/App.jsx` — Main router and route layout
- `src/pages/HomePage.jsx` — Landing page with feature overview and links
- `src/pages/VerifyPage.jsx` — Certificate verification page
- `src/pages/DownloadPage.jsx` — Certificate download page
- `src/components/certificate/VerificationResult.jsx` — Verified certificate details and download link
- `src/services/certificateService.js` — API and local fallback service functions
- `src/utils/downloadCertificate.js` — PDF generation helper using jsPDF
- `src/styles/index.css` — Global styles and component styling

## Deployment

This app is ready for deployment to static hosts such as Vercel, Netlify, or any platform that supports Vite.

On Vercel, the default build command is:

```bash
npm run build
```

and the output directory is:

```bash
dist
```

## Notes

- The app uses client-side routing with React Router. Ensure the hosting platform rewrites all routes to `index.html`.
- The `DownloadPage` currently relies on Supabase function responses and may need proper backend configuration for PDF generation.

## License

This repository is private and intended for use by the Navprayas certificate service.
