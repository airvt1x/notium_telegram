<script setup lang="ts">
import { useAuthStore } from '~/store/auth.store';
import { cn } from '~/lib/utils';

const authstore = useAuthStore();

onMounted(async () => {
  authstore.setSkeleton();
});
onUnmounted(() => {
  authstore.setSkeletonOnUnmount();
});
</script>

<template>
  <div class="relative flex h-screen w-screen flex-1">
    <div class="relative flex h-full w-full flex-col">
      <LayoutHeader />
      <div
        :class="
          cn('h-full w-full dark:bg-[#1a1a1a]')
        "
      >
        <slot />
      </div>
    </div>
  </div>
</template>