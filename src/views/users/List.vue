<script setup>
import { storeToRefs } from "pinia";
import { useUsersStore } from "@/stores";

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

usersStore.getAll();
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Users</h1>
    <router-link
      to="/users/add"
      class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-md mb-4"
    >
      Add User
    </router-link>
    <div class="shadow overflow-hidden border-b border-gray-200 rounded-md">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              First Name
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Last Name
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Username
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
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
                <router-link
                  :to="`/users/edit/${user.id}`"
                  class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md mr-1"
                >
                  Edit
                </router-link>
                <button
                  @click="usersStore.delete(user.id)"
                  class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
                  :disabled="user.isDeleting"
                >
                  <span
                    v-if="user.isDeleting"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  <span v-else>Delete</span>
                </button>
              </td>
            </tr>
          </template>
          <tr v-if="users.loading">
            <td colspan="4" class="text-center py-4">
              <span
                class="spinner-border spinner-border-lg align-center"
              ></span>
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
    </div>
  </div>
</template>
