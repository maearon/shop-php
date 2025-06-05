<template>
  <div class="container py-4">
    <h1 class="text-h4 mb-6">All users</h1>
    
    <div v-if="loading" class="text-center py-8">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    
    <div v-else>
      <div v-if="users.length === 0" class="text-center py-4">
        <p>No users found.</p>
      </div>
      
      <v-list v-else>
        <v-list-item v-for="user in users" :key="user.id" class="mb-2">
          <template v-slot:prepend>
            <v-avatar size="40" class="mr-3">
              <v-img
                :src="user.avatarUrl || `https://secure.gravatar.com/avatar/${user.gravatar_id}?s=50`"
                :alt="user.name || user.displayName"
                @error="onAvatarError(user.id)"
              />
            </v-avatar>
          </template>
          
          <v-list-item-title>
            <router-link :to="`/users/${user.id}`">{{ user.name || user.displayName }}</router-link>
          </v-list-item-title>
          
          <template v-slot:append v-if="sessionStore.user && sessionStore.user.admin && sessionStore.user.id !== user.id">
            <v-btn
              color="error"
              variant="text"
              size="small"
              @click="confirmDelete(user.id, user.name)"
            >
              delete
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
      
      <div v-if="totalCount > 10" class="text-center mt-4">
        <v-pagination
          v-model="page"
          :length="Math.ceil(totalCount / 10)"
          @update:model-value="handlePageChange"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { useSessionStore } from '../stores/session'
import userApi, { User } from '../api/userApi'
import { getAvatarUrl } from '@/utils/getAvatarUrl'

const imageSources = ref<Record<string, string>>({})

const onAvatarError = (userId: string) => {
  const user = users.value.find(u => u.id === userId)
  if (user) {
    imageSources.value[userId] = getAvatarUrl(user)
  }
}

// interface User {
//   id: string;
//   name?: string;
//   displayName: string;
//   email: string;
//   avatarUrl?: string;
//   size: number;
// }

const sessionStore = useSessionStore()
const toast = useToast()

const loading = ref(true)
const page = ref(1)
const users = ref<User[]>([])
const totalCount = ref(0)
const confirmed = ref(false)
const dialog = ref(false)
const userIdToDelete = ref('')
const userNameToDelete = ref('')

const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await userApi.index({ page: page.value })
    users.value = response.users
    totalCount.value = response.totalUsers
  } catch (error) {
    console.error(error)
    toast.error('Failed to fetch users')
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)

watch(() => page.value, fetchUsers)

const handlePageChange = (newPage: number) => {
  page.value = newPage
}

const confirmDelete = async (userId: string, userName: string) => {
  userIdToDelete.value = userId
  userNameToDelete.value = userName
  dialog.value = true
}

// const deleteUser = async () => {
//   dialog.value = false
//   try {
//     const response = await userApi.destroy(userIdToDelete.value)
//     if (response.flash) {
//       toast.success(response.flash[1])
//       fetchUsers()
//     }
//   } catch (error) {
//     console.error(error)
//     toast.error('Failed to delete user')
//   }
// }
</script>
