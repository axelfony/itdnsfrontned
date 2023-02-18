import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/events`;

export const useEventsStore = defineStore({
    id: 'events',
    state: () => ({
        events: {},
        event: {}
    }),
    actions: {
        async getAll() {
            this.events = { loading: true };
            try {
                this.events = await fetchWrapper.get(baseUrl);    
            } catch (error) {
                this.events = { error };
            }
        },
        async getOne(id) {
            this.event = {};
            try {
                const response = await fetchWrapper.get(`${baseUrl}/${id}`);
                if (response.success) {
                    this.event = response.data;
                } else {
                    throw response.message;
                }
            } catch (error) {
                console.error(`Error retrieving event with id ${id}: ${error}`);
            }
        },
        async create(event) {
            try {
                const response = await fetchWrapper.post(baseUrl, event);
                if (!response.success) {
                    throw response.message;
                }
            } catch (error) {
                console.error(`Error creating system: ${error}`);
            }
        },
        async update(id, event) {
            try {
                const response = await fetchWrapper.put(`${baseUrl}/${id}`, event);
                if (!response.success) {
                    throw response.message;
                }
            } catch (error) {
                console.error(`Error updating system with id ${id}: ${error}`);
            }
        },
        async delete(id) {
            try {
              const response = await fetchWrapper.delete(`${baseUrl}/${id}`);
              if (response.success) {
                // remove event from list after deleted
                this.events = this.events.filter((e) => e._id !== id);
              } else {
                throw response.message;
              }
            } catch (error) {
              console.error(`Error deleting event with id ${id}: ${error}`);
            }
          }
          
    }
});
