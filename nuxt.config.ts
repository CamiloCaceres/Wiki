// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      pocketbaseUrl: process.env.POCKETBASE_URL,
      querySecretKey: process.env.QUERY_SECRET_KEY,
      fastApiUrl: process.env.FAST_API_URL,
    },
  },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/image',
    '@vueuse/motion/nuxt',
    '@nuxtjs/device',
  ],
})