<template>
  <div class="">
    <!-- Main Grid Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 bg-card border border-border rounded-[8px] overflow-hidden min-h-[600px]">
      <!-- Total Revenue Chart -->
      <div class="border-r border-border flex flex-col">
        <div class="flex-1 h-full">
          <TotalRevenueChart />
        </div>
      </div>

      <!-- Right Column -->
      <div class="flex flex-col">
        <div class="flex-1 flex flex-col">
          <!-- Total Profit Chart -->
          <div class="flex-1 border-b border-border min-h-0">
            <TotalProfitChart />
          </div>
          
          <!-- Total Sessions Chart -->
          <div class="flex-1 min-h-0">
            <TotalSessionsChart />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="mt-12 pt-6 border-t border-slate-800">
      <div class="flex items-center justify-between text-slate-500 text-sm">
        <span>copyright 2025</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import TotalRevenueChart from './charts/TotalRevenueChart.vue'
import TotalProfitChart from './charts/TotalProfitChart.vue'
import TotalSessionsChart from './charts/TotalSessionsChart.vue'
</script>

<style scoped>
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

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}
</style>