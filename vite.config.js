import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],

  server: {
    port: 5173,
    open: true,
  },

  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      input: {
        main: "./index.html",
        listings: "./listings/index.html",
        listing: "./listings/listing/index.html",
        createListing: "./listings/create/index.html",
        editListing: "./listings/edit/index.html",
        profile: "./profile/index.html",
        editProfile: "./profile/edit/index.html",
        about: "./about/index.html",
        contact: "./contact/index.html",
        faq: "./faq/index.html",
        notFound: "./404.html",
      },
    },
  },
});
