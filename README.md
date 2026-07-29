# Navprayas Certificate Portal

A responsive React + Vite website for downloading and verifying Navprayas certificates.

## Features

- Home page with Navprayas-inspired visual language
- Certificate download using certificate number + registered name
- Certificate verification using certificate number
- Responsive certificate preview
- Client-side PDF generation with jsPDF
- Built-in demo records for immediate testing
- Optional backend API integration using `VITE_API_BASE_URL`
- Mobile navigation and responsive layout

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Demo certificate records

### Demo 1

- Certificate number: `RCS-NPCORE26-AM0003-NBA`
- Name: `Ravi Kumar`

### Demo 2

- Certificate number: `HBH-NPCORE26-AM0012-SCC`
- Name: `Dev Prakash`

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Connect your backend

Copy `.env.example` to `.env` and add your backend URL:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Expected endpoints:

```text
GET  /api/certificates/:certificateNo
POST /api/certificates/download
```

Expected successful response:

```json
{
  "data": {
    "certificateNo": "RCS-NPCORE26-AM0003-NBA",
    "name": "Ravi Kumar",
    "membershipNo": "NP/MBS/026/003",
    "programme": "Navprayas Core Team 2026",
    "role": "Team Member",
    "department": "Content & Career Counselling",
    "issueDate": "29 July 2026",
    "status": "Valid"
  }
}
```

If `VITE_API_BASE_URL` is empty, the project uses `src/data/certificates.js`.
