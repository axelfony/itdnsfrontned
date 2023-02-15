<template>
  <!-- This example requires updating your template -->
  <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ ' ' }}
          <!-- Jump to registration page -->
          <router-link to="register" class="font-medium text-indigo-600 hover:text-indigo-500">start your 14-day free trial</router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input id="username" name="username" type="text" class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" :class="{ 'border-red-500': state.errors.username }" v-model="state.username" @input="state.errors.username = null" placeholder="Username" required>
            <p v-if="state.errors.username" class="text-red-500 text-xs italic">{{ state.errors.username }}</p>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" :class="{ 'border-red-500': state.errors.password }" v-model="state.password" @input="state.errors.password = null" placeholder="Password" required>
            <p v-if="state.errors.password" class="text-red-500 text-xs italic">{{ state.errors.password }}</p>
          </div>
        </div>
<!-- Not yet implemented -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>
<!-- Not yet implemented -->
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
          </div>
        </div>

        <div>
          <button type="submit" class="group relative flex w-full justify-center py-2 px-4 text-sm font-medium
-4 border border-transparent bg-indigo-600 hover:bg-indigo-700 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" :disabled="state.isSubmitting">
            <span v-show="state.isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import * as Yup from 'yup';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();

const state = reactive({
  username: '',
  password: '',
  errors: {
    username: null,
    password: null
  },
  isSubmitting: false
});

const schema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
});

async function onSubmit() {
  state.isSubmitting = true;

  try {
    await schema.validate(
      { username: state.username, password: state.password },
      { abortEarly: false }
    );

    await authStore.login(state.username, state.password);
  } catch (error) {
    if (error.inner) {
      error.inner.forEach((e) => {
        state.errors[e.path] = e.message;
      });
    }
  }

  state.isSubmitting = false;
}
</script>
