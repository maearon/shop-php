<template>
  <v-footer app class="mt-5">
    <v-container>
      <div class="d-flex flex-column align-center">
        <div>
          <router-link to="/about">About</router-link>
          <router-link to="/contact" class="ml-2">Contact</router-link>
          <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer" class="ml-2">News</a>
        </div>
        <div class="mt-2">
          <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
            <!-- <v-img src="/vue.svg" alt="Vue.js logo" width="100" height="30" /> -->
            <svg class="logo" viewBox="0 0 128 128" width="24" height="24" data-v-107e4060=""><path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z" data-v-107e4060=""></path><path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z" data-v-107e4060=""></path></svg>
          </a>
        </div>
      </div>
    </v-container>
  </v-footer>
</template>
