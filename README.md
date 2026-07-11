# Browser Testing 1.0 — Cognitive Session Engine (Chrome Extension)

**Status:** ⚠️ Prototype — Chrome extension loads, Cognitive Session Engine untested


**Version:** 1.0.0  
**Author:** Zsombi & Hermes Agent (Nous Research)  
**Status:** Working prototype

## ⚠️ THIS PROJECT IS UNFINISHED — FEEL FREE TO CONTINUE IT ⚠️

**Ez a projekt NINCS KÉSZEN. Bárki folytathatja, aki akarja!**
Ezt a projektet Zsombi & Hermes Agent (Nous Research) közösen fejlesztette, de egyik projekt sincs 100%-osan befejezve. Ha tetszik az ötlet és tovább fejlesztenéd, nyugodtan fork-old, folytasd, és csinálj belőle valami nagyszerűt!

---


---

## Description

The **Cognitive Session Engine** is a Chrome extension (Manifest V3) that serves as an AI-driven semantic workspace for deep work and research. The extension includes graph-based session management, browsing history analysis, and a React-based user interface with Lucide icons.

---

## File Structure

```
browser testing 1.0/
│
├── manifest.json               # Chrome extension manifest (V3)
├── package.json                # Node.js dependencies
├── vite.config.js              # Vite configuration
├── index.html                  # Popup entry point
│
├── src/
│   ├── background/
│   │   ├── serviceWorker.js    # Service worker (background process)
│   │   └── graphManager.js     # Graph session manager
│   │
│   ├── ui/
│   │   ├── main.jsx            # React entry point
│   │   ├── components/
│   │   │   └── GraphCanvas.jsx # Graph visualization component
│   │   └── hooks/
│   │       └── useGraphData.jsx # Graph data hook
│   │
│   └── db/
│       └── schema.js           # Database schema
│
├── dist/                       # Build output
│   ├── index.html
│   ├── manifest.json
│   └── assets/
│
└── node_modules/               # Dependencies
```

---

## Usage

### Development Mode

```bash
# Install dependencies
npm install

# Development build
npm run dev

# Production build
npm run build
```

### Installing in Chrome

1. Open Chrome: `chrome://extensions`
2. Enable **Developer mode**
3. Click **"Load unpacked extension"**
4. Select the `dist/` folder

### Using the Production Build

The `dist/` folder can be loaded directly into Chrome as an unpacked extension.

---

## Permissions

| Permission | Rationale |
|------------|----------|
| `tabs` | Tab information |
| `storage` + `unlimitedStorage` | Session data storage |
| `scripting` | Page injection |
| `activeTab` | Active tab access |
| `contextMenus` | Right-click menu |
| `history` | Browsing history |

---

## Technologies

| Technology | Description |
|------------|--------|
| **Manifest V3** | Chrome extension API |
| **React** | UI components |
| **Vite** | Build tool |
| **lucide-react** | Icons |
| **Service Worker** | Background processes |

---

## Dependencies

- **Node.js** 18+
- **Chrome** 88+ (Manifest V3 support)

---

## Developer

Zsombi & Hermes Agent (Nous Research)
