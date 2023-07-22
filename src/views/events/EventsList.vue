<script setup>
import { storeToRefs } from "pinia";
import { useEventsStore } from "@/stores";

const eventsStore = useEventsStore();
const { events } = storeToRefs(eventsStore);

// Fetch events from the store
eventsStore.getAll();
// Function to format the date in a user-friendly way
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Format the date as per user's locale
}

</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Events</h1>
      <router-link
        to="/events/add"
        class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-md"
      >
        Add Event
      </router-link>
    </div>
    <div class="shadow overflow-hidden border-b border-gray-200 rounded-md">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Event Name
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Event ID
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Event Description
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Contact Name
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Start Date
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              End Date
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
          <template v-if="events.length">
            <tr v-for="event in events" :key="event.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ event.event_name }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ event.id }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ event.event_description }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ event.contact_name }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatDate(event.start_date) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatDate(event.end_date) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <router-link
                  :to="`/events/edit/${event.id}`"
                  class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md mr-1"
                >
                  Edit
                </router-link>
                <button
                  @click="eventsStore.delete(event.id)"
                  class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
                  :disabled="event.isDeleting"
                >
                  <span
                    v-if="event.isDeleting"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  <span v-else>Delete</span>
                </button>
              </td>
            </tr>
          </template>
          <tr v-if="events.loading">
            <td colspan="7" class="text-center py-4">
              <span
                class="spinner-border spinner-border-lg align-center"
              ></span>
            </td>
          </tr>
          <tr v-if="events.error">
            <td colspan="7" class="py-4">
              <div class="text-red-500">
                Error loading events: {{ events.error }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
</div>
</div>
</template>
