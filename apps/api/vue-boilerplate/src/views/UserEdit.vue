<template>
  <div class="container py-4">
    <h1 class="text-h4 mb-6">Update your profile</h1>

    <div v-if="loading" class="text-center py-8">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="mb-4">
            <v-card-text>
              <div class="d-flex flex-column align-center">
                <v-avatar size="80" class="mb-3">
                  <v-img :src="`${gravatar}`" :alt="user.name" />
                </v-avatar>
                <h3 class="text-h5">{{ user.name }}</h3>
                <p class="text-body-2 mt-2">
                  <a href="https://gravatar.com/emails" target="_blank" rel="noopener noreferrer">change</a>
                </p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="8">
          <v-card>
            <v-card-text>
              <v-form @submit.prevent="handleSubmit">
                <div v-if="errors.length" class="mb-4">
                  <v-alert type="error" variant="tonal">
                    <ul class="mb-0 pl-4">
                      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                    </ul>
                  </v-alert>
                </div>

                <v-text-field
                  v-model="formData.name"
                  label="Name"
                  required
                  class="mb-4"
                ></v-text-field>

                <v-text-field
                  v-model="formData.email"
                  label="Email"
                  type="email"
                  required
                  class="mb-4"
                ></v-text-field>

                <v-text-field
                  v-model="formData.password"
                  label="Password"
                  type="password"
                  class="mb-4"
                ></v-text-field>

                <v-text-field
                  v-model="formData.password_confirmation"
                  label="Confirm Password"
                  type="password"
                  class="mb-6"
                ></v-text-field>

                <v-btn
                  type="submit"
                  color="primary"
                  :loading="submitting"
                  class="mr-3"
                >
                  Save changes
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter, useRoute } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import userApi from '../api/userApi'

interface UserData {
  name: string
  email: string
}

interface UpdateFormData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const toast = useToast()
const router = useRouter()
const route = useRoute()
const userId = route.params.id as string
const loading = ref(true)
const submitting = ref(false)
const user = ref<UserData>({
  name: '',
  email: ''
})
const gravatar = ref('')
const errors = ref<string[]>([])

const formData = ref<UpdateFormData>({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const sessionStore = useSessionStore()

const fetchUserData = async () => {
  loading.value = true
  try {
    if (sessionStore.currentUser.id === userId) {
      // Use local user from Pinia if it's yourself
      const data = sessionStore.currentUser
      user.value = { name: data.name, email: data.email }
      gravatar.value = data.gravatar || ''
      // import { Md5 } from 'ts-md5';

// export function gravatarUrl(email?: string, size = 80): string {
//   const safeEmail = email?.trim().toLowerCase() || 'test@example.com';
//   const hash = Md5.hashStr(safeEmail);
//   return `https://secure.gravatar.com/avatar/${hash}?s=${size}`;
// }

      formData.value.name = data.name
      formData.value.email = data.email
    } else {
      const data = await userApi.edit(userId)
      user.value = data.user
      gravatar.value = data.gravatar
      formData.value.name = data.user.name
      formData.value.email = data.user.email
    }
  } catch (error) {
    console.error(error)
    toast.error('Failed to fetch user data')
    router.push('/')
  } finally {
    loading.value = false
  }
}

onMounted(fetchUserData)

const handleSubmit = async () => {
  submitting.value = true
  errors.value = []
  try {
    // Gọi API update user
    const response = await userApi.update(userId, formData.value)

    if (response.message) {
      // Nếu có thông báo thành công
      toast.success(response.message)
      
      // Cập nhật avatar nếu có avatar từ hệ thống uploadThing
      // if (response.avatarUrl) {
      //   gravatar.value = response.avatarUrl
      // }
      
      // Điều hướng về trang profile của user
      // router.push(`/users/${userId}`)
    }

    if (response.error) {
      errors.value = Array.isArray(response.error) ? response.error : [response.error]
    }
  } catch (error: any) {
    console.error(error)
    if (error.response?.data?.errors) {
      const errorData = error.response.data.errors
      const errorMessages: string[] = []
      Object.keys(errorData).forEach(key => {
        errorData[key].forEach((message: string) => {
          errorMessages.push(`${key} ${message}`)
        })
      })
      errors.value = errorMessages
    } else {
      toast.error('Failed to update profile')
    }
  } finally {
    submitting.value = false
  }
}

</script>
