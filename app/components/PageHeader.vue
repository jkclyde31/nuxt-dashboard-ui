<script setup>
    import Button from './ui/button/Button.vue';
    import { MoveDown  } from "lucide-vue-next"
    import { NuxtImg } from '#components';


</script>

<template>
    <!-- inner -->
    <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-[20px] md:mb-[32px]  gap-[20px]">
        <!-- left -->
         <div>
            <h2 class="font-semibold text-[24px] leading-[32px]">Welcome back, John</h2>
            <p class="text-[12px] leading-[14px]">Measure your advertising ROI and report website traffic.</p>
         </div>
         <!-- right -->
        <div class="flex items-center gap-[12px] justify-between sm:justify-end">
             <Button class="h-[40px] w-full max-w-[48%] sm:max-w-[99px]  bg-[#0A1330]  text-[12px] font-medium p-[8px] rounded-[4px]">
                 Export Data
                <NuxtImg
                    src="/movedown.png"
                    alt="Logo"
                    width="10"
                    height="10"
                    class="block md:group-data-[state=collapsed]:hidden"
                /> 
            </Button>

             <Button class="h-[40px]  w-full max-w-[48%] sm:max-w-[99px]  bg-[#CB3CFF]  text-[12px] font-medium p-[8px] rounded-[4px]">
                 Create Report
            </Button>
        </div>

    </div>
</template>