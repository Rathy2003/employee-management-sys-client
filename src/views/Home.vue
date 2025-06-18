<template>
    <div class="w-full">
        <div class="p-5">
            <!-- Employee Card -->
            <div class="bg-white rounded-2xl p-5 shadow-md mb-6">
                <h2 class="font-bold text-center mb-4 text-gray-800">Employee Card</h2>
                <div class="flex items-center justify-between">
                    <div class="text-sm text-gray-600 space-y-2">
                        <div>
                            <span class="font-medium text-gray-500">Username: </span>
                            <span class="font-semibold text-gray-800">{{ user_data.first_name }} {{ user_data.last_name }}</span>
                        </div>
                        <div>
                            <span class="font-medium text-gray-500">Date Of Birth: </span>
                            <span class="font-semibold text-gray-800">{{ user_data.dob }}</span>
                        </div>
                        <div>
                            <span class="font-medium text-gray-500">Phone Number: </span>
                            <span class="font-semibold text-gray-800">{{ user_data.phone_number }}</span>
                        </div>
                    </div>
                    <!-- User Profile -->
                    <div class="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 ml-4">
                        <svg v-if="!user_data.photo" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>

                        <img v-if="user_data.photo" :src="getImage(user_data.photo)" alt="User Profile" class="w-16 h-16 rounded-full object-cover">
                    </div>
                    <!-- End User Profile -->
                </div>
            </div>

            <!-- Date and Time -->
            <div class="flex justify-around text-white mb-6">
                <div class="flex items-center space-x-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                        </path>
                    </svg>
                    <span id="date">22/01/2025</span>
                </div>
                <div class="flex items-center space-x-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span id="time">{{ time }}</span>
                </div>
            </div>
        </div>

        <!-- Action Panel -->
        <div class="bg-gray-100 rounded-t-3xl px-5 py-8 relative">
            <div class="flex justify-around text-center">
                <router-link to="/reports" class="flex flex-col items-center space-y-2 text-gray-700 p-2">
                    <div class="bg-white rounded-xl shadow-md p-4">
                        <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                            </path>
                        </svg>
                    </div>
                    <span class="text-sm font-medium">Report</span>
                </router-link>
                <button class="flex flex-col items-center space-y-2 text-gray-700 p-2">
                    <div class="bg-white rounded-xl shadow-md p-4">
                        <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <span class="text-sm font-medium">Request OT</span>
                </button>
                <router-link to="/request-leave" class="flex flex-col items-center space-y-2 text-gray-700 p-2">
                    <div class="bg-white rounded-xl shadow-md p-4">
                        <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z">
                            </path>
                        </svg>
                    </div>
                    <span class="text-sm font-medium">Request Leave</span>
                </router-link>
            </div>

            <div class="h-24">
                <!-- Spacer for the floating button -->
            </div>

        </div>
        <!-- Floating Action Button -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2">
            <button @click="$router.push('/qr-scanner')"
                class="bg-white text-blue-600 rounded-full shadow-lg w-16 h-16 flex items-center justify-center">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
                    </path>
                </svg>
            </button>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Home',
    computed: {
        user_data(){
            return this.$store.state.auth.user;
        }
    },
    created() {
        this.interval = setInterval(() => {
            this.time = Intl.DateTimeFormat(navigator.language, {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            }).format()
        }, 1000)
    },
    beforeDestroy() {
        clearInterval(this.interval)
    },
    data() {
        return {
            time: '',
            interval: null
        }
    },
    methods:{
        getImage(url){
            return import.meta.env.VITE_IMAGE_URL + '/images/users/' + url;
        }
    }
}
</script>

<style scoped></style>