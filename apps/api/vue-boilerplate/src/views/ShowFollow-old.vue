<template>
    <div>
      <div v-if="loading" class="text-center py-8">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-else>
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="mb-4">
              <v-card-text>
                <div class="d-flex align-center mb-3">
                  <v-avatar size="50" class="mr-3">
                    <v-img :src="`https://secure.gravatar.com/avatar/${userData.gravatar}?s=50`" :alt="userData.name" />
                  </v-avatar>
                  <div>
                    <h3 class="text-h5">{{ userData.name }}</h3>
                    <router-link :to="`/users/${userId}`">view my profile</router-link>
                  </div>
                </div>
                <div>{{ userData.micropost }} micropost{{ userData.micropost !== 1 ? 's' : '' }}</div>
              </v-card-text>
            </v-card>
  
            <v-card>
              <v-card-text>
                <div class="d-flex justify-space-around">
                  <router-link :to="`/users/${userId}/following`" class="text-decoration-none">
                    <div class="text-center">
                      <div class="text-h6">{{ userData.following }}</div>
                      <div>following</div>
                    </div>
                  </router-link>
                  <router-link :to="`/users/${userId}/followers`" class="text-decoration-none">
                    <div class="text-center">
                      <div class="text-h6">{{ userData.followers }}</div>
                      <div>followers</div>
                    </div>
                  </router-link>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
  
          <v-col cols="12" md="8">
            <h3 class="text-h5 mb-4">{{ type === 'following' ? 'Following' : 'Followers' }}</h3>
            
            <div v-if="users.length === 0" class="text-center py-4">
              <p>No {{ type === 'following' ? 'following' : 'followers' }} yet.</p>
            </div>
            
            <v-list v-else>
              <v-list-item v-for="user in users" :key="user.id" class="mb-2">
                <template v-slot:prepend>
                  <v-avatar size="40" class="mr-3">
                    <v-img :src="`https://secure.gravatar.com/avatar/${user.gravatar_id}?s=${user.size}`" :alt="user.name" />
                  </v-avatar>
                </template>
                
                <v-list-item-title>
                  <router-link :to="`/users/${user.id}`">{{ user.name }}</router-link>
                </v-list-item-title>
              </v-list-item>
            </v-list>
            
            <div v-if="totalCount > 5" class="text-center mt-4">
              <v-pagination
                v-model="page"
                :length="Math.ceil(totalCount / 5)"
                @update:model-value="handlePageChange"
              ></v-pagination>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { useToast } from 'vue-toastification'
  import userApi, { UserFollow, IUserFollow } from '../api/userApi'
  
  const props = defineProps<{
    userId: string;
    type: 'following' | 'followers';
  }>()
  
  const toast = useToast()
  
  const loading = ref(true)
  const page = ref(1)
  const users = ref<UserFollow[]>([])
  const totalCount = ref(0)
  const userData = ref<IUserFollow>({
    id: '',
    name: '',
    followers: 0,
    following: 0,
    gravatar: '',
    micropost: 0
  })
  
  const isMounted = ref(false)
  
  const fetchUsers = async () => {
    loading.value = true
    try {
      const response = await userApi.follow(props.userId, page.value, props.type)
      users.value = response.users
      totalCount.value = response.total_count
      userData.value = response.user
    } catch (error) {
      console.error(error)
      toast.error(`Failed to fetch ${props.type}`)
    } finally {
      loading.value = false
    }
  }
  
  onMounted(() => {
    isMounted.value = true
    fetchUsers()
  })
  
  watch(() => page.value, () => {
    if (isMounted.value) {
      fetchUsers()
    }
  })
  watch(() => props.type, () => {
    if (isMounted.value) {
      page.value = 1
      fetchUsers()
    }
  })
  watch(() => props.userId, () => {
    if (isMounted.value) {
      page.value = 1
      fetchUsers()
    }
  })
  
  const handlePageChange = (newPage: number) => {
    page.value = newPage
  }
  </script>
  