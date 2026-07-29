# chrome-agent-tester

Chrome extension for automated browser interaction testing.

## Overview & Purpose
chrome-agent-tester provides a browser extension architecture for executing automated page navigation, DOM element inspection, and workflow verification.

## Key Features
- Chrome Extension Manifest V3 background script integration.
- Content script DOM element inspector.
- Automated action recording and playback interface.

## Tech Stack & Dependencies
- **Language**: JavaScript (ES6+), HTML5, CSS3
- **Platform**: Chrome Extension API (Manifest V3)

## Project Structure
```text
chrome-agent-tester/
├── manifest.json
├── background.js
├── content.js
├── popup.html
└── README.md
```

## Installation & Setup

### Prerequisites
- Google Chrome or Chromium-based browser

### Steps
1. Clone the repository: `git clone https://github.com/zsomborturcsanyi7-lang/chrome-agent-tester.git`
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** via the toggle switch in the top right.
4. Click **Load unpacked** and select the `chrome-agent-tester` folder.

## Usage Examples
Click the extension action icon in Chrome to open the control panel interface.

## Status & License
Status: Extension Prototype.
License: MIT
