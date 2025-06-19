<template>
  <main class="container mx-auto p-6">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white p-8 rounded-2xl">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Request Overtime</h2>
          <p class="text-gray-500 mt-1">Fill out the form below to request overtime payment.</p>
        </div>
        <!-- Success Alert -->
        <div id="success-alert" :style="{display:success.show ? '' : 'none'}" class="relative bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-lg shadow-md animate-alert-in mb-5" role="alert">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="font-bold">Success</p>
              <p class="text-sm">{{success.message}}</p>
            </div>
            <button @click="success.show = false" type="button" class="absolute top-2 right-2 ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8" data-dismiss-target="#success-alert" aria-label="Close">
              <span class="sr-only">Dismiss</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
        </div>
        <!-- End Success Alert -->
        <form @submit.prevent="submitRequest" class="space-y-6">
          <div>
            <label for="ot-date" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" id="ot-date" v-model="otDate" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label for="start-time" class="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input type="time" id="start-time" v-model="startTime" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>
            <div>
              <label for="end-time" class="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input type="time" id="end-time" v-model="endTime" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Total Hours</label>
            <div class="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg">
              <span class="text-gray-700 font-bold">{{ totalHours }}</span>
            </div>
            <p class="text-xs text-gray-500 mt-1">Total duration is calculated automatically.</p>
          </div>
          <div>
            <label for="reason" class="block text-sm font-medium text-gray-700 mb-1">Reason for Overtime</label>
            <textarea id="reason" rows="4" v-model="reason" placeholder="e.g., Urgent project deadline, critical system maintenance..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
          </div>
          <div class="pt-4 border-t border-gray-200 mt-6">
            <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
  import axios from "axios";
  import store from "../store/index.js";

  export default {
    data(){
      return{
        otDate: '',
        startTime: '',
        endTime: '',
        reason: '',
        success:{
          show: false,
          message:'',
        },
      }
    },
    computed: {
      totalHours() {
        if (this.startTime && this.endTime) {
          const startDate = new Date(`1970-01-01T${this.startTime}:00`);
          const endDate = new Date(`1970-01-01T${this.endTime}:00`);

          if (endDate < startDate) {
            endDate.setDate(endDate.getDate() + 1);
          }

          const diffMs = endDate - startDate;
          if (diffMs > 0) {
            const diffHours = diffMs / 1000 / 60 / 60;
            return `${diffHours.toFixed(2)} hours`;
          }
        }
        return '0.00 hours';
      }
    },
    methods: {
      submitRequest() {
        $.LoadingOverlay("show")
        if (!this.otDate || !this.startTime || !this.endTime || !this.reason) {
          alert('Please fill out all required fields.');
          return;
        }

        const requestData = {
          employee_id: store.state.auth.user.id,
          date: this.otDate,
          start_time: this.startTime,
          end_time: this.endTime,
          reason: this.reason,
          totalHours: this.totalHours
        };
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/request-overtime/store`, requestData)
        .then(response => {
          if(response.status === 201){
            this.otDate = '';
            this.startTime = '';
            this.endTime = '';
            this.reason = '';
            this.success.message = response.data.message;
            this.success.show = true;
          }
          $.LoadingOverlay("hide")
        }).catch(error => {
          console.log(error);
          $.LoadingOverlay("hide")
        })
      }
    }
  }
</script>