<script setup lang="ts">
import { useAuthStore } from '~/store/auth.store';
import { cn } from '~/lib/utils';

const authstore = useAuthStore();
const mode = useColorMode();

onMounted(async () => {
  authstore.setSkeleton();
});
onUnmounted(() => {
  authstore.setSkeletonOnUnmount();
});
</script>

<template>
  <div class="relative flex h-dvh w-screen flex-1">
    <div class="relative flex h-dvh w-full flex-col">
      <div
        :class="
          cn('h-dvh w-full dark:bg-[#1a1a1a]')
        "
      >
        <slot />
      </div>
    </div>
  </div>
</template>