<template>
  <div class="">
   
    
    <!-- Main Grid Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 bg-card border border-border rounded-[8px] overflow-hidden">
      <!-- Total Revenue Chart -->
      <div class="p-6 border-r border-border">
        <TotalRevenueChart />
      </div>

      <!-- Right Column -->
      <div class="">
        <div class="space-y-6">
          <!-- Total Profit Chart -->
          <div class="border-b border-border">
            <TotalProfitChart />
          </div>
          
          <!-- Total Sessions Chart -->
          <div class="">
            <TotalSessionsChart />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Optional: Add some footer or additional info -->
    <div class="mt-12 pt-6 border-t border-slate-800">
      <div class="flex items-center justify-between text-slate-500 text-sm">
        <span>Last updated: {{ lastUpdated }}</span>
        <button 
          @click="refreshData" 
          class="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          :disabled="isRefreshing"
        >
          <RefreshCw :class="['h-4 w-4', { 'animate-spin': isRefreshing }]" />
          {{ isRefreshing ? 'Refreshing...' : 'Refresh Data' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RefreshCw } from 'lucide-vue-next'

import TotalRevenueChart from './charts/TotalRevenueChart.vue'
import TotalProfitChart from './charts/TotalProfitChart.vue'
import TotalSessionsChart from './charts/TotalSessionsChart.vue'

// Reactive data
const lastUpdated = ref('')
const isRefreshing = ref(false)

// Methods
const refreshData = async () => {
  isRefreshing.value = true
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  lastUpdated.value = new Date().toLocaleString()
  isRefreshing.value = false
}

const formatDateTime = () => {
  return new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Lifecycle
onMounted(() => {
  lastUpdated.value = formatDateTime()
  
  // Auto-refresh every 5 minutes (optional)
  setInterval(() => {
    lastUpdated.value = formatDateTime()
  }, 300000)
})

// Optional: Add keyboard shortcuts
onMounted(() => {
  const handleKeyPress = (event) => {
    // Press 'R' to refresh
    if (event.key.toLowerCase() === 'r' && !isRefreshing.value) {
      refreshData()
    }
  }
  
  document.addEventListener('keydown', handleKeyPress)
  
  // Cleanup
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeyPress)
  })
})
</script>

<style scoped>
/* Optional: Add some custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid > * {
  animation: fadeInUp 0.6s ease-out forwards;
}

.grid > *:nth-child(1) {
  animation-delay: 0.1s;
}

.grid > *:nth-child(2) {
  animation-delay: 0.2s;
}

/* Responsive improvements */
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>