<template>
  <div>
    <template v-if="loading">
      <vue-skeleton height="304" />
      <vue-skeleton circle height="60" width="60" />
    </template>
    <template v-else-if="sessionStore.error">
      <h2>{{ sessionStore.error }}</h2>
    </template>
    <template v-else-if="sessionStore.user && sessionStore.user.email">
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="mb-4">
            <v-card-text>
              <div class="d-flex align-center mb-3">
                <v-avatar size="50" class="mr-3">
                  <v-img :src="gravatar" :alt="sessionStore.user.name" />
                </v-avatar>
                <div>
                  <h3 class="text-h5">{{ sessionStore.user.name }}</h3>
                  <router-link :to="`/users/${sessionStore.user.id}`">view my profile</router-link>
                </div>
              </div>
              <div>{{ totalCount }} micropost{{ totalCount !== 1 ? 's' : '' }}</div>
            </v-card-text>
          </v-card>

          <v-card class="mb-4">
            <v-card-text>
              <div class="d-flex justify-space-around">
                <router-link :to="`/users/${sessionStore.user.id}/following`" class="text-decoration-none">
                  <div class="text-center">
                    <div class="text-h6">{{ followingCount }}</div>
                    <div>following</div>
                  </div>
                </router-link>
                <router-link :to="`/users/${sessionStore.user.id}/followers`" class="text-decoration-none">
                  <div class="text-center">
                    <div class="text-h6">{{ followersCount }}</div>
                    <div>followers</div>
                  </div>
                </router-link>
              </div>
            </v-card-text>
          </v-card>

          <v-card>
            <v-card-text>
              <v-form @submit.prevent="handleSubmit">
                <div v-if="errors.length" class="mb-3">
                  <v-alert type="error" variant="tonal">
                    <ul class="mb-0 pl-4">
                      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                    </ul>
                  </v-alert>
                </div>
                
                <v-textarea
                  v-model="content"
                  label="Compose new micropost..."
                  rows="3"
                  class="mb-3"
                ></v-textarea>
                
                <div class="d-flex align-center">
                  <v-btn
                    type="submit"
                    color="primary"
                    :loading="submitting"
                    class="mr-3"
                  >
                    Post
                  </v-btn>
                  
                  <v-file-input
                    v-model="image"
                    accept="image/jpeg,image/gif,image/png"
                    label="Add image"
                    hide-details
                    class="flex-grow-1"
                    @update:model-value="handleImageInput"
                  />
                  <!-- <v-file-input
                    v-model="image"
                    accept="image/jpeg,image/gif,image/png"
                    label="Add image"
                    hide-details
                    class="flex-grow-1"
                  /> -->
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="8">
          <h3 class="text-h5 mb-4">Micropost Feed</h3>
          
          <template v-if="feedItems.length > 0">
            <div class="feed-list mb-4">
              <div
                v-for="item in feedItems"
                :key="item.id"
                :id="`micropost-${item.id}`"
                class="feed-item mb-3 d-flex"
              >
                <!-- Avatar -->
                <div class="avatar mr-3">
                  <img
                    :src="item.user.gravatar"
                    :alt="item.user_name"
                    class="rounded-full"
                    style="width: 40px; height: 40px;"
                  />
                </div>

                <!-- Content -->
                <div class="feed-content">
                  <div class="font-bold">
                    <router-link :to="`/users/${item.user_id}`">
                      {{ item.user_name }}
                    </router-link>
                  </div>

                  <div class="mt-2" style="white-space: normal; word-break: break-word;">
                    {{ item.content }}
                  </div>

                  <div v-if="item.image" class="mt-2">
                    <img
                      :src="item.image"
                      alt="Post image"
                      class="rounded max-w-full"
                      style="max-height: 400px;"
                    />
                  </div>

                  <div class="mt-2 text-caption text-sm text-gray-500">
                    Posted {{ item.timestamp }} ago.
                    <a
                      v-if="sessionStore.user.id === item.user.id"
                      href="#"
                      @click.prevent="removeMicropost(item.id)"
                      class="ml-2 text-red-500 hover:underline"
                    >
                      delete
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div class="text-center mt-4">
              <v-pagination
                v-model="page"
                :length="Math.ceil(totalCount / 10)"
                @update:model-value="handlePageChange"
              ></v-pagination>
            </div>
          </template>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-card class="text-center pa-6 mb-6">
        <h1 class="text-h3 mb-4">Welcome to the Sample App</h1>
        <h2 class="text-h5 mb-6">
          This is the home page for the 
          <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">Vue.js Tutorial</a> 
          sample application.
        </h2>
        <v-btn to="/signup" color="primary" size="large">Sign up now!</v-btn>
      </v-card>
      
      <div class="text-center">
        <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
          <!-- <v-img src="/vue.svg" alt="Vue.js logo" width="180" height="38" class="mx-auto" /> -->
          <svg class="logo" viewBox="0 0 128 128" width="24" height="24" data-v-107e4060=""><path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z" data-v-107e4060=""></path><path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z" data-v-107e4060=""></path></svg>
        </a>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { useSessionStore } from '../stores/session'
