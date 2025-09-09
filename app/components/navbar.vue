<script setup lang="ts">
import { ref } from 'vue'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const menuItems = [
  { name: 'Main', href: '/#' },
  { name: 'Gallery', href: '/#' },
  { name: 'Projects', href: '/#' },
  { name: 'Certifications', href: '/#' },
  { name: 'Contacts', href: '/#' }
]
</script>

<template>
  <!-- Desktop Navigation -->
  <NavigationMenu class="hidden md:block w-full max-w-[622px] menu-container">
    <NavigationMenuList class="flex justify-between items-center w-[100%] here">
      <NavigationMenuItem v-for="item in menuItems" :key="item.name">
        <NavigationMenuLink
          :href="item.href"
          :class="[navigationMenuTriggerStyle(), 'reset-padding']"
          class="menu-link"
        >
          {{ item.name }}
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>

  <!-- Mobile Navigation -->
  <div class="md:hidden">
    <!-- Mobile Menu Button -->
    <Button
      variant="ghost"
      size="icon"
      class="mobile-menu-btn"
      @click="toggleMobileMenu"
    >
      <div class="hamburger" :class="{ 'active': isMobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </Button>

    <!-- Mobile Menu Overlay and Sidebar -->
    <Teleport to="body">
      <div 
        v-if="isMobileMenuOpen" 
        class="mobile-menu-backdrop fixed inset-0 z-[9999] bg-black/70"
        @click="closeMobileMenu"
      >
        <!-- Mobile Sidebar (80% width, slides from left) -->
        <div 
          class="mobile-sidebar fixed top-0 left-0 h-full w-[80%] bg-[#0C0C0C] backdrop-blur-sm border-r border-white/10 transform transition-transform duration-300 ease-in-out"
          :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
          @click.stop
        >
          <!-- Close Button -->
          <div class="flex justify-end p-6">
            <Button
              variant="ghost"
              size="icon"
              @click="closeMobileMenu"
              class="text-white hover:text-[#9EFF00] hover:bg-white/10"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </Button>
          </div>

          <!-- Mobile Menu Items -->
          <NavigationMenu class="w-full px-6">
            <NavigationMenuList class="flex flex-col space-y-4 items-stretch w-full">
              <NavigationMenuItem v-for="item in menuItems" :key="item.name" class="w-full">
                <NavigationMenuLink
                  :href="item.href"
                  @click="closeMobileMenu"
                  :class="[navigationMenuTriggerStyle()]"
                  class="mobile-menu-link w-full text-left justify-start py-4 px-4 text-lg font-medium"
                >
                  {{ item.name }}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.reset-padding {
  padding: 20px !important;
}

.menu-container div {
  width: 100% !important;
}

.menu-link {
  font-size: 18px;
  font-weight: medium !important;
  color: var(--navlinks);
}

.bg-background {
  background-color: unset;
}

.menu-link {
  color: white;
}

.menu-link:hover {
  color: #9EFF00;
}

/* Mobile Menu Button Styles */
.mobile-menu-btn {
  background: transparent !important;
  border: none !important;
  color: white !important;
  padding: 8px !important;
}

.mobile-menu-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
}

.hamburger span {
  display: block;
  height: 2px;
  width: 100%;
  background-color: white;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile Menu Backdrop */
.mobile-menu-backdrop {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Mobile Sidebar */
.mobile-sidebar {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Mobile Menu Links */
.mobile-menu-link {
  font-size: 1.125rem !important;
  font-weight: 500 !important;
  color: white !important;
  text-decoration: none !important;
  position: relative;
  background: transparent !important;
  border-radius: 8px !important;
  transition: all 0.3s ease;
  display: flex !important;
  align-items: start !important;
}

.mobile-menu-link:hover {
  color: #9EFF00 !important;
  background: rgba(158, 255, 0, 0.1) !important;
}

.mobile-menu-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, #9EFF00, transparent);
  border-radius: 8px 0 0 8px;
  transition: all 0.3s ease;
  opacity: 0;
}

.mobile-menu-link:hover::before {
  width: 4px;
  opacity: 1;
}

/* Navigation Menu List Override for Mobile */
.mobile-sidebar .bg-background {
  background-color: transparent !important;
}
</style>