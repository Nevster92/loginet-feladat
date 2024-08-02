<script setup lang="ts">
import { type Message } from "@/server/types";

const props = defineProps<{ message: Message }>();
</script>

<template>
  <div class="px-4 py-1 w-1/2 rounded-md mb-3 bg-slate-200 break-words">
    <div class="flex items-center gap-x-2 flex flex-wrap">
      <div class="text-xs text-primary font-semibold">
        {{ message.user.username }}
      </div>
      <div class="text-xs">{{ message.ip }}</div>
      <div class="text-xs">{{ message.os }}</div>
      <div class="text-xs">{{ message.browser }}</div>
    </div>
    <div class="mt-1 text-base" :style="{ color: message.user.color }">
      {{ message.text }}
    </div>
  </div>
</template>

<style></style>
