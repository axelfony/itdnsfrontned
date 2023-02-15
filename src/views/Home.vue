<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

function showAlert1() {
  alertStore.setAlert({
    type: 'bg-green-500',
    message: 'Success!',
    details: 'Your operation was successful.'
  });
}

function showAlert2() {
  alertStore.setAlert({
    type: 'bg-red-500',
    message: 'Error!',
    details: 'An error occurred during the operation.'
  });
}

</script>

<template>
    <div v-if="user">
        <h1>Hi {{user.firstName}}!</h1>
        <p>You're logged in with Vue 3 + Pinia & JWT!!</p>
        <p><router-link to="/users">Manage Users</router-link></p>
        <button @click="showAlert1()">Show Alert 1</button>
    <button @click="showAlert2()">Show Alert 2</button>
    <Alert />
    </div>
</template>

