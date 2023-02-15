<template>
  <nav v-show="authStore.user" class="bg-gray-800">
    <div id="nav-container" class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex flex-shrink-0 items-center">
            <img
              class="block h-8 w-auto lg:hidden"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
            <img
              class="hidden h-8 w-auto lg:block"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link
                to="/"
                exact
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out"
                :class="{ 'bg-gray-900 text-white': $route.path === '/' }"
                >Dashboard</router-link
              >
              <router-link
                to="/users"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out"
                :class="{ 'bg-gray-900 text-white': $route.path === '/users' }"
                >Users</router-link
              >
              <router-link
                to="/systems"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out"
                :class="{
                  'bg-gray-900 text-white': $route.path === '/systems',
                }"
                >Systems</router-link
              >
              <router-link
                to="/calendar"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out"
                :class="{
                  'bg-gray-900 text-white': $route.path === '/calendar',
                }"
                >Calendar</router-link
              >
              <router-link
                to="/events"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out"
                :class="{ 'bg-gray-900 text-white': $route.path === '/events' }"
                >Events</router-link
              >
            </div>
          </div>
        </div>
        <div class="relative">
          <button
            @click="profileMenuOpen = !profileMenuOpen"
            class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            id="user-menu-button"
            aria-haspopup="true"
            :aria-expanded="profileMenuOpen"
          >
            <span class="sr-only">Open user menu</span>
            <img
              class="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </button>
          <div
            v-if="profileMenuOpen"
            ref="menuContainer"
            class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
          >
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 ease-in-out"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-0"
            >
              Your Profile
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 ease-in-out"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-1"
            >
              Settings
            </a>
            <button
              type="button"
              @click="logout"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 ease-in-out"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { useAuthStore } from "@/stores";
import { onMounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const authStore = useAuthStore();
const profileMenuOpen = ref(false);
const menuContainer = ref(null);

const logout = () => {
  authStore.logout();
  profileMenuOpen.value = false;
};

onMounted(() => {
  onClickOutside(menuContainer, () => {
    profileMenuOpen.value = false;
  });
});
</script>
