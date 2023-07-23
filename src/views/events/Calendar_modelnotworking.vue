<script>
import { defineComponent, ref, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog } from '@headlessui/vue'; // Import Dialog only here
import { useEventsStore } from '@/stores';

export default defineComponent({
  components: {
    FullCalendar,
    Dialog, // Declare Dialog component here
    // Transition component will be used directly from Dialog component in the template section
  },
  setup() {
    const eventsStore = useEventsStore();
    const events = ref([]);
    const showModal = ref(false);
    const selectedEvent = ref({});

    // Fetch events from the store
    onMounted(async () => {
      await eventsStore.getAll(); // Fetch events from the backend
      events.value = eventsStore.events; // Assign the fetched events to the local events variable
    });

    const calendarOptions = {
      plugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin, // needed for dateClick
      ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      initialView: 'dayGridMonth',
      initialEvents: events.value, // Use the fetched events
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      weekends: true,
      select: handleDateSelect,
      eventClick: handleEventClick,
      eventsSet: handleEvents,
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };

    const currentEvents = ref([]);

    function handleDateSelect(selectInfo) {
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      selectedEvent.value = {
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        title: '',
        system: null,
        user: null,
        description: null,
      };
      showModal.value = true;
    }

    async function handleEventClick(clickInfo) {
      selectedEvent.value = {
        id: clickInfo.event.id,
        title: clickInfo.event.title,
        description: clickInfo.event.extendedProps.description,
        start: clickInfo.event.startStr,
        end: clickInfo.event.endStr,
        system: clickInfo.event.extendedProps.system,
        user: clickInfo.event.extendedProps.user,
      };
      showModal.value = true;
    }


    function handleEvents(events) {
      currentEvents.value = events;
    }

    function handleWeekendsToggle() {
      calendarOptions.weekends = !calendarOptions.weekends; // Toggle the weekends property
      const calendarApi = this.$refs.fullCalendar.getApi(); // Get the FullCalendar API instance
      calendarApi.setOption('weekends', calendarOptions.weekends); // Update the weekends option in the FullCalendar
    }


    async function handleAddEvent() {
      if (selectedEvent.value.title) {
        try {
          await eventsStore.create(selectedEvent.value); // Add the event to the backend
          await eventsStore.getAll(); // Fetch events from the backend again
          events.value = eventsStore.events; // Update the local events with the new list
          showModal.value = false;
        } catch (error) {
          console.error('Error creating event:', error);
        }
      }
    }

    return {
      calendarOptions,
      currentEvents,
      handleDateSelect,
      handleEventClick,
      handleWeekendsToggle, // Add the handleWeekendsToggle method to the return object
      handleAddEvent,
      showModal,
      selectedEvent,
    };
  },
});
</script>
<template>
  <div class="flex min-h-screen font-sans">
    <!-- Sidebar -->
    <div class="w-1/4 p-6 bg-blue-100">
      <div class="py-4">
        <h2 class="text-xl font-bold">Instructions</h2>
        <ul class="mt-2">
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div class="py-4">
        <label class="block">
          <input type="checkbox" :checked="calendarOptions.weekends" @change="handleWeekendsToggle"
            class="mr-2 leading-tight" />
          <span class="text-sm font-bold">Toggle weekends</span>
        </label>
      </div>
      <div class="py-4">
        <h2 class="text-xl font-bold">All Events ({{ currentEvents.length }})</h2>
        <ul class="mt-2">
          <li v-for="event in currentEvents" :key="event.id" class="my-1">
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-grow p-6">
      <FullCalendar ref="fullCalendar" class="w-full h-full bg-white" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
    <Dialog :open="showModal" @close="showModal = false" class="fixed z-10 inset-0 overflow-y-auto" as="div">
  <div class="fixed inset-0 bg-black opacity-30" />
  <div class="flex items-center justify-center min-h-screen">
    <div class="transition-all ease-out duration-300 transform opacity-0 scale-75 enter:opacity-100 enter:scale-100 leave:opacity-0 leave:scale-75">
      <div class="p-6 bg-white rounded-lg">
        <h2 class="text-xl font-bold mb-6">{{ selectedEvent.title ? 'Edit Event' : 'Add Event' }}</h2>
        <div>
          <label class="block">Event Title</label>
          <input v-model="selectedEvent.title" type="text" placeholder="Enter event title" />
        </div>
        <div>
          <label class="block">Event Description</label>
          <input v-model="selectedEvent.description" type="text" placeholder="Enter event description" />
        </div>
        <div>
          <label class="block">System</label>
          <select v-model="selectedEvent.system">
            <option v-for="system in systems" :key="system.id" :value="system.id">
              {{ system.system_name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block">User</label>
          <select v-model="selectedEvent.user">
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.username }}
            </option>
          </select>
        </div>
        <div>
          <button @click="handleAddEvent">Save Event</button>
          <button @click="showModal = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</Dialog>

  </div>
</template>