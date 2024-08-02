<script setup lang="ts">
import { io, type Socket } from "socket.io-client";
import { detect } from "detect-browser";

const route = useRoute();

interface Message {
  user: User;
  text: string;
  ip: string;
  os: string;
  browser: string;
}
type User = {
  id: string;
  username: string;
  color: string;
};

const chats = ref<Message[]>([]);
const users = ref<User[]>([]);
const socket = ref<Socket>();

const sendMessage = async (mes: string) => {
  const browser = detect();
  socket.value?.emit("chatMessage", {
    text: mes,
    os: browser?.os,
    browser: browser?.name,
  });
};

onMounted(() => {
  const username = route.query.username;

  if (!username) {
    navigateTo("/");
  }

  socket.value = io({
    path: "/api/socket.io",
  });

  //   Join
  socket.value.emit("joinRom", { username });

  // Waitng for message
  socket.value.on("message", (response: Message) => {
    console.log(response);
    chats.value.push(response);
  });

  socket.value.on("roomUsers", (response: { users: User[] }) => {
    users.value = response.users;
  });
});

onBeforeUnmount(() => {
  socket.value?.disconnect();
});
</script>

<template>
  <div class="flex-1">
    <div class="header">
      <div class="flex items-center justify-center">Chat Szoba</div>
    </div>

    <div class="border-2 flex">
      <div class="px-8 py-10 flex-1 h-96 overflow-y-auto">
        <div
          class="w-full mb-2 flex"
          v-for="(chat, i) in chats"
          :key="i"
          :class="{
            'justify-end': chat.user.username === route.query.username,
            'justify-start': chat.user.username !== route.query.username,
          }"
        >
          <MessageBox :message="chat"></MessageBox>
        </div>
      </div>

      <div class="py-4 px-6 owerflow-auto bg-slate-300">
        <div class="flex items-center gap-x-2 mb-2 px-3 py-1.5 rounded-md">
          <UIcon name="i-heroicons-user-group" class="w-6 h-6 font-semibold" />
          <div class="text-base">Users</div>
        </div>
        <div
          v-for="(user, i) in users"
          :key="i"
          class="mb-2 text-base ml-2"
          :style="{ color: user.color }"
        >
          {{ user.username }}
        </div>
      </div>
    </div>

    <div class="footer">
      <TextBar @send="sendMessage"> </TextBar>
    </div>
  </div>
</template>

<style scoped>
.header,
.footer {
  flex-shrink: 0;
  padding: 10px;
  background-color: #f8f8f8;
}
</style>
