<script setup>
import { useAuthStore } from '@/stores';
import { router } from '@/router';

// redirect home if already logged in
const authStore = useAuthStore();
if (authStore.user) {
    router.push('/');
}
</script>

<!-- Bootstrap -->
<!-- <template>
    <div class="container">
        <div class="row">
            <div class="col-sm-8 offset-sm-2 mt-5">
                <router-view />
            </div>
        </div>
    </div>
</template> -->
<!-- Tailwind -->
<template>
    <div class="container mx-auto p-4">
      <div class="flex justify-center">
        <div class="w-full md:w-2/3 lg:w-1/2 mt-5">
          <router-view />
        </div>
      </div>
    </div>
 </template>
  