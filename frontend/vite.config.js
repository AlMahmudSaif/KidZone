// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:7000",
//       },
//     },
//   },
// });


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  // ADD THIS FOR RENDER DEPLOYMENT:
  build: {
    outDir: 'dist',
  },
  // ADD THIS FOR CLIENT-SIDE ROUTING:
  base: './',
})
