<template>
    <div>
      <h1>Forgot password</h1>
  
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="password_reset_email">Email</label>
              <input 
                class="form-control" 
                type="email" 
                v-model="email"
                id="password_reset_email"
                required
              />
            </div>
  
            <button 
              type="submit" 
              class="btn btn-primary" 
              :disabled="isSubmitting"
              ref="submitButton"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import passwordResetApi from '../api/passwordResetApi';
  
  const router = useRouter();
  const toast = useToast();
  
  const email = ref('');
  const isSubmitting = ref(false);
  const submitButton = ref<HTMLButtonElement | null>(null);
  
  const handleSubmit = async () => {
    isSubmitting.value = true;
    
    try {
      await passwordResetApi.create({
        password_reset: {
          email: email.value,
        }
      });
      
      submitButton.value?.blur();
      toast.success('The password reset email has been sent, please check your email');
      email.value = '';
    } catch (error) {
      console.error(error);
      toast.error('Failed to send password reset email. Please try again.');
    } finally {
      isSubmitting.value = false;
    }
  };
  </script>
  