import micropostApi, { Micropost } from '../api/micropostApi'
import VueSkeleton from 'vue-loading-skeleton'

const sessionStore = useSessionStore()
const toast = useToast()

const loading = ref(true)
const page = ref(1)
const feedItems = ref<Micropost[]>([])
const totalCount = ref(1)
const followingCount = ref(0)
const followersCount = ref(0)
const micropostCount = ref(0)
const gravatar = ref('')
const content = ref('')
const image = ref<File | null>(null)
const imageName = ref('')
const errors = ref<string[]>([])
const submitting = ref(false)

const isLoggedIn = computed(() => sessionStore.loggedIn)
const user = computed(() => sessionStore.user)
const userId = computed(() => sessionStore.user ? sessionStore.user.id : null)

const setFeeds = async () => {
  try {
    const response = await micropostApi.getAll({ page: page.value })
    if (response.feed_items) {
      feedItems.value = response.feed_items
      totalCount.value = response.total_count
      followingCount.value = response.following
      followersCount.value = response.followers
      micropostCount.value = response.micropost
      gravatar.value = response.gravatar
    } else {
      feedItems.value = []
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  try {
    // Only try to fetch user if there's a token
    if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
      await sessionStore.fetchUser();
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    // Don't show error toast for auth errors
  } finally {
    // Only fetch feeds if logged in
    if (sessionStore.loggedIn) {
      await setFeeds();
    }
    loading.value = false;
  }
});

watch(() => page.value, setFeeds)
watch(isLoggedIn, () => {
  if (isLoggedIn.value) {
    setFeeds();
  } else {
    feedItems.value = [];
  }
})

const handlePageChange = (newPage: number) => {
  page.value = newPage
}

const handleImageInput = (file: File | null) => {
  if (file) {
    const sizeInMB = file.size / 1024 / 1024
    if (sizeInMB > 512) {
      toast.error('Maximum file size is 512MB. Please choose a smaller file.')
      image.value = null
    } else {
      image.value = file
      imageName.value = file.name
    }
  }
}


const handleSubmit = async () => {
  submitting.value = true
  errors.value = []
  
  try {
    const formData = new FormData()
    formData.append('micropost[content]', content.value)
    // formData.append('micropost[image]', image.value, image.value.name)
    
    if (image.value) {
      formData.append('micropost[image]', image.value, imageName.value)
    }
    
    const response = await micropostApi.create(formData)
    
    if (response.content) {
      toast.success("Micropost created!")
      content.value = ''
      image.value = null
      errors.value = []
      await setFeeds()
    }
    
    if (response.error) {
      toast.error(response.error)
    }
  } catch (error) {
    toast.error(error.response.data.error)
  } finally {
    submitting.value = false
  }
}

const removeMicropost = async (micropostId: number) => {
  const confirmed = window.confirm('Are you sure?')
  if (confirmed) {
    try {
      const response = await micropostApi.remove(micropostId)
      if (response === "" || response === undefined) {
        toast.success("Micropost deleted")
        await setFeeds()
      }
    } catch (error) {
      toast.error('Failed to delete micropost')
    }
  }
}
</script>
