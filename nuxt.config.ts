import tailwindcss from '@tailwindcss/vite'
// nuxt-aos

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['shadcn-nuxt', '@nuxt/image', 'nuxt-keen-slider', 'nuxt-charts','@nuxtjs/color-mode'],
   css: [
  '~/assets/css/tailwind.css',
  'keen-slider/keen-slider.min.css'  
],

// Add color mode configuration
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '', // Changed from '-mode' to empty string
    storageKey: 'nuxt-color-mode'
  },

  
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
   shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./shadcn/ui"
     */
    componentDir: './shadcn/ui'
  },
})