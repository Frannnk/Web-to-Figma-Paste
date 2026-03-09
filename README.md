# Web to Figma Paste

Chrome extension for capturing webpage content and pasting into Figma with `Cmd/Ctrl + V`.

<img width="1280" height="800" alt="Web to Figma" src="https://github.com/user-attachments/assets/0d198f32-41a0-4a45-9423-c44652fba69d" />

## Features
- Capture full page
- Pick specific element
- Light/Dark UI with automatic theme switching
- Clipboard-first flow, no local bridge service

## Install (Dev)
1. Open `chrome://extensions`
2. Enable Developer mode
3. Click **Load unpacked**
4. Select `/chrome-extension`

## Usage
1. Open target webpage
2. Click extension icon
3. Choose capture mode
4. Switch to Figma and paste

## Project Structure
- `chrome-extension/manifest.json`
- `chrome-extension/src/content.js`
- `chrome-extension/src/content.css`
- `chrome-extension/src/background.js`
- `chrome-extension/src/capture.js`

## License
MIT
