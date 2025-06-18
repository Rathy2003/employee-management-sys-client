<template>
  <div class="container mx-auto p-6">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white p-8">
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
        <form class="space-y-6" @submit.prevent="onSubmit">
          <div>
            <label for="leave-type" class="block text-sm font-medium text-gray-700 mb-1">Leave Title</label>
            <input @keyup="clearErrors" :class="{'is-invalid': errors.title !== ''}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="form_data.title" type="text" placeholder="Enter Leave Title" id="leave-type">
            <div class="mt-2" v-if="errors.title!== ''">
              <span class="text-red-500">{{errors.title}}</span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label for="start-date" class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input @keyup="clearErrors" v-model="form_data.start_date" :class="{'is-invalid': errors.start_date !== ''}" type="date" id="start-date" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <div class="mt-2" v-if="errors.start_date!== ''">
                <span class="text-red-500">{{errors.start_date}}</span>
              </div>
            </div>
            <div>
              <label for="end-date"  class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input @keyup="clearErrors" v-model="form_data.end_date" type="date" id="end-date" :class="{'is-invalid': errors.end_date !== ''}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <div class="mt-2" v-if="errors.end_date!== ''">
                <span class="text-red-500">{{errors.end_date}}</span>
              </div>
            </div>
          </div>

          <div>
            <label for="reason" class="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <textarea @keyup="clearErrors" v-model="form_data.reason" :class="{'is-invalid': errors.reason !== ''}" id="reason" rows="4" placeholder="Please provide a brief reason for your leave..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            <div class="mt-2" v-if="errors.reason!== ''">
              <span class="text-red-500">{{errors.reason}}</span>
            </div>
          </div>
          <!-- Submit Button -->
          <div class="pt-4 border-t border-gray-200 mt-6">
            <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import store from "../store/index.js";

  export default {
    data(){
      return{
        success:{
          show: false,
          message:'',
        },
        form_data:{
          title:"",
          start_date:"",
          end_date:"",
          reason:"",
        },
        errors:{
          title:'',
          reason:'',
          start_date:'',
          end_date:'',
        }
      }
    },
    methods:{
      clearForms(){
        this.form_data.title = "";
        this.form_data.start_date = "";
        this.form_data.end_date = "";
        this.form_data.reason = "";
      },
      clearErrors(){
        this.errors.title = '';
        this.errors.reason = '';
        this.errors.start_date = '';
        this.errors.end_date = '';
        this.errors.reason = '';
      },
      onSubmit (){
        let data = this.form_data
        data.employee_id = store.state.auth.user.id
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/request_leave`,data)
        .then((response) => {
          if(response.status === 201){
            this.clearForms();
            this.success.show = true;
            this.success.message = response.data.message;
          }
        })
        .catch((error) => {
          console.log(error)
          let keys = Object.keys(error.response.data[0])
          for (let key of keys){
            this.errors[key] = error.response.data[0][key][0]
          }
        })
      }
    }
  }
</script>

<style scoped>
  .is-invalid{
    border: 1px solid red;
  }
  @keyframes slideDownFadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-alert-in {
    animation: slideDownFadeIn 0.5s ease-out forwards;
  }
</style>