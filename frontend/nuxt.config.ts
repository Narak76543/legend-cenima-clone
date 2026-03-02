// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
  ],
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-27",

  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
});


