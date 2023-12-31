
<script>
import { defineComponent, toRefs, ref, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEventsStore } from '@/stores';

export default defineComponent({
  components: {
    FullCalendar,
  },
  setup() {
    const eventsStore = useEventsStore();
    const events = ref([]);

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

    async function handleDateSelect(selectInfo) {
      let title = prompt('Please enter a new title for your event');
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection

      if (title) {
        try {
          const eventParam = {
            event_name: title,
            start_date: selectInfo.startStr,
            end_date: selectInfo.endStr,
          };
          await eventsStore.create(eventParam); // Add the event to the backend
          await eventsStore.getAll(); // Fetch events from the backend again
          events.value = eventsStore.events; // Update the local events with the new list
        } catch (error) {
          console.error('Error creating event:', error);
        }
      }
    }

    async function handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        try {
          await eventsStore.delete(clickInfo.event.id); // Delete the event from the backend
          await eventsStore.getAll(); // Fetch events from the backend again
          events.value = eventsStore.events; // Update the local events with the new list
        } catch (error) {
          console.error('Error deleting event:', error);
        }
      }
    }

    function handleEvents(events) {
      currentEvents.value = events;
    }

    function handleWeekendsToggle() {
      calendarOptions.weekends = !calendarOptions.weekends; // Toggle the weekends property
      const calendarApi = this.$refs.fullCalendar.getApi(); // Get the FullCalendar API instance
      calendarApi.setOption('weekends', calendarOptions.weekends); // Update the weekends option in the FullCalendar
    }

    return {
      calendarOptions,
      currentEvents,
      handleDateSelect,
      handleEventClick,
      handleWeekendsToggle, // Add the handleWeekendsToggle method to the return object
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
  </div>
</template>