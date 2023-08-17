<script setup>
import { watch, onMounted, computed } from 'vue';
import { storeToRefs } from "pinia";
import { useUsersStore } from "@/stores";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === Math.ceil(totalItems.value / itemsPerPage.value));

const usersStore = useUsersStore();
const { users, currentPage, itemsPerPage, totalItems, nextPage, previousPage, goToPage } = storeToRefs(usersStore);

// Fetch data when component mounts
onMounted(() => {
  usersStore.getAll(currentPage.value, itemsPerPage.value);
});

// Watch for changes in currentPage and fetch data for the new page
watch(currentPage, (newPage, oldPage) => {
  if (newPage !== oldPage) {
    usersStore.getAll(newPage, itemsPerPage.value);
  }
});
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Users</h1>
      <router-link to="/users/add"
        class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-md">
        Add User
      </router-link>
    </div>
    <div class="shadow overflow-hidden border-b border-gray-200 rounded-md">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              First Name
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Name
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <template v-if="users.length">
            <tr v-for="user in users" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.firstName }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.lastName }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.username }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <router-link :to="`/users/edit/${user.id}`"
                  class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md mr-1">
                  Edit
                </router-link>
                <button @click="usersStore.delete(user.id)"
                  class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
                  :disabled="user.isDeleting">
                  <span v-if="user.isDeleting" class="spinner-border spinner-border-sm"></span>
                  <span v-else>Delete</span>
                </button>
              </td>
            </tr>
          </template>
          <tr v-if="users.loading">
            <td colspan="4" class="text-center py-4">
              <span class="spinner-border spinner-border-lg align-center"></span>
            </td>
          </tr>
          <tr v-if="users.error">
            <td colspan="4" class="py-4">
              <div class="text-red-500">
                Error loading users: {{ users.error }}
              </div>
            </td>
          </tr>
        </tbody>

      </table>
      <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
          <a @click="previousPage"
            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
          <a @click="nextPage"
            class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              {{ ' ' }}
              <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
              {{ ' ' }}
              to
              {{ ' ' }}
              <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalItems) }}</span>
              {{ ' ' }}
              of
              {{ ' ' }}
              <span class="font-medium">{{ totalItems }}</span>
              {{ ' ' }}
              results
            </p>
          </div>
          <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <!-- Previous Button -->
              <a @click="previousPage" :class="{ 'opacity-50 pointer-events-none': isFirstPage.value }"
                class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span class="sr-only">Previous</span>
                <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
              </a>
              <!-- Page Buttons -->
              <template v-for="page in Math.ceil(totalItems / itemsPerPage)">
                <a @click="usersStore.goToPage(page)"
                  :class="{ 'bg-indigo-600 text-white': currentPage === page, 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0': currentPage !== page }"
                  class="relative inline-flex items-center px-4 py-2 text-sm font-medium focus:outline-offset-0">{{ page
                  }}</a>
              </template>
              <!-- Next Button -->
              <a @click="nextPage" :class="{ 'opacity-50 pointer-events-none': isLastPage.value }"
                class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span class="sr-only">Next</span>
                <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
