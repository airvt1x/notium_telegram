<script setup lang="ts">
import { ArrowBigUpDash } from 'lucide-vue-next';
import { useAuthStore } from '~/store/auth.store';

const emit = defineEmits<{
  (e: 'onSubmit'): void;
}>();

const authstore = useAuthStore();
const { isSkeleton } = storeToRefs(authstore);
const { store } = useColorMode();

const model = defineModel<string>();
</script>

<template>
  <div v-if="!isSkeleton" class="message sticky bottom-0 z-50 flex w-full flex-col items-center px-8 pb-4">
    <form @submit.prevent="emit('onSubmit')" class="relative w-full">
      <UiInput v-model="model" :placeholder="'jkfdsjkhfh'" class="h-11" />
      <UiButton type="submit" variant="ghost" class="absolute right-[4px] top-1/2 h-9 -translate-y-1/2 px-2">
        <ArrowBigUpDash :color="store === 'light' ? 'rgb(82 82 91 / 0.9)' : 'rgb(113 113 122)'" />
      </UiButton>
    </form>
  </div>
  <div v-else class="skeleton sticky bottom-0 z-50 flex w-full flex-col items-center px-8 pb-4">
    <UiSkeleton class="h-11 w-full" />
  </div>
</template>
