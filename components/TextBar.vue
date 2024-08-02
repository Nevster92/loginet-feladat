<script setup lang="ts">
const emit = defineEmits<{
  (e: "send", message: string): void;
}>();

const messageText = ref("");
function sendMessage() {
  //TODO implement emojis...

  emit("send", messageText.value);
  messageText.value = "";
}
</script>

<template>
  <div class="flex justify-end">
    <UInput
      class="grow self-center"
      v-model="messageText"
      placeholder="Enter your message...."
      :ui="{ padding: 'px-6 py-10' }"
      @keyup.enter="sendMessage"
    >
    </UInput>
    <UButton
      icon="i-material-symbols:send"
      size="sm"
      color="primary"
      variant="solid"
      label="Küldés"
      class="mx-2"
      type="submit"
      cursor="pointer"
      @click="sendMessage"
    />
  </div>
</template>

<style></style>
