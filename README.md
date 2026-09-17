# Remote jobs

A site to find remote jobs and apply faster.

## What it does

- Aggregates listings from **Remotive**, **Jobicy**, and **Himalayas** (public APIs, no API key)
- Saves your profile and cover letter template in the browser
- **Easy apply** flow: copy the letter, open the official posting, and log the application

## Get started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Use |
|------|-----|
| `/` | Landing |
| `/empleos` | Listings and filters |
| `/empleos/[id]` | Detail + easy apply |
| `/perfil` | Profile and cover letter |
| `/postulaciones` | Local tracking |
| `/api/jobs` | Jobs JSON |

## Note

This site does not submit applications to companies: it takes you to the original source with your letter ready to paste.
