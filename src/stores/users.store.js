import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

//users now are stored in array
export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: [],
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        user: {}
    }),
    actions: {
        goToPage(page) {
            this.currentPage = page;
            this.getAll(this.currentPage, this.itemsPerPage);
          },
        async register(user) {
            await fetchWrapper.post(`${baseUrl}/register`, user);
        },
        nextPage() {
            if (this.currentPage * this.itemsPerPage < this.totalItems) {
              this.currentPage++;
              this.getAll(this.currentPage, this.itemsPerPage);
            }
          },
          previousPage() {
            if (this.currentPage > 1) {
              this.currentPage--;
              this.getAll(this.currentPage, this.itemsPerPage);
            }
          },
        async getAll() {
            this.users = { loading: true };
            try {
                const response = await fetchWrapper.get(`${baseUrl}?page=${this.currentPage}&limit=${this.itemsPerPage}`);
                this.users = response.users;
                this.totalItems = response.totalItems;
            } catch (error) {
                this.users = { error };
            }
        },
        async getById(id) {
            this.users = { loading: true };
            try {
                this.users = await fetchWrapper.get(`${baseUrl}/${id}`);
            } catch (error) {
                console.error(`Error getting users ${id}: ${error}`);
                this.users = { error };
            }
        },
        async update(id, params) {
            await fetchWrapper.put(`${baseUrl}/${id}`, params);

            // update stored user if the logged in user updated their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                // update local storage
                const user = { ...authStore.user, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // update auth user in pinia state
                authStore.user = user;
            }
        },
        async delete(id) {
            // add isDeleting prop to user being deleted
            this.users.find(x => x.id === id).isDeleting = true;

            await fetchWrapper.delete(`${baseUrl}/${id}`);

            // remove user from list after deleted
            this.users = this.users.filter(x => x.id !== id);

            // auto logout if the logged in user deleted their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                authStore.logout();
            }
        }
    }
});
