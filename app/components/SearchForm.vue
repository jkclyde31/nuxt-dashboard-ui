<script setup lang="ts">
import { Search } from "lucide-vue-next"
import { Label } from '@/components/ui/label'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from '@/components/ui/sidebar'
</script>

<template>
  <form>
    <SidebarGroup class="py-0 mb-[32px]">
      <SidebarGroupContent class="relative">
        <Label for="search" class="sr-only">
          Search For
        </Label>
        <SidebarInput
          id="search"
          placeholder="Search for..."
          class="h-[42px] bg-[#0B1739] text-white pl-[38px] border-[#343B4F]"
        />
        <Search class="pointer-events-none absolute left-[14px] top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
      </SidebarGroupContent>
    </SidebarGroup>
  </form>
</template>

<style scoped>

</style>