<template>
    <div class="followers-page">
      <template v-if="loading">
        <vue-skeleton height="200" />
        <vue-skeleton count={10} />
      </template>
      <template v-else-if="error">
        <v-alert type="error" variant="tonal">{{ error }}</v-alert>
      </template>
      <template v-else>
        <h1 class="text-h4 mb-4">{{ user.name }}</h1>
        
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="mb-4">
              <v-card-text>
                <div class="d-flex align-center mb-3">
                  <v-avatar size="50" class="mr-3">
                    <v-img :src="`https://secure.gravatar.com/avatar/${user.gravatar}?s=50`" :alt="user.name" />
                  </v-avatar>
                  <div>
                    <router-link :to="`/users/${user.id}`">view my profile</router-link>
                  </div>
                </div>
                <div>{{ user.micropostCount }} micropost{{ user.micropostCount !== 1 ? 's' : '' }}</div>
              </v-card-text>
            </v-card>
  
            <v-card>
              <v-card-text>
                <div class="d-flex justify-space-around">
                  <router-link :to="`/users/${user.id}/following`" class="text-decoration-none">
                    <div class="text-center">
                      <div class="text-h6">{{ user.followingCount }}</div>
                      <div>following</div>
                    </div>
                  </router-link>
                  <router-link :to="`/users/${user.id}/followers`" class="text-decoration-none">
                    <div class="text-center">
                      <div class="text-h6">{{ user.followersCount }}</div>
                      <div>followers</div>
                    </div>
                  </router-link>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
  
          <v-col cols="12" md="8">
            <h3 class="text-h5 mb-4">Followers</h3>
            
            <template v-if="followers.length > 0">
              <v-list>
                <v-list-item
                  v-for="user in followers"
                  :key="user.id"
                  :to="`/users/${user.id}`"
                >
                  <template v-slot:prepend>
                    <v-avatar size="40" class="mr-3">
                      <v-img
                        :src="`https://secure.gravatar.com/avatar/${user.gravatar}?s=50`"
                        :alt="user.name"
                      />
                    </v-avatar>
                  </template>
                  
                  <v-list-item-title>{{ user.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
              
              <div class="text-center mt-4">
                <v-pagination
                  v-model="page"
                  :length="Math.ceil(totalCount / 10)"
                  @update:model-value="handlePageChange"
                ></v-pagination>
              </div>
            </template>
            <v-alert v-else type="info" variant="tonal">
              No followers found
            </v-alert>
          </v-col>
        </v-row>
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useToast } from 'vue-toastification'
  import api from '../api'
  import VueSkeleton from 'vue-loading-skeleton'
  
  const route = useRoute()
  const toast = useToast()
  
  const loading = ref(true)
  const error = ref('')
  const user = ref({
    id: '',
    name: '',
    gravatar: '',
    micropostCount: 0,
    followingCount: 0,
    followersCount: 0
  })
  const followers = ref([])
  const page = ref(1)
  const totalCount = ref(0)
  
  const userId = ref('')
  
  const fetchFollowers = async () => {
    try {
      loading.value = true
      const response = await api.get(`/users/${userId.value}/followers`, {
        params: { page: page.value }
      })
      user.value = response.user
      followers.value = response.followers
      totalCount.value = response.total_count
    } catch (err) {
      error.value = 'Failed to load followers'
    } finally {
      loading.value = false
    }
  }
  
  const handlePageChange = (newPage: number) => {
    page.value = newPage
  }
  
  onMounted(() => {
    userId.value = route.params.id as string;
    fetchFollowers();
  })
  watch(() => route.params.id, (newId) => {
    userId.value = newId as string;
    page.value = 1;
    fetchFollowers();
  })
  watch(() => page.value, fetchFollowers)
  </script>
  