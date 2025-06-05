<template>
    <v-app-bar color="primary" dark app>
      <v-container class="d-flex align-center">
        <v-app-bar-title>
          <router-link to="/" class="text-decoration-none text-white">Sample App</router-link>
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn to="/" text>Home</v-btn>
        <template v-if="sessionStore.loggedIn">
          <v-btn to="/users" text>Users</v-btn>
          <v-menu offset-y>
            <template v-slot:activator="{ props }">
              <v-btn text v-bind="props">Account</v-btn>
            </template>
            <v-list>
              <v-list-item :to="`/users/${sessionStore.user.id}`">
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>
              <v-list-item :to="`/users/${sessionStore.user.id}/edit`">
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="logout">
                <v-list-item-title>Log out</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-else>
          <v-btn to="/login" text>Log in</v-btn>
        </template>
      </v-container>
    </v-app-bar>
  </template>
  
  <script setup lang="ts">
  import { useSessionStore } from '../stores/session'
  import { useToast } from 'vue-toastification'
  import { useRouter } from 'vue-router';
  import api from '../api';
  
  const sessionStore = useSessionStore()
  const toast = useToast()
  const router = useRouter();
  
  const logout = async () => {
    try {
      await api.delete('/Auth/logout')
      sessionStore.logout()
      toast.success('Logged out successfully')
      router.push('/')
    } catch (error) {
      toast.error('Failed to log out')
    }
  }
  </script>
  