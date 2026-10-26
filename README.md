# Momsflöde

Pedagogisk webbapp som steg för steg förklarar hur moms rör sig när ett svenskt företag (C.se) köper från svenska och utländska leverantörer och säljer till utlandet.

## Kör lokalt

```bash
npm install
npm run dev
```

Öppna adressen som Vite skriver ut (vanligtvis `http://localhost:5173`).

## Vad sidan visar

1. Introduktion till momslogiken
2. Aktörerna A.se, B.com, C.se, D.com och Skatteverket
3. Inköp från A.se — belopp **inklusive** moms
4. Inköp från B.com — belopp **exklusive** moms, redovisning till Skatteverket
5. Försäljning till D.com — export utan moms
6. Momsnetto för C.se + möjlighet att ändra beloppen live
7. Skatteverkets inkomster och utgifter för hela exemplet

## Bygg

```bash
npm run build
npm run preview
```
