<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";
import { useAuthStore } from "~/store/auth.store";

const mode = useColorMode();
const authStore = useAuthStore();
const onToggleTheme = () => {
  mode.value === "dark" ? (mode.value = "light") : (mode.value = "dark");
};
</script>

<template>
  <header
    class="fixed top-0 z-50 w-full border-b border-[#e4e4e766]/40 bg-[#fff9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#fff9]/60 dark:bg-transparent dark:border-zinc-800"
  >
    <div
      class="container flex h-14 max-w-screen-2xl items-center justify-between"
    >
      <div class="flex items-center space-x-3 cursor-pointer">
        <img
          :src="mode === 'light' ? '/img/logo.svg' : '/img/logo_white.svg'"
          class="h-7 w-7 text-zinc-100"
        />
        <span class="text-[22px] font-bold dark:text-zinc-100">Notium</span>
      </div>
      <div class="flex items-center space-x-3">
        <component
          @click="onToggleTheme"
          :is="mode === 'light' ? Moon : Sun"
          :color="mode === 'light' ? 'rgb(39 39 42)' : 'rgb(244 244 245)'"
        />
        <UiButton @click="authStore.logout">
        Logout
      </UiButton>
      </div>
    </div>
  </header>
</template>
