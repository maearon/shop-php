<template>
    <div>
      <h1>Reset password</h1>
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <form @submit.prevent="handleSubmit">
            <div v-if="errorMessage.length > 0" class="alert alert-danger">
              <ul>
                <li v-for="(error, index) in errorMessage" :key="index">
                  {{ error }}
                </li>
              </ul>
            </div>
  
            <input type="hidden" name="email" :value="email" />
            
            <div class="form-group">
              <label for="user_password">Password</label>
              <input 
                class="form-control" 
                type="password" 
                v-model="password"
                id="user_password"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="user_password_confirmation">Confirmation</label>
              <input 
                class="form-control" 
                type="password" 
                v-model="passwordConfirmation"
                id="user_password_confirmation"
                required
              />
            </div>
            
            <button 
              type="submit" 
              class="btn btn-primary" 
              :disabled="isSubmitting"
              ref="submitButton"
            >
              Update password
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import passwordResetApi from '../api/passwordResetApi';
  
  const router = useRouter();
  const route = useRoute();
  const toast = useToast();
  
  const resetToken = ref('');
  const email = ref('');
  const password = ref('');
  const passwordConfirmation = ref('');
  const errorMessage = ref<string[]>([]);
  const isSubmitting = ref(false);
  const submitButton = ref<HTMLButtonElement | null>(null);
  const showAlert = ref(false);
  
  onMounted(() => {
    // Get reset token and email from route params
    resetToken.value = route.params.token as string;
    email.value = route.params.email ? decodeURIComponent(route.params.email as string) : '';
    
    if (!resetToken.value || !email.value) {
      toast.error('Invalid password reset link');
      router.push('/password_resets/new');
    }
  });
  
  const handleSubmit = async () => {
    isSubmitting.value = true;
    
    try {
      const response = await passwordResetApi.update(resetToken.value, {
        email: email.value,
        user: {
          password: password.value,
          password_confirmation: passwordConfirmation.value,
        }
      });
      
      submitButton.value?.blur();
      
      if (response.flash?.[0] === "danger") {
        toast.error(response.flash[1]);
      } else if (response.error) {
        errorMessage.value = response.error;
        showAlert.value = true;
      } else if (response.flash?.[0] === "success") {
        toast.success('The password reset successfully, please try log in again');
        router.push("/login");
      } else {
        toast.success('The password reset successfully, please try log in again');
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to reset password. Please try again.');
    } finally {
      isSubmitting.value = false;
    }
  };
  </script>
  