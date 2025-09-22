<template>
  <Card class=" transition-all duration-300 group border-0">
    <CardContent class="p-[15px] sm:p-[25px]">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <BarChart3 class="h-4 w-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
          <span class="text-slate-800 dark:text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Total profit</span>
        </div>
        <button 
          @click="toggleView"
          class="text-xs px-3 py-1 rounded-full bg-purple-600 dark:bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 transition-all duration-300 hover:scale-105"
        >
          {{ viewMode }}
        </button>
      </div>
      
      <div class="text-3xl font-bold  mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-100 transition-colors">
        $144.6K
      </div>
      
      <div class="flex items-center gap-1 mb-4">
        <TrendingUp class="h-3 w-3 text-green-500 animate-pulse" />
        <span class="text-green-500 text-sm font-semibold">28.6%</span>
        <span class="text-slate-500 text-xs ml-2">vs last month</span>
      </div>
      
      <div class="relative overflow-hidden rounded-lg">
        <div class="h-32 bg-gradient-to-br from-slate-800/30 to-purple-900/20 p-2 backdrop-blur-sm border border-slate-700/50">
          <canvas ref="profitChart" class="w-full h-full"></canvas>
        </div>
        <!-- Gradient overlay for depth -->
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none rounded-lg"></div>
        <!-- Animated border glow on hover -->
        <div class="absolute inset-0 rounded-lg border border-purple-500/0 group-hover:border-purple-500/30 transition-all duration-500"></div>
      </div>
      
      <div class="flex items-center justify-between mt-4 pt-4  transition-colors">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
          <span class="text-slate-400 text-sm">Last 12 months</span>
        </div>
        <button class="text-purple-400 hover:text-purple-300 text-sm transition-all duration-300 group/btn">
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
import { TrendingUp, BarChart3 } from 'lucide-vue-next'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
)

const profitChart = ref(null)
let profitChartInstance = null
const viewMode = ref('Monthly')

// Different datasets for different views
const chartData = {
  Monthly: {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      data: [115, 125, 120, 144.6, 100, 165, 175, 205],
      backgroundColor: [
        'rgba(168, 85, 247, 0.6)',
        'rgba(168, 85, 247, 0.7)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(168, 85, 247, 1)', 
        'rgba(168, 85, 247, 0.8)',
        'rgba(168, 85, 247, 0.7)',
        'rgba(168, 85, 247, 0.6)',
        'rgba(168, 85, 247, 0.5)'
      ],
      borderColor: '#a855f7',
      borderWidth: 2,
      borderRadius: 6,
      borderSkipped: false,
      hoverBackgroundColor: '#c084fc',
      hoverBorderColor: '#d8b4fe',
      hoverBorderWidth: 3
    }]
  },
  Weekly: {
    labels: ['W1', 'W2', 'W3', 'W4'],
    datasets: [{
      data: [35, 42, 38, 45],
      backgroundColor: [
        'rgba(59, 130, 246, 0.6)',
        'rgba(59, 130, 246, 0.7)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(59, 130, 246, 1)'
      ],
      borderColor: '#3b82f6',
      borderWidth: 2,
      borderRadius: 6,
      borderSkipped: false,
      hoverBackgroundColor: '#60a5fa',
      hoverBorderColor: '#93c5fd',
      hoverBorderWidth: 3
    }]
  }
}

const barChartOptions = {
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
      callbacks: {
        title: function(context) {
          return context[0].label
        },
        label: function(context) {
          return `Profit: $${context.parsed.y}K`
        }
      }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#64748b',
        font: { size: 11, weight: '500' }
      }
    },
    y: {
      display: false,
      grid: { display: false }
    }
  },
  animation: {
    duration: 1200,
    easing: 'easeInOutQuart',
    delay: (context) => context.dataIndex * 100 // Stagger animation
  },
  onHover: (event, activeElements) => {
    event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default'
  }
}

const toggleView = () => {
  viewMode.value = viewMode.value === 'Monthly' ? 'Weekly' : 'Monthly'
  updateChart()
}

const updateChart = () => {
  if (profitChartInstance) {
    profitChartInstance.data = chartData[viewMode.value]
    profitChartInstance.update('active')
  }
}

onMounted(() => {
  if (profitChart.value) {
    profitChartInstance = new ChartJS(profitChart.value, {
      type: 'bar',
      data: chartData[viewMode.value],
      options: barChartOptions
    })
  }
})

onBeforeUnmount(() => {
  if (profitChartInstance) profitChartInstance.destroy()
})
</script>