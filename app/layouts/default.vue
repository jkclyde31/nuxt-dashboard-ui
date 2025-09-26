<template>
  <div>
    <!-- Show auth layout for login/register pages -->
    <NuxtLayout v-if="isAuthPage" name="auth">
      <slot />
    </NuxtLayout>
    
    <!-- Show dashboard layout for authenticated users on protected pages -->
    <NuxtLayout v-else-if="isAuthenticated" name="dashboard">
      <slot />
    </NuxtLayout>
    
    <!-- Redirect to login if not authenticated and trying to access protected pages -->
    <div v-else>
      <div class="min-h-screen flex items-center justify-center bg-background">
        <div class="text-center">
          <h2 class="text-2xl font-bold mb-4">Access Denied</h2>
          <p class="text-muted-foreground mb-4">Please log in to access this page.</p>
          <button 
            @click="navigateTo('/login')" 
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const isAuthenticated = inject('isAuthenticated', ref(false))

// Define which pages should use auth layout
const authPages = ['/login', '/register', '/forgot-password']
const isAuthPage = computed(() => authPages.includes(route.path))

// Auto-redirect to dashboard if authenticated and on auth page
watch([isAuthenticated, () => route.path], ([authenticated, path]) => {
  if (authenticated && authPages.includes(path)) {
    navigateTo('/')
  }
}, { immediate: true })
</script>