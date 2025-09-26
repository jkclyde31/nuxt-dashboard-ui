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
const colorMode = useColorMode()


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
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Home",
          url: "/",
        },
        {
          title: "Reports",
          url: "/inner",
        },
        {
          title: "Products",
          url: "/inner",
        },
        {
          title: "Tasks",
          url: "/inner",
        },
      ],
    },
    {
      title: "Features",
      url: "/inner",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "/inner",
        },
        {
          title: "Explorer",
          url: "/inner",
        },
        {
          title: "Quantum",
          url: "/inner",
        },
      ],
    },
    {
      title: "Users",
      url: "/inner",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "/inner",
        },
        {
          title: "Get Started",
          url: "/inner",
        },
        {
          title: "Tutorials",
          url: "/inner",
        },
        {
          title: "Changelog",
          url: "/inner",
        },
      ],
    },
    {
      title: "Pricing",
      url: "/inner",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/inner",
        },
        {
          title: "Team",
          url: "/inner",
        },
        {
          title: "Billing",
          url: "/inner",
        },
        {
          title: "Limits",
          url: "/inner",
        },
      ],
    },
     {
      title: "Integration",
      url: "/inner",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/inner",
        },
        {
          title: "Team",
          url: "/inner",
        },
        {
          title: "Billing",
          url: "/inner",
        },
        {
          title: "Limits",
          url: "/inner",
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "/inner",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All Pages",
          url: "/inner",
        },
        {
          title: "Reports",
          url: "/inner",
        },
        {
          title: "Products",
          url: "/inner",
        },
        {
          title: "Tasks",
          url: "/inner",
        },
      ],
    },

  ],

  projects: [
    {
      name: "Home",
      url: "/",
      icon: Frame,
    },
    // {
    //   name: "Sales & Marketing",
    //   url: "/inner",
    //   icon: PieChart,
    // },
    // {
    //   name: "Travel",
    //   url: "/inner",
    //   icon: Map,
    // },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <!-- <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader> -->
    <div 
      class="hidden md:flex items-center mt-[35px] md:mt-[38px] mb-[15px] md:mb-[42px]"
      :class="state === 'collapsed' ? 'justify-center' : 'justify-between mx-[28px]'"
    >
      <NuxtImg
    :src="colorMode.value === 'dark' ? '/logo.png' : '/logo.png'"
        alt="Logo"
        width="115"
        height="22"
        class="block md:group-data-[state=collapsed]:hidden"
      />
      <SidebarTrigger />
    </div>

    <SearchForm/>
    <SidebarContent>
      <!-- <NavProjects :projects="data.projects" /> -->

      <NavMain :items="data.navMain" />
      
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>