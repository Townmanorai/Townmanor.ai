// This file provides polyfills for browser compatibility issues

// Add global to window for Draft.js
if (typeof window !== 'undefined' && !window.global) {
  window.global = window;
}

// Add process.env for Draft.js
if (typeof window !== 'undefined' && !window.process) {
  window.process = { env: { NODE_ENV: 'production' } };
}
