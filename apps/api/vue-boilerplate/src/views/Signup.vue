<template>
  <div>
    <h1>Sign up</h1>

    <div class="row">
      <div class="col-md-6 offset-md-3">
        <form @submit.prevent="handleSubmit">
          <div v-if="errorMessage.length > 0" class="alert alert-danger">
            <ul>
              <li v-for="(error, index) in errorMessage" :key="index">
                {{ error }}
              </li>
            </ul>
          </div>

          <div class="mb-3">
            <label for="user_name" class="form-label">Name</label>
            <input
              class="form-control"
              type="text"
              v-model="name"
              id="user_name"
              autocomplete="off"
              required
            />
          </div>

          <div class="mb-3">
            <label for="user_email" class="form-label">Email</label>
            <input
              class="form-control"
              type="email"
              v-model="email"
              id="user_email"
              required
            />
          </div>

          <div class="mb-3">
            <label for="user_password" class="form-label">Password</label>
            <input
              class="form-control"
              type="password"
              v-model="password"
              id="user_password"
              required
            />
          </div>

          <div class="mb-3">
            <label for="user_password_confirmation" class="form-label">Confirmation</label>
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
            Create my account
          </button>
        </form>
      </div>
    </div>
    <br />
    <div class="text-center">
      <router-link to="/account_activations/new" class="btn btn-success">
        Resend activation email
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import userApi from '../api/userApi';

const router = useRouter();
const toast = useToast();

const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const errorMessage = ref<string[]>([]);
const isSubmitting = ref(false);
const submitButton = ref<HTMLButtonElement | null>(null);

const handleSubmit = async () => {
  isSubmitting.value = true;
  errorMessage.value = []; // Initialize errorMessage here

  try {
    const response = await userApi.create({
      user: {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value
      }
    });
    
    submitButton.value?.blur();
    
    if (response.user) {
      //errorMessage.value = []; // No need to clear here, already initialized above
      
      if (response.flash) {
        toast.success(response.flash[1]);
      }
      
      router.push("/");
    }
    
    if (response.error) {
      errorMessage.value = response.error;
    }
  } catch (error) {
    console.error(error);
    toast.error('Failed to create account. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>
