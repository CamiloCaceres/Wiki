// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      pocketbaseUrl: process.env.POCKETBASE_URL
    }
  },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/image',
    '@vueuse/motion/nuxt',
    '@nuxtjs/device',
  ],
})