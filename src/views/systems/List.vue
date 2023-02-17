<script setup>
import { storeToRefs } from "pinia";
import { useSystemsStore } from "@/stores";

const systemsStore = useSystemsStore();
const { systems } = storeToRefs(systemsStore);

systemsStore.getAll();
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Systems</h1>
    <router-link
      to="/systems/add"
      class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-md mb-4"
    >
      Add System
    </router-link>
    <div class="shadow overflow-hidden border-b border-gray-200 rounded-md">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              System Name
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              System ID
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              System Description
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Contact Name
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
          <template v-if="systems.length">
            <tr v-for="system in systems" :key="system.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ system.system_name }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ system.system_id }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ system.system_description }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ system.contact_name }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <router-link
                  :to="`/systems/edit/${system.id}`"
                  class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md mr-1"
                >
                  Edit
                </router-link>
                <button
                  @click="systemsStore.delete(system.id)"
                  class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
                  :disabled="system.isDeleting"
                >
                  <span
                    v-if="system.isDeleting"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  <span v-else>Delete</span>
                </button>
              </td>
            </tr>
          </template>
          <tr v-if="systems.loading">
            <td colspan="5" class="text-center py-4">
              <span
                class="spinner-border spinner-border-lg align-center"
              ></span>
            </td>
          </tr>
          <tr v-if="systems.error">
            <td colspan="5" class="py-4">
              <div class="text-red-500">
                Error loading systems: {{ systems.error }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
