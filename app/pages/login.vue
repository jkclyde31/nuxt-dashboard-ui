<template>
  <div class="w-full max-w-md mx-auto space-y-6">
    <div class="text-center">
      <h1 class="text-3xl font-bold">Welcome Back</h1>
      <p class="text-muted-foreground mt-2">Please sign in to continue</p>
    </div>
    
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input 
          type="email" 
          v-model="email"
          class="w-full px-3 py-2 border rounded-md bg-background"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Password</label>
        <input 
          type="password" 
          v-model="password"
          class="w-full px-3 py-2 border rounded-md bg-background"
          placeholder="Enter your password"
        />
      </div>
      <button 
        type="submit"
        class="w-full px-4 py-2 bg-popover text-foreground  rounded-md hover:bg-primary/90"
      >
        Sign In
      </button>
    </form>
  </div>
</template>

<script setup>
// THIS IS THE KEY - tell the page to use auth layout
definePageMeta({
  layout: 'auth',
  title: 'Login'
})

const login = inject('login')
const email = ref('')
const password = ref('')

const handleLogin = () => {
  // Dummy login - just call the login function
  login()
}
</script>