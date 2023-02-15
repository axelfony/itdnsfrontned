<!-- <script setup>
import { Nav, Alert } from '@/components';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
    <div class="app-container" :class="authStore.user && 'bg-light'">
        <Nav />
        <Alert />
        <div class="container pt-4 pb-4">
            <router-view />
        </div>
    </div>
</template>

<style>
@import '@/assets/base.css';
@import '@/assets/tailwind.css';
</style> -->

<!-- Structure of the App content, how it's centered, which styles its using  -->
<script setup>
import { Nav, Alert } from '@/components';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <Nav />
        <Alert />
        <div class="container mx-auto py-4 flex-grow">
            <router-view />
        </div>
    </div>
</template>

<!-- <style lang="postcss">

@import '@/assets/tailwind.css';

.app-container {
  background-color: #f8f8f8;
}
</style> -->
