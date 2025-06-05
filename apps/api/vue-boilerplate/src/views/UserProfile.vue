<template>
  <div class="user-profile">
    <template v-if="initialLoading">
      <vue-skeleton height="200" />
      <vue-skeleton circle height="60" width="60" />
    </template>
    <!-- <template v-if="reloading">
      <v-progress-linear indeterminate />
    </template> -->
    <template v-else-if="error">
      <v-alert type="error" variant="tonal">{{ error }}</v-alert>
    </template>
    <template v-else>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="mb-4">
            <v-card-text>
              <div class="d-flex align-center mb-3">
                <v-avatar size="80" class="mr-3">
                  <v-img :src="`https://secure.gravatar.com/avatar/${user.gravatar_id}?s=80`" :alt="user.name" />
                </v-avatar>
                <div>
                  <h3 class="text-h4">{{ user.name }}</h3>
                </div>
              </div>
              <div>{{ totalCount }} micropost{{ totalCount > 1 ? 's' : '' }}</div>
            </v-card-text>
          </v-card>

          <v-card>
            <v-card-text>
              <div class="d-flex justify-space-around">
                <router-link :to="`/users/${user.id}/following`" class="text-decoration-none">
                  <div class="text-center">
                    <div class="text-h6">{{ user.following }}</div>
                    <div>following</div>
                  </div>
                </router-link>
                <router-link :to="`/users/${user.id}/followers`" class="text-decoration-none">
                  <div class="text-center">
                    <div class="text-h6">{{ user.followers }}</div>
                    <div>followers</div>
                  </div>
                </router-link>
              </div>

              <div v-if="sessionStore.user.id !== user.id" class="text-center mt-4">
                <v-btn
                  v-if="user.current_user_following_user"
                  color="error"
                  variant="outlined"
                  @click="unfollowUser"
                  :loading="followLoading"
                >
                  Unfollow
                </v-btn>
                <v-btn
                  v-else
                  color="primary"
                  @click="followUser"
                  :loading="followLoading"
                >
                  Follow
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="8">
          <h3 class="text-h5 mb-4">Microposts</h3>

          <template v-if="microposts.length > 0">
            <v-list class="mb-4">
              <v-list-item
                v-for="item in microposts"
                :key="item.id"
                :id="`micropost-${item.id}`"
                class="mb-3"
              >
                <template v-slot:prepend>
                  <v-avatar size="40" class="mr-3">
                    <v-img
                      :src="`https://secure.gravatar.com/avatar/${item.gravatar_id}?s=${item.size}`"
                      :alt="item.user_name"
                    />
                  </v-avatar>
                </template>

                <v-list-item-title>
                  <router-link :to="`/users/${item.user_id}`">{{ item.user_name }}</router-link>
                </v-list-item-title>

                <v-list-item-subtitle>
                  <div class="mt-2">{{ item.content }}</div>
                  <v-img
                    v-if="item.image"
                    :src="item.image"
                    alt="Post image"
                    class="mt-2"
                    max-height="400"
                    contain
                  ></v-img>
                  <div class="mt-2 text-caption">
                    Posted {{ item.timestamp }} ago.
                    <a
                      v-if="sessionStore.user.id === item.user_id"
                      href="#"
                      @click.prevent="removeMicropost(item.id)"
                      class="ml-2"
                    >
                      delete
                    </a>
                  </div>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <div class="text-center">
              <v-pagination
                v-model="page"
                :length="Math.ceil(totalCount / 10)"
                @update:model-value="handlePageChange"
              ></v-pagination>
            </div>
          </template>
          <v-alert v-else type="info" variant="tonal">
            No microposts found
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
import { useSessionStore } from '../stores/session'
import micropostApi, { Micropost } from '../api/micropostApi'
import relationshipApi from '../api/relationshipApi'
import userApi, { UserShow } from '../api/userApi'
import VueSkeleton from 'vue-loading-skeleton'

const route = useRoute()
const toast = useToast()
const sessionStore = useSessionStore()

const initialLoading = ref(true)
const reloading = ref(false)
const error = ref('')
const user = ref<UserShow | null>(null)
const followLoading = ref(false)
const page = ref(1)
const microposts = ref<Micropost[]>([])
const totalCount = ref(0)
const userId = ref<string>('')

onMounted(() => {
  console.log('[onMounted] route id:', route.params.id)
  userId.value = route.params.id as string
  setWall(true)  // isInitial = true
})

const setWall = async (isInitial = false) => {
  console.log('[setWall] start', { userId: userId.value, page: page.value })
  if (isInitial) {
    initialLoading.value = true
  } else {
    reloading.value = true
  }
  error.value = ''
  try {
    const response = await userApi.show(userId.value, { page: page.value });
    console.log('[setWall] response:', response)

    if (response.microposts) {
      user.value = response.user
      microposts.value = response.microposts
      totalCount.value = response.total_count
      console.log('[setWall] user:', response.user)
      console.log('[setWall] microposts:', response.microposts.length)
    } else {
      microposts.value = []
      totalCount.value = 0
      console.warn('[setWall] No microposts found in response.')
    }
  } catch (err) {
    error.value = 'Failed to load microposts'
    console.error('[setWall] Error loading user/microposts:', err)
    toast.error('Failed to load microposts')
  } finally {
    initialLoading.value = false
    reloading.value = false
    followLoading.value = false
    console.log('[setWall] end')
  }
}

const handlePageChange = (newPage: number) => {
  page.value = newPage
}

const followUser = async () => {
  followLoading.value = true
  try {
    const response = await relationshipApi.create({ FollowedId: userId.value });
    if (response.message) {
      await setWall(false) // isInitial = false
    }
  } catch (err) {
    toast.error('Failed to follow user')
  } finally {
    
  }
}

const unfollowUser = async () => {
  followLoading.value = true
  try {
    const response = await relationshipApi.destroy(userId.value);
    if (response === "" || response === undefined) {
      await setWall(false) // isInitial = false
    }
  } catch (err) {
    toast.error('Failed to unfollow user')
  } finally {
    
  }
}

const removeMicropost = async (micropostId: number) => {
  const confirmed = window.confirm('Are you sure?')
  if (confirmed) {
    try {
      const response = await micropostApi.remove(micropostId)
      if (response === "" || response === undefined) {
        toast.success("Micropost deleted")
        await setWall()
      }
    } catch (error) {
      toast.error('Failed to delete micropost')
    }
  }
}

watch(() => route.params.id, (newId) => {
  console.log('[watch route.params.id]', newId)
  userId.value = newId as string
  setWall()
})
watch(() => page.value, (newPage) => {
  console.log('[watch page]', newPage)
  setWall()
})
</script>
