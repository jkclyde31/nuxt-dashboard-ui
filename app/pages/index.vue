<script setup>
// THIS IS THE KEY - tell the page to use dashboard layout
definePageMeta({
  layout: 'dashboard',
  title: 'Dashboard'
})

const logout = inject('logout')
</script>

<template>
<div class="flex flex-1 flex-col  gap-4 md:gap-6 ">
          <!--  -->
          <PageHeader />
          <MetricsCard />
          <DashboardMain />
        </div>
</template>