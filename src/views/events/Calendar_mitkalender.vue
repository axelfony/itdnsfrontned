<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Calendar</h1>
      <!-- Your add event link -->
    </div>
    <FullCalendar
      v-if="calendarOptions"
      :options="calendarOptions"
      @dateClick="handleDateClick"
    />
    <!-- Add event popup -->
    <div v-if="showAddEventPopup" class="fixed inset-0 flex items-center justify-center">
      <div class="bg-white p-4 rounded-md shadow">
        <EventForm :closePopup="closePopup" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useEventsStore } from '@/stores';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const eventsStore = useEventsStore();
const { events } = storeToRefs(eventsStore);

// Popup state and event handling
const showAddEventPopup = ref(false);

// Fetch events from the store
eventsStore.getAll();

// Function to format the date in a user-friendly way
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Format the date as per the user's locale
}

// Function to handle the date click event
function handleDateClick(info) {
  // info.date contains the clicked date object
  console.log('Date clicked:', info.date);

  // Show the add event popup when a date is clicked
  showAddEventPopup.value = true;
}

// Function to close the popup
function closePopup() {
  showAddEventPopup.value = false;
}
// Map events to FullCalendar's event format
const calendarEvents = ref([]);

// Configure the FullCalendar plugins
const calendarPlugins = [dayGridPlugin, interactionPlugin];

// FullCalendar options
const calendarOptions = ref({
  plugins: calendarPlugins,
  initialView: 'dayGridMonth',
  selectable: true, // Enable date selection
});
</script>