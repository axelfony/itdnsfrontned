<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEventsStore } from '@/stores/events.store';

export default {
  components: {
    FullCalendar,
  },
  setup() {
    const eventsStore = useEventsStore();
    const events = eventsStore.events;
    const view = ref('calendar');
    const calendarApi = ref(null);

    onMounted(() => {
      eventsStore.getAll().then(() => {
        const eventsArray = eventsStore.events.map((event) => {
          return {
            id: event._id,
            title: event.event_name,
            start: event.start_date,
            end: event.end_date,
          };
        });
        renderCalendar(eventsArray);
      });
    });

    function renderCalendar(events) {
      const calendarEl = ref($refs.calendar);

      if (calendarEl.value) {
        calendarApi.value = new FullCalendar.Calendar(calendarEl.value, {
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
          initialView: 'dayGridMonth',
          events,
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          },
          dateClick: handleDateClick,
        });

        calendarApi.value.render();
      }
    }

    function handleDateClick(info) {
      console.log(info);
    }

    function changeView(newView) {
      view.value = newView;
    }

    function deleteEvent(event) {
      if (confirm('Are you sure you want to delete this event?')) {
        eventsStore.delete(event._id);
      }
    }

    function formatDate(date) {
      return new Date(date).toLocaleDateString();
    }

    return {
      events,
      view,
      calendarApi,
      changeView,
      deleteEvent,
      formatDate,
    };
  },
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Events</h1>
    <div class="flex justify-between mb-8">
      <button @click="changeView('calendar')"
        :class="{ 'bg-blue-500': view === 'calendar', 'hover:bg-blue-600': view !== 'calendar' }"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-md mr-2">
        Calendar View
      </button>
      <button @click="changeView('list')"
        :class="{ 'bg-blue-500': view === 'list', 'hover:bg-blue-600': view !== 'list' }"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-md">
        List View
      </button>
    </div>

    <div v-if="view === 'calendar'">
      <div ref="calendar"></div>
    </div>

    <div v-if="view === 'list'">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Event Name
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Date
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              End Date
            </th>
            <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <template v-if="events.length">
            <tr v-for="event in events" :key="event._id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ event.event_name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ formatDate(event.start_date) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ formatDate(event.end_date) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <router-link :to="`/events/edit/${event._id}`"
                  class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md mr-1">
                  Edit
                </router-link>
                <button @click="deleteEvent(event)"
                  class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md">
                  Delete
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>


