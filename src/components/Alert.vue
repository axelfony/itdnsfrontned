
<template>
  <div v-if="alert" class="flex items-center justify-center h-screen">
    <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 rounded relative" role="alert" :class="alert.type">
      <button @click="alertStore.clear()" class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg class="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1 1 0 01-1.414 0L10 11.414l-2.93 2.435a1 1 0 01-1.414-1.414L8.586 10l-2.435-2.93a1 1 0 011.414-1.414L10 8.586l2.93-2.435a1 1 0 011.414 1.414L11.414 10l2.435 2.93a1 1 0 010 1.414z"/></svg>
      </button>
      <p>{{alert.message}}</p>
      <button v-if="alert.link" @click="router.push(alert.link)" class="ml-3 inline-flex px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        {{ alert.linkText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAlertStore } from '@/stores';
import { useRouter } from 'vue-router';

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
const router = useRouter();
</script>
