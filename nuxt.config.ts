import tailwindcss from '@tailwindcss/vite'
// nuxt-aos

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['shadcn-nuxt', '@nuxt/image', 'nuxt-keen-slider'],
   css: [
  '~/assets/css/tailwind.css',
  'keen-slider/keen-slider.min.css'  
],
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