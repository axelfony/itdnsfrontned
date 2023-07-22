<script setup>
import { ref, onMounted } from "vue";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import {
  useEventsStore,
  useAlertStore,
  useSystemsStore,
  useUsersStore,
} from "@/stores";
import { router } from "@/router";

const eventsStore = useEventsStore();
const alertStore = useAlertStore();
const systemsStore = useSystemsStore();
const usersStore = useUsersStore();
const route = useRoute();
const id = route.params.id;

let title = "Add event";
let event = null;

onMounted(async () => {
  // Fetch systems and users data when the component is mounted
  await systemsStore.getAll();
  await usersStore.getAll();

  if (id) {
    // edit mode
    title = "Edit event";
    ({ event } = storeToRefs(eventsStore));
    await eventsStore.getById(id); // Await the asynchronous action to get the event details

    // Set the initial value of selectedSystem and selectedUser based on the event data
    selectedSystem.value = event.value.system_name; // Assuming the system_id property is the ID of the selected system in the event data
    selectedUser.value = event.value.username; // Assuming the user_id property is the ID of the selected user in the event data
  }
});

// Fetch users data from the store
const { users } = usersStore;
// Fetch systems data from the store
const { systems } = systemsStore;
const selectedUser = ref("");
const selectedSystem = ref(""); 

const schema = Yup.object().shape({
  event_name: Yup.string().required("Event Name is required"),
  event_description: Yup.string().required("Event Description is required"),
  system: Yup.string().when("selectedSystem", {
    is: (val) => val === "",
    then: Yup.string().nullable().required("System is required"),
    otherwise: Yup.string().nullable(),
  }),
  user: Yup.string().when("selectedSystem", {
    is: (val) => val === "",
    then: Yup.string().nullable().required("System is required"),
    otherwise: Yup.string().nullable(),
  }),
  start_date: Yup.date().required("Start Date is required"),
  end_date: Yup.date().required("End Date is required"),
  // Remove the selectedUser from the schema
});

async function onSubmit(values) {
  try {
    let message;
    if (event) {
      await eventsStore.update(event.value.id, values);
      message = "event updated";
    } else {
      await eventsStore.create(values);
      message = "event added";
    }
    await router.push("/events");
    alertStore.success(message);
  } catch (error) {
    alertStore.error(error);
  }
}
</script>

<template>
  <h1 class="text-3xl font-bold mb-6">{{ title }}</h1>
  <template v-if="!(event?.loading || event?.error)">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      :initial-values="event"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="flex flex-wrap -mx-3">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="event_name"
          >
            Event Name
          </label>
          <Field
            name="event_name"
            type="text"
            id="event_name"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{ 'border-red-500': errors.event_name }"
          />
          <p class="text-red-500 text-xs italic">{{ errors.event_name }}</p>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="system_description"
          >
          Event Description
          </label>
          <Field
            name="event_description"
            type="text"
            id="event_description"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{ 'border-red-500': errors.event_description }"
          />
          <p class="text-red-500 text-xs italic">{{ errors.event_description }}</p>
        </div>
      </div>
      
      <div class="flex flex-wrap -mx-3">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="system"
      >
        System
      </label>
      <select
      v-model="selectedSystem"
      id="system"
      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      :class="{ 'border-red-500': errors.system }"
    >
      <option value="">Select a system</option>
      <option v-for="system in systems" :key="system.id" :value="system.id">
        {{ system.system_name }}
      </option>
    </select>
      <p class="text-red-500 text-xs italic">{{ errors.system }}</p>
    </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="contact_name"
          >
          Contact Name
          </label>
          <select
  v-model="selectedUser"
  id="user"
  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
  :class="{ 'border-red-500': errors.user }"
>
  <option value="">Select a contact</option>
  <option v-for="user in users" :key="user.id" :value="user.id">
    {{ user.username }}
  </option>
</select>
          <p class="text-red-500 text-xs italic">{{ errors.contact_name }}</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3">
        
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="start_date"
      >
        Start Date
      </label>
      <Field
        name="start_date"
        type="date"
        id="start_date"
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        :class="{ 'border-red-500': errors.start_date }"
      />
      <p class="text-red-500 text-xs italic">{{ errors.start_date }}</p>
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="end_date"
      >
        End Date
      </label>
      <Field
        name="end_date"
        type="date"
        id="end_date"
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        :class="{ 'border-red-500': errors.end_date }"
      />
      <p class="text-red-500 text-xs italic">{{ errors.end_date }}</p>
    </div>
    <div class="flex flex-wrap -mx-3">

  </div>
  </div>
  
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          :disabled="isSubmitting"
        >
          <span
            v-show="isSubmitting"
            class="spinner-border spinner-border-sm mr-1"
          ></span>
          {{ event ? "Update" : "Create" }}
        </button>
        <router-link
          to="/events"
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Cancel
        </router-link>
      </div>
    </Form>
  </template>
  <template v-if="event?.loading">
    <div class="text-center m-5">
      <span class="spinner-border spinner-border-lg align-center"></span>
    </div>
  </template>
  <template v-if="event?.error">
    <div class="text-center m-5">
      <div class="text-danger">Error loading event: {{ event.error }}</div>
    </div>
  </template>
</template>
