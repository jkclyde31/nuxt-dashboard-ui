<script setup lang="ts">
definePageMeta({
  title: 'Dashboard'
})
</script>

<template>
<div class="flex flex-1 flex-col  gap-4 md:gap-6 ">
          <!--  -->
          <PageHeader />
          <MetricsCard />
          <DashboardMain />
        </div>
</template>