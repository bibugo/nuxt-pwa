import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - web',
    title: 'web',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    '@/assets/font-roboto.css',
    '@/assets/font-notosans.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/global.js',
    '~/plugins/axios',
  ],

  router: {
    middleware: ['auth']
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    // '@nuxtjs/vuetify',
    ['@nuxtjs/vuetify', { iconfont: 'mdi' }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  proxy: {
    '/api/': { target: 'http://localhost:3000/local-api/v1', pathRewrite: { '^/api/': '' } }
  },

  serverMiddleware: [
    { path: '/local-api/v1', handler: '~/api/v1/index.js' },
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    }
  },

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          maxAge: Function(`'use strict'; return (${process.env.ACCESS_TOKEN_LIFE || 1800})`)(),
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refresh_token',
          maxAge: Function(`'use strict'; return (${process.env.REFRESH_TOKEN_LIFE || 60 * 60 * 24 * 30})`)(),
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          refresh: { url: '/api/auth/refresh', method: 'post' },
          user: { url: '/api/user', method: 'get' },
          logout: false
        },
        // autoLogout: false
      }
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: false,
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
        dark: {
          primary: '#2196F3',
          secondary: '#424242',
          accent: '#FF4081',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
    }
  },

  content: {
    // Options
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
