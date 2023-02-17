<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="flex flex-col w-64 bg-white">
      <div class="flex flex-col h-0 flex-1">
        <div class="flex items-center h-16 px-4 bg-gray-900">
          <span class="text-xl font-medium text-white">My App</span>
        </div>
        <div class="flex-1 flex flex-col overflow-y-auto">
          <nav class="flex-1 px-2 py-4 bg-white space-y-1">
            <a
              href="#"
              class="bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              v-on:click="showDashboard"
            >
              <!-- Icon -->
              <!-- Current: "bg-gray-200", Default: "bg-white group-hover:bg-gray-50" -->
              <svg
                class="text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              Dashboard
            </a>
            <a
              href="#"
              class="text-gray-600 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              v-on:click="showPosts"
            >
              <!-- Icon -->
              <svg
                class="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Posts
            </a>
            <a
              href="#"
              class="text-gray-600 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              v-on:click="showPages"
            >
              <!-- Icon -->
              <svg
                class="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Pages
            </a>
            <a
              href="#"
              class="text-gray-600 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              v-on:click="showUsers"
            >
              <!-- Icon -->
              <svg
                class="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 15a6 6 0 00-6-6M3 15a6 6 0 006-6"
                />
              </svg>
              Users
            </a>
          </nav>
        </div>
      </div>
      <div class="flex-shrink-0 flex bg-gray-800 p-4">
        <a href="#" class="flex-shrink-0 w-full group block">
          <div class="flex items-center">
            <div>
              <img
                class="inline-block h-9 w-9 rounded-full"
                :src="userProfileImage"
                alt=""
              />
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-white">
                {{ userName }}
              </p>
              <p
                class="text-xs font-medium text-gray-300 group-hover:text-gray-200"
              >
                View profile
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-auto">
      <div class="p-6">
        <h1 class="text-xl font-medium text-gray-900">{{ pageHeader }}</h1>
        <p class="mt-1 text-sm text-gray-600">
          {{ pageContent }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "John Doe",
      userProfileImage: "https://source.unsplash.com/100x100/?person",
      pageHeader: "Dashboard",
      pageContent:
        "Welcome to the dashboard. You can customize this page to suit your needs.",
    };
  },
  methods: {
    showDashboard() {
      this.pageHeader = "Dashboard";
      this.pageContent =
        "Welcome to the dashboard. You can customize this page to suit your needs.";
    },
    showPosts() {
      this.pageHeader = "Posts";
      this.pageContent = "Here are your latest posts.";
    },
    showPages() {
      this.pageHeader = "Pages";
      this.pageContent = "Here are your pages.";
    },
    showUsers() {
      this.pageHeader = "Users";
      this.pageContent = "Here are your users.";
    },
  },
};
</script>
