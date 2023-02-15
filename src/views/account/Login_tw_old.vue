<!-- Login Page using Tailwind.css and Input elements in form fields. Additional errorhandling using reactive state
In this updated version of the code, we are still using the reactive state object, but we've moved the initialization of the Yup schema object below the creation of the reactive state object. We've also moved the creation of the authStore object below the creation of the schema and state objects.
In the onSubmit function, we've added logic to set the isSubmitting flag to true when the form is submitted. We then try to validate the form using the Yup schema and await the result. If there are any validation errors, we loop through them and set the corresponding error messages in the state.errors object.
After validation, we attempt to log in the user using the authStore object. If an error occurs, we simply log it to the console. Finally, we set the isSubmitting flag back to false. -->
<template>
  <div class="m-3">
    <div class="bg-white max-w-md mx-auto rounded-lg overflow-hidden shadow-md">
      <div
        class="bg-gray-200 text-gray-700 uppercase text-lg font-bold py-2 px-4"
      >
        Login
      </div>
      <div class="px-4 py-6">
        <form @submit.prevent="onSubmit">
          <div class="mb-4">
            <label for="username" class="block text-gray-700 font-bold mb-2"
              >Username</label
            >
            <input
              id="username"
              name="username"
              type="text"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              :class="{ 'border-red-500': state.errors.username }"
              v-model="state.username"
              @input="state.errors.username = null"
            />
            <p v-if="state.errors.username" class="text-red-500 text-xs italic">
              {{ state.errors.username }}
            </p>
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              :class="{ 'border-red-500': state.errors.password }"
              v-model="state.password"
              @input="state.errors.password = null"
            />
            <p v-if="state.errors.password" class="text-red-500 text-xs italic">
              {{ state.errors.password }}
            </p>
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              :disabled="state.isSubmitting"
            >
              <span
                v-show="state.isSubmitting"
                class="spinner-border spinner-border-sm mr-1"
              ></span>
              Login
            </button>
            <router-link
              to="register"
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Register
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import * as Yup from 'yup';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();

const state = reactive({
  username: '',
  password: '',
  errors: {
    username: null,
    password: null
  },
  isSubmitting: false,
});

const schema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

async function onSubmit() {
  state.isSubmitting = true;

  try {
    await schema.validate({
      username: state.username,      password: state.password
    }, { abortEarly: false });

    await authStore.login(state.username, state.password);
  } catch (error) {
    if (error.inner) {
      error.inner.forEach((e) => {
        state.errors[e.path] = e.message;
      });
    }
  }

  state.isSubmitting = false;
}
</script>

     
