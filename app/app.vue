<template>
  <div class="relative">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
    <DarkModeToggle />
  </div>
</template>

<script setup>
// Dummy Auth
const isAuthenticated = ref(false)

// Auth functions (dummy)
const login = () => {
  isAuthenticated.value = true
  navigateTo('/')
}

const logout = () => {
  isAuthenticated.value = false  
  navigateTo('/login')
}

// Dark mode
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const toggleDark = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

// Global provides
provide('isAuthenticated', readonly(isAuthenticated))
provide('login', login)
provide('logout', logout)
provide('isDark', readonly(isDark))
provide('toggleDark', toggleDark)
</script>