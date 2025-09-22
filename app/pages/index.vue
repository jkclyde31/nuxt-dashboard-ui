<script lang="ts">
export const iframeHeight = "800px"
export const description = "Admin Dashboard built with Nuxt 4, Tailwind CSS, and Shadcn UI components."
</script>

<script setup lang="ts">

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



import { SidebarInset,  SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
</script>

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
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div class="flex flex-1 flex-col gap-[24px] p-4 lg:px-[42px] md:py-[32px]">
        <PageHeader />
        <MetricsCard />
        <DashboardMain />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
