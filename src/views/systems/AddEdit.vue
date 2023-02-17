<script setup>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { useSystemsStore, useAlertStore } from "@/stores";
import { router } from "@/router";

const systemsStore = useSystemsStore();
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;

let title = "Add system";
let system = null;
if (id) {
  // edit mode
  title = "Edit system";
  ({ system } = storeToRefs(systemsStore));
  systemsStore.getById(id);
}


const schema = Yup.object().shape({
  system_name: Yup.string().required("System Name is required"),
  system_id: Yup.string().required("System ID is required"),
  system_description: Yup.string().required("System Description is required"),
});

async function onSubmit(values) {
  try {
    let message;
    if (system) {
      await systemsStore.update(system.value.id, values);
      message = "system updated";
    } else {
      await systemsStore.create(values);
      message = "system added";
    }
    await router.push("/systems");
    alertStore.success(message);
  } catch (error) {
    alertStore.error(error);
  }
}
</script>

<template>
  <h1 class="text-3xl font-bold mb-6">{{ title }}</h1>
  <template v-if="!(system?.loading || system?.error)">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      :initial-values="system"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="flex flex-wrap -mx-3">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="system_name"
          >
            System Name
          </label>
          <Field
            name="system_name"
            type="text"
            id="system_name"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{ 'border-red-500': errors.system_name }"
          />
          <p class="text-red-500 text-xs italic">{{ errors.system_name }}</p>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="system_description"
          >
          System Description
          </label>
          <Field
            name="system_description"
            type="text"
            id="system_description"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{ 'border-red-500': errors.system_description }"
          />
          <p class="text-red-500 text-xs italic">{{ errors.system_description }}</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3">
        <div class="w-full md:w -1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="system_id"
          >
          System SID
          </label>
          <Field
            name="system_id"
            type="text"
            id="system_id"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{ 'border-red-500': errors.system_id }"
          />
          <p class="text-red-500 text-xs italic">{{ errors.system_id }}</p>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="contact_name"
          >
          Contact Name
          </label>
          <Field
            name="contact_name"
            type="text"
            id="contact_name"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{ 'border-red-500': errors.contact_name }"
          />
          <p class="text-red-500 text-xs italic">{{ errors.contact_name }}</p>
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
          {{ system ? "Update" : "Create" }}
        </button>
        <router-link
          to="/systems"
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Cancel
        </router-link>
      </div>
    </Form>
  </template>
  <template v-if="system?.loading">
    <div class="text-center m-5">
      <span class="spinner-border spinner-border-lg align-center"></span>
    </div>
  </template>
  <template v-if="system?.error">
    <div class="text-center m-5">
      <div class="text-danger">Error loading system: {{ system.error }}</div>
    </div>
  </template>
</template>
