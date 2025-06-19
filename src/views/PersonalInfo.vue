<template>
    <div class="p-6 w-full">
        <form class="space-y-5" @submit.prevent="SaveChanges">
            <div>
                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-700">First Name</label>
                <input type="text" id="first_name" v-model="form_data.first_name" :class="{'border-red-500': errors.firstname}" class="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <div v-if="errors.firstname" class="text-red-500 text-sm mt-2">
                    {{ errors.firstname }}
                </div>
            </div>

            <div>
                <label for="last_name" class="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" id="last_name" v-model="form_data.last_name" :class="{'border-red-500': errors.lastname}" class="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <div v-if="errors.lastname" class="text-red-500 text-sm mt-2">
                    {{ errors.lastname }}
                </div>
            </div>
            
            <div>
                <label for="phone-number" class="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" id="phone-number" v-model="form_data.phone" @input="formatPhone" :class="{'border-red-500': errors.phone}" class="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <div v-if="errors.phone_number" class="text-red-500 text-sm mt-2">
                    {{ errors.phone_number }}
                </div>
            </div>
            
            <div>
                <label for="dob" class="block mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
                <input v-model="form_data.dob" type="date" id="dob" :class="{'border-red-500': errors.dob}" class="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <div v-if="errors.dob" class="text-red-500 text-sm mt-2">
                    {{ errors.dob }}
                </div>
            </div>

            <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                <input :value="form_data.email"  type="email" id="email"  class="w-full px-4 py-3 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" readonly>
                    <p class="text-xs text-gray-500 mt-1">Your email address cannot be changed.</p>
            </div>

            <div>
                <label for="address" class="block mb-2 text-sm font-medium text-gray-700">Address</label>
                <textarea v-model="form_data.address" id="address" rows="3" :class="{'border-red-500': errors.address}" class="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                <div v-if="errors.address" class="text-red-500 text-sm mt-2">
                    {{ errors.address }}
                </div>
            </div>

            <div class="pt-4">
                <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed" :disabled="isDisabledSaveButton">
                    Save Changes
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import axios from 'axios';
import store from '../store/auth';

export default {
    mounted(){
        let user_data = store.state.user;
        this.form_data.first_name = user_data.first_name;
        this.form_data.last_name = user_data.last_name;
        this.form_data.phone = user_data.phone_number;
        this.form_data.email = user_data.email;
        this.form_data.address = user_data.address;
        this.form_data.dob = user_data.dob;
        this.form_data.id = user_data.id;
    },
    computed:{
        isDisabledSaveButton(){
            if(this.form_data.first_name === '' || this.form_data.last_name === '' || this.form_data.phone === '' || this.form_data.address === '' || this.form_data.dob === ''){
                return true;
            }

            let temp_user_data = store.state.user;
            if(temp_user_data.first_name === this.form_data.first_name && temp_user_data.last_name === this.form_data.last_name && temp_user_data.phone_number === this.form_data.phone && temp_user_data.address === this.form_data.address && temp_user_data.dob === this.form_data.dob){
                return true;
            }

            return false;
        }
    },
    data(){
        return{
            form_data:{
                id: '',
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                address: '',
                dob: '',
            },
            errors:{
                firstname: '',
                lastname: '',
                phone_number: '',
                address: '',
                dob: '',
            }
        }
    },
    methods:{
        SaveChanges(){
            $.LoadingOverlay("show")
            let input = {
                id: this.form_data.id,
                firstname: this.form_data.first_name,
                lastname: this.form_data.last_name,
                phone_number: this.form_data.phone,
                address: this.form_data.address,
                dob: this.form_data.dob,
                company_id: store.state.user.company_id,
            }
            axios.post(import.meta.env.VITE_API_BASE_URL + '/user/update', input)
            .then(res => {
                if(res.status === 200){
                    localStorage.setItem('_token',res.data.token);
                    let temp_user_data = store.state.user;
                    temp_user_data.first_name = this.form_data.first_name;
                    temp_user_data.last_name = this.form_data.last_name;
                    temp_user_data.phone_number = this.form_data.phone;
                    temp_user_data.address = this.form_data.address;
                    temp_user_data.dob = this.form_data.dob;
                  this.$store.commit('auth/setUser', temp_user_data);
                }
              $.LoadingOverlay("hide")
            }).catch(err => {
                if(err.status === 422){
                    let keys = Object.keys(err.response.data[0]);
                    for(let i = 0; i < keys.length; i++){
                        this.errors[keys[i]] = err.response.data[0][keys[i]][0];
                    }
                }
                $.LoadingOverlay("hide")
                console.log(err);
            })
        },
        formatPhone() {
          let digits = this.form_data.phone.replace(/\D/g, '');
          if (digits.length > 0 && digits[0] !== '0') {
            digits = '0' + digits;
          }
          digits = digits.substring(0, 10);

          if (digits.length <= 3) {
            this.form_data.phone = digits;
          } else if (digits.length <= 6) {
            this.form_data.phone = `${digits.slice(0, 3)} ${digits.slice(3)}`;
          } else {
            this.form_data.phone = `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
          }
        },
    }

}

</script>