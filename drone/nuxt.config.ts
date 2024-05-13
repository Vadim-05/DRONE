export default defineNuxtConfig({
  app: {
    head: {
      title: 'БПЛА',
    },
  },
  plugins: [
    '~/plugins/vuetify',
  ],
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify']
  },
  devtools: { enabled: true },
  modules: ["@nuxt/image"]
})
