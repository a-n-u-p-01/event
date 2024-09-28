import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(), // Include node polyfills for browser compatibility
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(), // Use Tailwind CSS
      ],
    },
  },
  server: {
    // Server options can be specified here if needed
  },
});

// Setting global in a way that's safe for the environment
if (typeof global === 'undefined') {
  global = {}; // Define a global object if it's not already defined
}
