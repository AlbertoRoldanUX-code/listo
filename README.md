# Listo

Find remote jobs and apply faster.

## Features

- Browse remote roles in one place
- Save your profile and cover letter template in the browser
- **Easy apply**: copy letter, open the posting, track applications
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
| `/profile` | Profile and letter |
| `/applications` | Local tracking |
| `/api/jobs` | Jobs JSON |

Legacy Spanish paths (`/empleos`, `/perfil`, `/postulaciones`) redirect to the English routes.

## Note

Listo does not submit applications to employers. It opens the original posting with your letter ready to paste.
