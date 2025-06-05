<template>
    <div>
      <h1>Resend Activation Email</h1>
  
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <form @submit.prevent="handleSubmit">
            <div v-if="Object.keys(errors).length > 0" class="alert alert-danger">
              <ul>
                <li v-for="(errorList, field) in errors" :key="field">
                  <span v-for="(error, index) in errorList" :key="index">
                    {{ field }} {{ error }}
                  </span>
                </li>
              </ul>
            </div>
  
            <div class="form-group">
              <label for="user_email">Email</label>
              <input
                class="form-control"
                type="email"
                v-model="email"
                id="user_email"
                required
              />
            </div>
  
            <button 
              type="submit" 
              class="btn btn-primary" 
              :disabled="isSubmitting"
              ref="submitButton"
            >
              Resend activation email
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import accountActivationApi from '../api/accountActivationApi';
  
  const router = useRouter();
  const toast = useToast();
  
  const email = ref('');
  const errors = ref<Record<string, string[]>>({});
  const isSubmitting = ref(false);
  const submitButton = ref<HTMLButtonElement | null>(null);
  
  const hasErrors = computed(() => Object.keys(errors.value).length > 0);
  
  const handleSubmit = async () => {
    isSubmitting.value = true;
    
    try {
      await accountActivationApi.create({
        resend_activation_email: {
          email: email.value,
        }
      });
      
      // Clear form and errors
      submitButton.value?.blur();
      email.value = '';
      errors.value = {};
      
      // Show success message
      toast.success('The activation email has been sent again, please check your email');
    } catch (error: any) {
      console.error(error);
      if (error.response?.data?.errors) {
        errors.value = error.response.data.errors;
      } else {
        toast.error('Failed to send activation email. Please try again.');
      }
    } finally {
      isSubmitting.value = false;
    }
  };
  </script>
  