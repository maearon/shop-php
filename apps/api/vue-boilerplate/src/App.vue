<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <router-view />
        <Footer />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSessionStore } from './stores/session'
import Header from './layouts/Header.vue'
import Footer from './layouts/Footer.vue'

const sessionStore = useSessionStore()

onMounted(async () => {
  await sessionStore.fetchUser()
})
</script>

<style>
.App {
  font-family: var(--font-geist-sans), sans-serif;
}
</style>
