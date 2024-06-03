<script setup lang="ts">
import { LogOut } from "lucide-vue-next";
import { useNotesStore } from "~/store/notes.store";
import useConversation from "~/composables/useConversation";
import { useAuthStore } from "~/store/auth.store";

useSeoMeta({
  title: "Notium - smart cloud app for your notes",
});
definePageMeta({
  middleware: "auth",
});

const model = ref("");
const isPending = ref(false);
const messages = ref<ChatCompletionRequestMessage[]>([]);

const notesStore = useNotesStore();
const authStore = useAuthStore();
const mode = useColorMode();

const { notes } = storeToRefs(notesStore);
const { usePostConversations } = useConversation(notes, model);

const handleSubmit = async () => {
  try {
    isPending.value = true;
    const userMessage: { role: "user"; text: string } = {
      role: "user",
      text: model.value,
    };
    messages.value.push(userMessage);
    const response = await usePostConversations();
    messages.value.push(response);
    model.value = "";
  } catch (err) {
    console.log(err);
  } finally {
    isPending.value = false;
  }
};

onActivated(async () => {
  await notesStore.getNotes();
});
</script>

<template>
  <div
    :aria-expanded="true"
    class="transition-width relative h-full w-full flex-col overflow-hidden"
  >
    <UiButton
      @click="authStore.logout"
      variant="ghost"
      class="fixed top-2 left-2 z-9999"
    >
      <LogOut
        :size="20"
        :color="mode === 'light' ? 'rgb(39 39 42)' : 'rgb(244 244 245)'"
      />
    </UiButton>
    <AiContent :messages="messages" :is-pending="isPending" />
    <AiMessage v-model="model" @on-submit="handleSubmit" />
  </div>
</template>
