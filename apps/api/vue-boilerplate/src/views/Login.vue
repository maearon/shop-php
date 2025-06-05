<template>
    <div class="login-page">
      <h1 class="text-h4 text-center mb-6">Log in</h1>
      
      <v-card max-width="500" class="mx-auto">
        <v-card-text>
          <v-form @submit.prevent="handleSubmit">
            <div v-if="error" class="mb-4">
              <v-alert type="error" variant="tonal">{{ error }}</v-alert>
            </div>
            
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              required
              :error-messages="emailError"
              @input="resetErrors"
            ></v-text-field>
            
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
              :error-messages="passwordError"
              @input="resetErrors"
            ></v-text-field>
            
            <v-checkbox
              v-model="rememberMe"
              label="Remember me on this computer"
            ></v-checkbox>
            
            <v-btn
              type="submit"
              color="primary"
              block
              :loading="loading"
              class="mt-4"
            >
              Log in
            </v-btn>
            
            <div class="mt-4 text-center">
              New user? <router-link to="/signup">Sign up now!</router-link>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useToast } from 'vue-toastification'
  import { useSessionStore } from '../stores/session'
  import api from '../api'
  
  const router = useRouter()
  const toast = useToast()
  const sessionStore = useSessionStore()
  
  const email = ref('')
  const password = ref('')
  const rememberMe = ref(true)
  const loading = ref(false)
  const error = ref('')
  const emailError = ref('')
  const passwordError = ref('')
  
  const resetErrors = () => {
    error.value = ''
    emailError.value = ''
    passwordError.value = ''
  }
  
  const handleSubmit = async () => {
    resetErrors()
    loading.value = true
  
    let serverError: any = null; // Define serverError outside the try block
  
    try {
      const response = await api.post('/auth/login', {
        // session: {
          email: email.value,
          password: password.value,
          remember_me: rememberMe.value
        // }
      })
      
      const { token
              // remember_token 
            } = response
      
      if (rememberMe.value) {
        localStorage.setItem('token', token)
        localStorage.setItem('remember_token', token)
      } else {
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('remember_token', token)
      }
      
      await sessionStore.fetchUser()
      toast.success('Logged in successfully')
      router.push('/')
    } catch (err: any) {
      if (err.response && err.response) {
        serverError = err.response.error; // Assign to the outer serverError
  
        if (typeof serverError === 'string') {
          error.value = serverError
        } else if (serverError) {
          if (serverError.email) emailError.value = serverError.email
          if (serverError.password) passwordError.value = serverError.password
        }
      } else {
        error.value = 'Login failed. Please try again.'
      }
    } finally {
      loading.value = false
    }
  }
  </script>
  