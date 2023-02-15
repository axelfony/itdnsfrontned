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

let title = "Add System";
let system = null;
if (id) {
  // edit mode
  title = "Edit System";
  ({ system } = storeToRefs(systemsStore));
  systemsStore.getOne(id);
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
      await systemsStore.update(system.value._id, values);
      message = "System updated";
    } else {
      await systemsStore.create(values);
      message = "System added";
    }
    await router.push("/systems");
    alertStore.success(message);
  } catch (error) {
    alertStore.error(error);
  }
}
</script>
<template>
  <h1>{{ title }}</h1>
  <template v-if="!(system?.loading || system?.error)">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      :initial-values="system"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="form-row">
        <div class="form-group col">
          <label>System Name</label>
          <Field
            name="system_name"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.system_name }"
          />
          <div class="invalid-feedback">{{ errors.system_name }}</div>
        </div>
        <div class="form-group col">
          <label>System ID</label>
          <Field
            name="system_id"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.system_id }"
          />
          <div class="invalid-feedback">{{ errors.system_id }}</div>
        </div>
      </div>
      <div class="form-group">
        <label>System Description</label>
        <Field
          name="system_description"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.system_description }"
        />
        <div class="invalid-feedback">{{ errors.system_description }}</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="isSubmitting">
          <span
            v-show="isSubmitting"
            class="spinner-border spinner-border-sm mr-1"
          ></span>
          Save
        </button>
        <router-link to="/systems" class="btn btn-link">Cancel</router-link>
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
