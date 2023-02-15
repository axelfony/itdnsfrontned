<script setup>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { useUsersStore, useAlertStore } from "@/stores";
import { router } from "@/router";

const usersStore = useUsersStore();
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;

let title = "Add User";
let user = null;
if (id) {
  // edit mode
  title = "Edit User";
  ({ user } = storeToRefs(usersStore));
  usersStore.getById(id);
}

const schema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .transform((x) => (x === "" ? undefined : x))
    // password optional in edit mode
    .concat(user ? null : Yup.string().required("Password is required"))
    .min(6, "Password must be at least 6 characters"),
});

async function onSubmit(values) {
  try {
    let message;
    if (user) {
      await usersStore.update(user.value.id, values);
      message = "User updated";
    } else {
      await usersStore.register(values);
      message = "User added";
    }
    await router.push("/users");
    alertStore.success(message);
  } catch (error) {
    alertStore.error(error);
  }
}
</script>

<template>
  <h1 class="text-3xl font-bold mb-6">{{ title }}</h1>
  <template v-if="!(user?.loading || user?.error)">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      :initial-values="user"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="flex flex-wrap -mx-3">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="firstName"
          >
            First Name
          </label>
          <Field
            name="firstName"
            type="text"
            id="firstName"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{ 'border-red-500': errors.firstName }"
          />
          <p class="text-red-500 text-xs italic">{{ errors.firstName }}</p>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="lastName"
          >
            Last Name
          </label>
          <Field
            name="lastName"
            type="text"
            id="lastName"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{ 'border-red-500': errors.lastName }"
          />
          <p class="text-red-500 text-xs italic">{{ errors.lastName }}</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3">
        <div class="w-full md:w -1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="email"
          >
            Email
          </label>
          <Field
            name="email"
            type="text"
            id="email"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{ 'border-red-500': errors.email }"
          />
          <p class="text-red-500 text-xs italic">{{ errors.email }}</p>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <Field
            name="username"
            type="text"
            id="username"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{ 'border-red-500': errors.username }"
          />
          <p class="text-red-500 text-xs italic">{{ errors.username }}</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="password"
          >
            Password
            <em v-if="user">(Leave blank to keep the same password)</em>
          </label>
          <Field
            name="password"
            type="password"
            id="password"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{ 'border-red-500': errors.password }"
          />
          <p class="text-red-500 text-xs italic">{{ errors.password }}</p>
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
          Save
        </button>
        <router-link
          to="/users"
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Cancel
        </router-link>
      </div>
    </Form>
  </template>
  <template v-if="user?.loading">
    <div class="text-center m-5">
      <span class="spinner-border spinner-border-lg align-center"></span>
    </div>
  </template>
  <template v-if="user?.error">
    <div class="text-center m-5">
      <div class="text-danger">Error loading user: {{ user.error }}</div>
    </div>
  </template>
</template>
