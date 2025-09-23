<template>
  <Card class="transition-all duration-300 group border-0">
    <CardContent class="p-[15px] sm:p-[25px]">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <Eye class="h-4 w-4 text-blue-400  transition-colors" />
          <span class="text-slate-800 dark:text-slate-400 text-sm  transition-colors">Total sessions</span>
        </div>
    
      </div>
      
      <div class="text-3xl font-bold  mb-4  transition-colors">
        400
      </div>
      
      <div class="flex items-center gap-1 mb-4">
        <TrendingUp class="h-3 w-3 text-green-500 animate-pulse" />
        <span class="text-green-500 text-sm font-semibold">10.6%</span>
        <span class="text-slate-500 text-xs ml-2">vs last week</span>
      </div>
      
      <div class="relative overflow-hidden rounded-lg">
        <div class="h-32 bg-gradient-to-br from-slate-800/30 to-blue-900/20 p-2 backdrop-blur-sm border border-slate-700/50">
          <canvas ref="sessionsChart" class="w-full h-full"></canvas>
        </div>
        <!-- Animated gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none rounded-lg"></div>
        <!-- Shimmer effect on hover -->
        <div class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
      </div>
      
      <div class="flex items-center justify-between mt-4 pt-4 border-t border-slate-700 group-hover:border-slate-600 transition-colors">
        <div class="flex items-center gap-2">
          <div class="relative">
            <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
            <div class="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
          </div>
          <span class="text-slate-400 text-sm">Live</span>
          <span class=" text-sm font-semibold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            10k visitors
          </span>
        </div>
        <button class="text-blue-400 hover:text-blue-300 text-sm transition-all duration-300 group/btn">
          View report
          <span class="ml-1 group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
        </button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, Eye } from 'lucide-vue-next'
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

const sessionsChart = ref(null)
let sessionsChartInstance = null

const sessionsData = {
  labels: ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '11 PM'],
  datasets: [{
    data: [150, 80, 200, 350, 420, 380, 450, 320, 250],
    borderColor: '#3b82f6',
    backgroundColor: (context) => {
      const ctx = context.chart.ctx
      const gradient = ctx.createLinearGradient(0, 0, 0, 120)
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)')
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.2)')
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)')
      return gradient
    },
    fill: true,
    tension: 0.4,
    pointBackgroundColor: '#3b82f6',
    pointBorderColor: '#1e293b',
    pointBorderWidth: 2,
    pointRadius: 3,
    pointHoverRadius: 6,
    pointHoverBackgroundColor: '#60a5fa',
    pointHoverBorderColor: '#93c5fd',
    pointHoverBorderWidth: 3,
    borderWidth: 3,
    shadowColor: 'rgba(59, 130, 246, 0.4)',
    shadowBlur: 10
  }]
}

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      titleColor: '#f1f5f9',
      bodyColor: '#f1f5f9',
      borderColor: '#334155',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: false,
      titleFont: { size: 13, weight: 'bold' },
      bodyFont: { size: 12 },
      padding: 12,
      callbacks: {
        title: function(context) {
          return context[0].label
        },
        label: function(context) {
          return `Sessions: ${context.parsed.y}`
        },
        afterLabel: function(context) {
          const total = context.dataset.data.reduce((a, b) => a + b, 0)
          const percentage = ((context.parsed.y / total) * 100).toFixed(1)
          return `${percentage}% of daily traffic`
        }
      }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#64748b',
        font: { size: 10, weight: '500' }
      }
    },
    y: {
      display: false,
      grid: { display: false }
    }
  },
  elements: {
    line: {
      borderJoinStyle: 'round',
      borderCapStyle: 'round'
    }
  },
  animation: {
    duration: 1500,
    easing: 'easeInOutCubic',
    delay: (context) => context.dataIndex * 50
  },
  interaction: {
    intersect: false,
    mode: 'index'
  },
  onHover: (event, activeElements) => {
    event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default'
  }
}

onMounted(() => {
  if (sessionsChart.value) {
    sessionsChartInstance = new ChartJS(sessionsChart.value, {
      type: 'line',
      data: sessionsData,
      options: lineChartOptions
    })
  }
})

onBeforeUnmount(() => {
  if (sessionsChartInstance) sessionsChartInstance.destroy()
})
</script>

<style scoped>
.shadow-sm {
  --tw-shadow: 0 0 #0000;
  box-shadow: none !important; 
}


</style>