<template>
    <div class="container mx-auto max-w-lg min-h-screen bg-white shadow-lg">
        <div class="p-6">
            <!-- Profile Info -->
            <div class="flex flex-col items-center mb-8">
                <div class="relative mb-4">
                    <img class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" src="https://placehold.co/100x100/3b82f6/ffffff?text=KV" alt="User Avatar">
                    <button class="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center border-2 border-white">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"></path></svg>
                    </button>
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
                         <a href="#" class="flex justify-between items-center p-4 hover:bg-gray-100">
                            <div class="flex items-center space-x-4">
                                <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                <span class="text-gray-700">Security</span>
                            </div>
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </a>
                    </div>
                </div>

                 <!-- Settings Section -->
                <div>
                    <h3 class="px-4 mb-2 text-sm font-semibold text-gray-500 uppercase">Settings</h3>
                    <div class="bg-gray-50 rounded-lg">
                        <a href="#" class="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-100">
                            <div class="flex items-center space-x-4">
                                <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                                <span class="text-gray-700">Notifications</span>
                            </div>
                           <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </a>
                         <a href="#" class="flex justify-between items-center p-4 hover:bg-gray-100">
                            <div class="flex items-center space-x-4">
                                <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m-9 9h18"></path></svg>
                                <span class="text-gray-700">Language</span>
                            </div>
                           <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </a>
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
        logout() {
            store.dispatch('auth/logout');
            this.$router.push('/login');
        }
    }
}
</script>