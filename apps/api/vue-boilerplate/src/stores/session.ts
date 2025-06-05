import { defineStore } from "pinia"
import API from "@/api"

export interface User {
  readonly id: string
  email: string
  name: string
  gravatar_id?: string
  gravatar?: string
  admin?: boolean
  activated?: boolean
  // Add other user properties as needed
}

export const useSessionStore = defineStore("session", {
  state: () => ({
    loggedIn: false,
    user: {} as User,
    error: null as string | null,
  }),
  getters: {
    isLoggedIn: (state) => state.loggedIn,
    currentUser: (state) => state.user,
    getErrorMessage: (state) => state.error,
  },
  actions: {
    async fetchUser() {
      try {
        // Only attempt to fetch if we have a token
        if (!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
          this.loggedIn = false
          this.user = {} as User
          return
        }

        // Use the /Session/me endpoint to check the current session
        const response = await API.get("/Session/me")

        // Check if the response has the user property
        if (response && response) {
          this.user = response
          this.loggedIn = true
          this.error = null
        } else {
          // If no user in response, user is not logged in
          this.loggedIn = false
          this.user = {} as User
          this.error = null
        }
      } catch (error: any) {
        this.loggedIn = false
        this.user = {} as User

        // Don't set error for 401 responses, as this is expected for non-logged in users
        if (error.response && error.response.status === 401) {
          this.error = null
        } else {
          this.error = error.message || "Failed to fetch user data"
        }
      }
    },
    async login(token: string, rememberToken: string, rememberMe = false) {
      if (rememberMe) {
        localStorage.setItem("token", token)
        localStorage.setItem("remember_token", rememberToken)
      } else {
        sessionStorage.setItem("token", token)
        sessionStorage.setItem("remember_token", rememberToken)
      }
      await this.fetchUser()
    },
    logout() {
      localStorage.removeItem("token")
      localStorage.removeItem("remember_token")
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("remember_token")
      this.loggedIn = false
      this.user = {} as User
    },
  },
  persist: {
    storage: localStorage,
    paths: ["user", "loggedIn"],
  },
})
