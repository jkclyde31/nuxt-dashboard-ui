<script setup>
import { Card, CardContent } from '@/components/ui/card'
import { Eye, Users, UserPlus, Star, MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-vue-next'

// Mock data - directly in the component
const mockData = {
  metrics: [
    {
      id: 'pageviews',
      title: 'Pageviews',
      value: '50.8K',
      change: 30.4,
      changeType: 'increase',
      iconKey: 'eye'
    },
    {
      id: 'monthly_users',
      title: 'Monthly users',
      value: '23.6K',
      change: 12.6,
      changeType: 'decrease',
      iconKey: 'users'
    },
    {
      id: 'new_signups',
      title: 'New sign ups',
      value: '756',
      change: 3.1,
      changeType: 'increase',
      iconKey: 'userPlus'
    },
    {
      id: 'subscriptions',
      title: 'Subscriptions',
      value: '2.3K',
      change: 11.3,
      changeType: 'increase',
      iconKey: 'star'
    }
  ]
}

// Icon mapping for JSON data
const iconMap = {
  eye: Eye,
  users: Users,
  userPlus: UserPlus,
  star: Star
}

// Transform the mock data to include icons
const metrics = mockData.metrics.map(metric => ({
  ...metric,
  icon: iconMap[metric.iconKey] || Eye
}))
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
    <Card 
      v-for="metric in metrics" 
      :key="metric.id"
      class="rounded-[8px]"
    >
      <CardContent class="p-[19px]">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <component :is="metric.icon" class="h-4 w-4 text-slate-800 dark:text-slate-400 " />
            <span class="text-slate-800 dark:text-slate-400 text-[12px]">{{ metric.title }}</span>
          </div>
          <MoreHorizontal class="h-5 w-5 text-slate-800 dark:text-slate-400" />
        </div>
        <div class="mt-[19px] flex gap-[6px]">
          <div class="text-3xl font-bold ">{{ metric.value }}</div>
          <div class="flex items-center gap-1 mt-1">
            <span 
              :class="`text-xs ${metric.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`"
            >
              {{ metric.change }}%
            </span>
            <component 
              :is="metric.changeType === 'increase' ? TrendingUp : TrendingDown" 
              :class="`h-3 w-3 ${metric.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`"
            />
            
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.bg-card{
    padding: 0 0px;
}
</style>

