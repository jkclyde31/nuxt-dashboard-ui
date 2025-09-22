<script setup lang="ts">
import { Search } from "lucide-vue-next"
import { Label } from '@/components/ui/label'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
  useSidebar,
} from '@/components/ui/sidebar'

// Get sidebar state
const { state } = useSidebar()
</script>

<template>
  <form>
    <SidebarGroup class="mt-[75px] md:mt-0 py-0 0px md:mb-[15px]">
      <SidebarGroupContent 
        class="relative"
        :class="state === 'collapsed' ? 'mx-0' : ''"
      >
        <Label for="search" class="sr-only">
          Search For
        </Label>
        <SidebarInput
          v-if="state !== 'collapsed'"
          id="search"
          placeholder="Search for..."
          class="h-[42px] pl-[38px] border-[#0B1739] border-1"
        />
        <Search 
          :class="state === 'collapsed' 
            ? 'size-5 mx-auto cursor-pointer hover:opacity-75 transition-opacity' 
            : 'pointer-events-none absolute left-[14px] top-1/2 size-4 -translate-y-1/2 select-none opacity-50'"
        />
      </SidebarGroupContent>
    </SidebarGroup>
  </form>
</template>

<style scoped>
</style>