<template>
    <div style="text-align: center; margin-top: 20px">
      <h1>Activating your account...</h1>
      <p>Please wait while we process your activation.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import accountActivationApi from '../api/accountActivationApi';
  import { ref, onMounted } from 'vue';
  
  const router = useRouter();
  const route = useRoute();
  const toast = useToast();
  
  const activation_token = ref<string | null>(null);
  const email = ref<string | null>(null);
  
  onMounted(async () => {
    activation_token.value = route.params.token as string;
    email.value = route.params.email ? decodeURIComponent(route.params.email as string) : null;
  
    if (!activation_token.value || !email.value) {
      toast.error("Invalid activation link");
      router.push("/");
      return;
    }
  
    try {
      await accountActivationApi.update(activation_token.value, email.value);
      toast.success("The account has been activated. Please log in.");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.error("Activation Error:", error);
      toast.error("Account activation failed. Please try again.");
      router.push("/");
    }
  });
  </script>
  