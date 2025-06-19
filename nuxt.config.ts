// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

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
  
  runtimeConfig: {
    public: {
      apiBase: '/api',
      appName: 'CommonShare',
      appVersion: '1.0.0',
    },
  },

  devtools: { enabled: true },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  css: [
    '~/assets/scss/main.scss',
    '~/assets/css/main.css'
  ],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {}
    }
  },

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