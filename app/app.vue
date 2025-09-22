<template>
  <div :class="{ 'dark': isDark }">
    <NuxtPage />    

  </div>
</template>

<script setup>
// Dark mode state
const isDark = ref(true)

// Toggle function
const toggleDark = () => {
  isDark.value = !isDark.value
  // Save to localStorage
  if (process.client) {
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDark.value)
  }
}

// Load saved theme on client side
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
  document.documentElement.classList.toggle('dark', isDark.value)
})

// Provide globally so you can use it in any component
provide('isDark', readonly(isDark))
provide('toggleDark', toggleDark)
</script>