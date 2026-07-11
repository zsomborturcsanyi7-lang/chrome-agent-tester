# Browser Testing 1.0 — Cognitive Session Engine (Chrome Bővítmény)

**Verzió:** 1.0.0  
**Szerző:** Zsombi (AI asszisztens segítségével)  
**Státusz:** Működő prototípus

---

## Leírás

A **Cognitive Session Engine** egy Chrome bővítmény (Manifest V3), amely AI-vezérelt szemantikus munkaterületként szolgál mély munkához és kutatáshoz. A bővítmény tartalmaz gráf-alapú munkamenet-kezelést, böngészési előzmények elemzését, és React alapú felhasználói felületet Lucide ikonokkal.

---

## Fájlszerkezet

```
browser testing 1.0/
│
├── manifest.json               # Chrome bővítmény manifest (V3)
├── package.json                # Node.js függőségek
├── vite.config.js              # Vite konfiguráció
├── index.html                  # Popup belépési pont
│
├── src/
│   ├── background/
│   │   ├── serviceWorker.js    # Service worker (háttérfolyamat)
│   │   └── graphManager.js     # Gráf munkamenet kezelő
│   │
│   ├── ui/
│   │   ├── main.jsx            # React belépési pont
│   │   ├── components/
│   │   │   └── GraphCanvas.jsx # Gráf vizualizáció komponens
│   │   └── hooks/
│   │       └── useGraphData.jsx # Gráf adat hook
│   │
│   └── db/
│       └── schema.js           # Adatbázis séma
│
├── dist/                       # Build kimenet
│   ├── index.html
│   ├── manifest.json
│   └── assets/
│
└── node_modules/               # Függőségek
```

---

## Használat

### Fejlesztői mód

```bash
# Függőségek telepítése
npm install

# Fejlesztői build
npm run dev

# Production build
npm run build
```

### Chrome-ba telepítés

1. Nyisd meg a Chrome-ot: `chrome://extensions`
2. Kapcsold be a **Fejlesztői módot**
3. Kattints a **"Kicsomagolt bővítmény betöltése"** gombra
4. Válaszd ki a `dist/` mappát

### Production build használata

A `dist/` mappa betölthető közvetlenül Chrome-ba kicsomagolt bővítményként.

---

## Jogosultságok

| Jogosultság | Indoklás |
|------------|----------|
| `tabs` | Lap információk |
| `storage` + `unlimitedStorage` | Munkamenet adatok tárolása |
| `scripting` | Oldalba injektálás |
| `activeTab` | Aktív lap elérése |
| `contextMenus` | Jobb klikk menü |
| `history` | Böngészési előzmények |

---

## Technológiák

| Technológia | Leírás |
|------------|--------|
| **Manifest V3** | Chrome bővítmény API |
| **React** | UI komponensek |
| **Vite** | Build eszköz |
| **lucide-react** | Ikonok |
| **Service Worker** | Háttérfolyamatok |

---

## Függőségek

- **Node.js** 18+
- **Chrome** 88+ (Manifest V3 támogatás)

---

## Fejlesztő

Zsombi (AI asszisztens segítségével) (AI asszisztens segítségével)
