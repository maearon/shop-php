import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Signup from "../views/Signup.vue"
import About from "../views/About.vue"
import Contact from "../views/Contact.vue"
import UserProfile from "../views/UserProfile.vue"
import Users from "../views/Users.vue"
import UserEdit from "../views/UserEdit.vue"
import ShowFollow from "../views/ShowFollow.vue"
import NotFound from "../views/NotFound.vue"
import PasswordResetsNew from "../views/PasswordResetsNew.vue"
import PasswordResets from "../views/PasswordResets.vue"
import AccountActivations from "../views/AccountActivations.vue"
import AccountActivationsNew from "../views/AccountActivationsNew.vue"
import { useSessionStore } from "../stores/session"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/users/:id",
    name: "UserProfile",
    component: UserProfile,
    props: true,
  },
  {
    path: "/users/:id/edit",
    name: "UserEdit",
    component: UserEdit,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/users/:id/following",
    name: "Following",
    component: ShowFollow,
    props: (route) => ({
      id: route.params.id,
      type: "following",
    }),
  },
  {
    path: "/users/:id/followers",
    name: "Followers",
    component: ShowFollow,
    props: (route) => ({
      id: route.params.id,
      type: "followers",
    }),
  },
  {
    path: "/password_resets/new",
    name: "PasswordResetsNew",
    component: PasswordResetsNew,
  },
  {
    path: "/password_resets/:token",
    name: "PasswordResets",
    component: PasswordResets,
    props: (route) => ({
      token: route.params.token,
      email: route.query.email,
    }),
  },
  {
    path: "/account_activations/:token/edit",
    name: "AccountActivations",
    component: AccountActivations,
    props: (route) => ({
      token: route.params.token,
      email: route.query.email,
    }),
  },
  {
    path: "/account_activations/new",
    name: "AccountActivationsNew",
    component: AccountActivationsNew,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const sessionStore = useSessionStore()

  if (to.meta.requiresAuth && !sessionStore.loggedIn) {
    next("/login")
  } else {
    next()
  }
})

export default router
