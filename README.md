# Listo

Find remote jobs and apply faster.

## Features

- Browse remote roles in one place
- Save your profile in the browser as a base to tailor CVs per offer
- **Easy apply**: open the posting, track applications; cover letter only if asked
- UI in **English** with a **Georgian (ქართული)** option in the header

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Purpose |
|------|---------|
| `/` | Landing |
| `/jobs` | Listings and filters |
| `/jobs/[id]` | Detail + easy apply |
| `/profile` | Profile (optional cover letter) |
| `/applications` | Local tracking |
| `/api/jobs` | Jobs JSON |

Legacy Spanish paths (`/empleos`, `/perfil`, `/postulaciones`) redirect to the English routes.

## Note

Listo does not submit applications to employers. It opens the original posting so you can apply with a CV tailored to that offer.
