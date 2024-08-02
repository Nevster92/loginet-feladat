<script setup lang="ts">
const name = ref("");

async function onSubmit() {
  navigateTo(`/buzz.loginet.hu/chat?username=${name.value}`);
}
</script>

<template>
  <div class="flex justify-center">
    <UCard class="w-fit">
      <template #header>
        <div class="text-primary font-semibold text-center text-3xl">
          Buzz Chat
        </div>
      </template>

      <UFormGroup label="Username" name="username">
        <UInput v-model="name" @keyup.enter="onSubmit" />
      </UFormGroup>

      <UButton @click="onSubmit" size="xl" block :disabled="name == ''">
        OK
      </UButton>
    </UCard>
  </div>
</template>
