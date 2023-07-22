import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/events`;

export const useEventsStore = defineStore({
    id: 'events',
    state: () => ({
        events: [], // Change the initial value to an empty array
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
        async getById(id) {
            this.event = { loading: true };
            try {
                this.event = await fetchWrapper.get(`${baseUrl}/${id}`);
            } catch (error) {
                console.error(`Error getting event ${id}: ${error}`);
                this.event = { error };
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
