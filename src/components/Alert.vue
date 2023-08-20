<template>
  <div v-if="alert" class="fixed top-16 right-4 z-50 w-80">
    <div 
      class="p-4 border rounded-lg"
      :class="alertClasses"
      role="alert"
    >
      <div class="flex items-center">
        <!-- SVG content based on alert type -->
        <template v-if="alert.type === 'info'">
          <svg class="flex-shrink-0 w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
        </template>
        <template v-if="alert.type === 'error'">
          <!-- SVG for error -->
          <svg class="flex-shrink-0 w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
        </template>
        <!-- Add other SVGs for 'success', 'warning', etc. in a similar manner -->

        <span class="sr-only">Info</span>
        <h3 class="text-lg font-medium">{{alert.message}}</h3>
      </div>
      <div v-if="alert.link" class="mt-2 mb-4 text-sm">
        {{ alert.linkText }}
      </div>
      <div class="flex">
        <button v-if="alert.link" @click="router.push(alert.link)" class="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <!-- SVG content for "View more" -->
          <svg class="-ml-0.5 mr-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
          </svg>
          View more
        </button>
        <button @click="alertStore.clear()" class="text-gray-700 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center">
          Dismiss
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAlertStore } from '@/stores';
import { useRouter } from 'vue-router';

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
const router = useRouter();

const alertClasses = computed(() => {
  switch (alert.value?.type) {
    case 'error':
      return 'text-red-800 border-red-300 bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800';
    case 'success':
      return 'text-green-800 border-green-300 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800';
    case 'info':
      return 'text-blue-800 border-blue-300 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800';
    case 'warning':
      return 'text-yellow-800 border-yellow-300 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-800';
    default:
      return 'text-gray-800 border-gray-300 bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-800';
  }
});
</script>
