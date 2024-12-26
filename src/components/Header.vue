<script setup>
import {RouterLink} from "vue-router";
import IconAccount from "@/components/icons/IconAccount.vue";
</script>

<template>
  <header class="h-[64px] flex justify-end">
    <nav>
      <RouterLink to="/" class="block p-6">
        <IconAccount />
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>

</style>