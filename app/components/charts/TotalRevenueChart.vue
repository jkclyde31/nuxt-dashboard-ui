<template>
  <Card class="w-full h-full transition-all duration-300 border-0 flex flex-col">
    <CardContent class="p-[15px] sm:p-[25px] flex-1 flex flex-col ">
      <!-- Header Section - Responsive layout -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-6 gap-4 flex-shrink-0">
        <div class="flex-shrink-0">
          <h3 class=" text-base sm:text-lg font-semibold mb-1">Total revenue</h3>
          <div class="text-2xl sm:text-3xl font-bold  mb-1">$240.8K</div>
          <div class="flex items-center gap-1">
            <TrendingUp class="h-3 w-3 text-green-500" />
            <span class="text-green-500 text-sm">23.6%</span>
          </div>
        </div>
        
        <!-- Legend - Responsive layout -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-purple-500 flex-shrink-0"></div>
            <span class="text-slate-400">Revenue</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"></div>
            <span class="text-slate-400">Expenses</span>
          </div>
          <div class="flex items-center gap-1 text-slate-400">
            <Calendar class="h-4 w-4 flex-shrink-0" />
            <span class="whitespace-nowrap">Jan 2024 - Dec 2024</span>
          </div>
        </div>
      </div>
      
      <!-- Chart Container - Takes remaining space -->
      <div class="flex-1 relative w-full min-h-0">
        <canvas ref="revenueChart" class="w-full h-full"></canvas>
      </div>
      
      <!-- Footer - Responsive layout -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between mt-4 pt-4 border-t border-slate-800 gap-2 flex-shrink-0">
        <div class="text-slate-400 text-sm">
          <span class=" font-semibold">$125.2K</span> Jun 21, 2024
        </div>
        <div class="flex items-center gap-1">
          <TrendingUp class="h-3 w-3 text-green-500" />
          <span class="text-green-500 text-sm">12.5%</span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, Calendar } from 'lucide-vue-next'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
)

const revenueChart = ref(null)
let revenueChartInstance = null

const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Revenue',
      data: [45, 52, 85, 125, 165, 135, 180, 205, 225, 210, 235, 240],
      borderColor: '#a855f7',
      backgroundColor: 'rgba(168, 85, 247, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#a855f7',
      pointBorderColor: '#1e293b',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    },
    {
      label: 'Expenses',
      data: [35, 38, 42, 45, 48, 52, 55, 58, 60, 62, 65, 68],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#1e293b',
      pointBorderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5
    }
  ]
}

// Responsive chart options
const getChartOptions = () => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1e293b',
      titleColor: '#f1f5f9',
      bodyColor: '#f1f5f9',
      borderColor: '#334155',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#94a3b8',
        font: { 
          size: window.innerWidth < 640 ? 10 : 12 
        },
        maxRotation: window.innerWidth < 640 ? 45 : 0
      }
    },
    y: {
      grid: {
        color: '#334155',
        borderDash: [2, 2]
      },
      ticks: {
        color: '#94a3b8',
        font: { 
          size: window.innerWidth < 640 ? 10 : 12 
        },
        callback: function(value) {
          return value + 'K'
        },
        maxTicksLimit: window.innerWidth < 640 ? 5 : 8
      }
    }
  },
  elements: {
    point: {
      radius: window.innerWidth < 640 ? 2 : 4,
      hoverRadius: window.innerWidth < 640 ? 4 : 6
    }
  }
})

const createChart = async () => {
  if (revenueChart.value) {
    // Destroy existing chart
    if (revenueChartInstance) {
      revenueChartInstance.destroy()
    }
    
    // Wait for DOM update
    await nextTick()
    
    revenueChartInstance = new ChartJS(revenueChart.value, {
      type: 'line',
      data: revenueData,
      options: getChartOptions()
    })
  }
}

const handleResize = () => {
  if (revenueChartInstance) {
    revenueChartInstance.options = getChartOptions()
    revenueChartInstance.update()
  }
}

onMounted(() => {
  createChart()
  
  // Add resize listener for responsive behavior
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (revenueChartInstance) revenueChartInstance.destroy()
  window.removeEventListener('resize', handleResize)
})
</script>