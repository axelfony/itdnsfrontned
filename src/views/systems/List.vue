<script>
import { storeToRefs } from "pinia";
import { useSystemsStore } from "@/stores";

const systemsStore = useSystemsStore();
const { systems } = storeToRefs(systemsStore);

systemsStore.getAll();

export default {
  methods: {
    async deleteSystem(systemId) {
      systemsStore.delete(systemId);
    },
  },
};
</script>

<template>
  <h1>Systems</h1>
  <router-link to="/systems/add" class="btn btn-sm btn-success mb-2"
    >Add System</router-link
  >
  <table class="table table-striped">
    <thead>
      <tr>
        <th style="width: 30%">System Name</th>
        <th style="width: 30%">System ID</th>
        <th style="width: 30%">System Description</th>
        <th style="width: 10%"></th>
      </tr>
    </thead>
    <tbody>
      <template v-if="systems.length">
        <tr v-for="system in systems" :key="system._id">
          <td>{{ system.system_name }}</td>
          <td>{{ system.system_id }}</td>
          <td>{{ system.system_description }}</td>
          <td style="white-space: nowrap">
            <router-link
              :to="`/systems/edit/${system._id}`"
              class="btn btn-sm btn-primary mr-1"
              >Edit</router-link
            >
            <button
              @click="deleteSystem(system._id)"
              class="btn btn-sm btn-danger btn-delete-system"
              :disabled="system.isDeleting"
            >
              <span
                v-if="system.isDeleting"
                class="spinner-border spinner-border-sm"
              ></span>
              <span v-else>Delete</span>
            </button>
          </td>
        </tr>
      </template>
      <tr v-if="systems.loading">
        <td colspan="4" class="text-center">
          <span class="spinner-border spinner-border-lg align-center"></span>
        </td>
      </tr>
      <tr v-if="systems.error">
        <td colspan="4">
          <div class="text-danger">
            Error loading systems: {{ systems.error }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
