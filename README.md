# Verdal Open 2025 – online versjon

Denne versjonen må kjøres på en host som støtter serverless functions, for eksempel Vercel.

## Slik bruker du den på Vercel uten lokal proxy

1. Last opp hele mappen til GitHub eller importer mappen som prosjekt i Vercel.
2. Vercel vil serve `index.html` og `/api/medley` fra samme domene.
3. Åpne Vercel-lenken. HTML-en henter da data via `/api/medley`, ikke via en lokal proxy.

Bare å legge `index.html` på GitHub Pages eller vanlig statisk hosting vil ikke løse CORS.
Du trenger denne API-filen også: `api/medley.js`.
