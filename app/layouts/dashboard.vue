<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex md:hidden sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <NuxtLink to="/" class="hover:text-foreground">
                Dashboard
              </NuxtLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{{ pageTitle }}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div class="flex flex-1 flex-col gap-4 md:gap-6 p-4 lg:px-[42px] md:py-[32px]">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup>
import AppSidebar from "~/components/AppSidebar.vue"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import Separator from "~/components/ui/separator/Separator.vue"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"

// Get current route for dynamic breadcrumbs
const route = useRoute()

// Compute page title from route name or meta
const pageTitle = computed(() => {
  return route.meta.title || 
         route.name?.toString().replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 
         'Dashboard'
})
</script>