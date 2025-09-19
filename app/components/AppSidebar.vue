<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-vue-next"
import NavMain from '@/components/NavMain.vue'
import NavProjects from '@/components/NavProjects.vue'
import NavUser from '@/components/NavUser.vue'
import TeamSwitcher from '@/components/TeamSwitcher.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import SidebarTrigger from './ui/sidebar/SidebarTrigger.vue'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
})

// Get sidebar state
const { state } = useSidebar()

// This is sample data.
const data = {
  user: {
    name: "Randall Clyde",
    email: "randsky@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  
  
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All Pages",
          url: "#",
        },
        {
          title: "Reports",
          url: "#",
        },
        {
          title: "Products",
          url: "#",
        },
        {
          title: "Tasks",
          url: "#",
        },
      ],
    },
    {
      title: "Features",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Pricing",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
     {
      title: "Integration",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All Pages",
          url: "#",
        },
        {
          title: "Reports",
          url: "#",
        },
        {
          title: "Products",
          url: "#",
        },
        {
          title: "Tasks",
          url: "#",
        },
      ],
    },

  ],

  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <!-- <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader> -->
    <div 
      class="flex items-center mt-[38px] mb-[42px]"
      :class="state === 'collapsed' ? 'justify-center' : 'justify-between mx-[28px]'"
    >
      <NuxtImg
        src="/logo.png"
        alt="Logo"
        width="115"
        height="22"
        class="block md:group-data-[state=collapsed]:hidden"
      />
      <SidebarTrigger />
    </div>

    <SearchForm/>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavMain :items="data.navSecondary" />
      <!-- <NavProjects :projects="data.projects" /> -->
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>