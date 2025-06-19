// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  compatibilityDate: '2025-05-15',
  app: {
    head: {
      title: 'CommonShare',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'description', content: 'CommonShare - Share your common resources easily.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  devtools: { enabled: true },
  
  css: ['~/assets/scss/main.scss'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxtjs/tailwindcss',           
    '@pinia/nuxt',                   
    'pinia-plugin-persistedstate/nuxt',
  ],

  piniaPluginPersistedstate: {
    key: 'commonshare_%id',
    storage: 'cookies',
    cookieOptions: {
      sameSite: 'lax',
    },
    debug: true,
  },
})