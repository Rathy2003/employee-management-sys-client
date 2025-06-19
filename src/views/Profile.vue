<template>
    <div class="container mx-auto max-w-lg min-h-screen bg-white shadow-lg">
        <div class="p-6">
            <!-- Profile Info -->
            <div class="flex flex-col items-center mb-8">
                <div class="relative mb-4">
                    <img v-if="!user_data.photo" class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" src="https://placehold.co/100x100/3b82f6/ffffff?text=KV" alt="User Avatar">
                    <img v-else :src="displayImage(user_data.photo)" class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" alt="profile">
                </div>
                <h2 class="text-2xl font-bold text-gray-800">{{ user_data ? user_data.first_name + ' ' + user_data.last_name : '' }}</h2>
                <p class="text-sm text-gray-500">{{ user_data ? user_data.email : '' }}</p>
            </div>

            <!-- Settings Sections -->
            <div class="space-y-6">
                <!-- Account Section -->
                <div>
                    <h3 class="px-4 mb-2 text-sm font-semibold text-gray-500 uppercase">Account</h3>
                    <div class="bg-gray-50 rounded-lg">
                        <Router-Link to="/personal-info" class="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-100">
                            <div class="flex items-center space-x-4">
                                <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                <span class="text-gray-700">Personal Info</span>
                            </div>
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </Router-Link>
                    </div>
                </div>
            </div>

            <!-- Logout Button -->
            <div class="mt-10">
                 <button @click="logout" class="w-full flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 px-4 rounded-lg transition duration-300">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    <span>Log Out</span>
                </button>
            </div>

        </div>
    </div>
</template>

<script>
import store from '../store/index.js';

export default {
    name: 'Profile',
    computed: {
        user_data(){
            return this.$store.state.auth.user;
        }
    },
    data() {
        return {
        }
    },
    methods: {
        displayImage(img){
          return import.meta.env.VITE_IMAGE_URL+'/images/users/'+ img
        },
        logout() {
            store.dispatch('auth/logout');
            this.$router.push('/login');
        }
    }
}
</script>