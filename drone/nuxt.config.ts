export default defineNuxtConfig({
  app: {
    head: {
      title: 'БПЛА',
    },
    baseURL: '/DRONE/', // baseURL: '/<repository>/'
    buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids nojkill conflict
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
