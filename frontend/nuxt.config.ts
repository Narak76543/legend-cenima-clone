// https://nuxt.com/docs/api/configuration/nuxt-config
const apiBase = import.meta.env.NUXT_API_BASE || "http://localhost:8001";
const publicApiBase = import.meta.env.NUXT_PUBLIC_API_BASE || "http://localhost:8001";

export default defineNuxtConfig({
  buildDir: "/tmp/nuxt-build",

  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap",
        },
      ],
    },
  },

  modules: [
    "@nuxt/ui",
  ],
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    apiBase,
    public: {
      apiBase: publicApiBase,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-27",

  nitro: {
    output: {
      dir: "/tmp/nuxt-output",
    },
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },
});
