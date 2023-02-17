import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/systems`;

export const useSystemsStore = defineStore({
    id: 'systems',
    state: () => ({
        systems: {},
        system: {}
    }),
    actions: {
        async getAll() {
            this.systems = { loading: true };
            try {
                this.systems = await fetchWrapper.get(baseUrl);    
            } catch (error) {
                this.systems = { error };
            }
        },
        async getOne(id) {
            this.system = {};
            try {
                const response = await fetchWrapper.get(`${baseUrl}/${id}`);
                if (response.success) {
                    this.system = response.data;
                } else {
                    throw response.message;
                }
            } catch (error) {
                console.error(`Error retrieving system with id ${id}: ${error}`);
            }
        },
        async create(system) {
            try {
                const response = await fetchWrapper.post(baseUrl, system);
                if (!response.success) {
                    throw response.message;
                }
            } catch (error) {
                console.error(`Error creating system: ${error}`);
            }
        },
        async update(id, system) {
            try {
                const response = await fetchWrapper.put(`${baseUrl}/${id}`, system);
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
                    // remove system from list after deleted
                    this.systems = this.systems.filter(x => x.id !== id);
                } else {
                    throw response.message;
                }
            } catch (error) {
                console.error(`Error deleting system with id ${id}: ${error}`);
            }
        }
    }
});
