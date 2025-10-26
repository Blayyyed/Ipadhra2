# HRA Kiosk

This repository contains a manually scaffolded pilot for the High‑Radiation Area (HRA) kiosk. The goal of this project is to provide an installable web app (PWA) that can run offline on an iPad. It uses React and TypeScript, with Tailwind CSS for styling, and stores data locally in the browser.

## Features

- React + TypeScript project structure
- Tailwind CSS utility classes
- IndexedDB storage via Dexie (you can replace localStorage stubs later)
- Stubs for QR scanning and signature capture
- Mock data for areas and work permits
- Basic navigation and acknowledgment flow

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

4. Preview the production build:

   ```bash
   npm run preview
   ```

Once deployed to a hosting service, you can open the app in Safari on your iPad and choose **Add to Home Screen** to install it.
