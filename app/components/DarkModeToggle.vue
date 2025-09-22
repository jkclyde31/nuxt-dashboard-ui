<script setup lang="ts">
import { Icon } from '@iconify/vue'

const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

const isDark = computed(() => colorMode.preference === 'dark')
</script>

<template>
  <button
    @click="toggleTheme"
    class="fixed bottom-6 right-6 z-[9999] group relative overflow-hidden rounded-full p-4 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
    :class="[
      isDark 
        ? 'bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl shadow-slate-900/50 border border-slate-700' 
        : 'bg-gradient-to-br from-orange-400 to-yellow-500 shadow-2xl shadow-orange-500/50 border border-orange-300'
    ]"
    :style="{ position: 'fixed !important', bottom: '1.5rem', right: '1.5rem' }"
  >
    <div 
      class="absolute inset-0 rounded-full transition-all duration-500 ease-in-out"
      :class="[
        isDark 
          ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20' 
          : 'bg-gradient-to-br from-yellow-300/30 to-orange-300/30'
      ]"
    ></div>
    
    <div class="relative h-8 w-8 transition-transform duration-500 ease-in-out" :class="{ 'rotate-180': isDark }">
      <!-- Sun icon -->
      <Icon 
        icon="ph:sun-fill" 
        class="absolute inset-0 h-8 w-8 text-white transition-all duration-500 ease-in-out"
        :class="[
          isDark 
            ? 'rotate-90 scale-0 opacity-0' 
            : 'rotate-0 scale-100 opacity-100'
        ]"
      />
      
      <!-- Moon icon -->
      <Icon 
        icon="ph:moon-stars-fill" 
        class="absolute inset-0 h-8 w-8 text-white transition-all duration-500 ease-in-out"
        :class="[
          isDark 
            ? 'rotate-0 scale-100 opacity-100' 
            : '-rotate-90 scale-0 opacity-0'
        ]"
      />
    </div>

    <!-- Ripple effect on click -->
    <div class="absolute inset-0 rounded-full opacity-0 group-active:opacity-25 group-active:animate-ping bg-white"></div>
    
    <!-- Subtle glow effect -->
    <div 
      class="absolute -inset-1 rounded-full opacity-50 blur-lg transition-opacity duration-300"
      :class="[
        isDark 
          ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
          : 'bg-gradient-to-br from-orange-400 to-yellow-500'
      ]"
    ></div>

    <span class="sr-only">Toggle theme</span>
  </button>
</template>