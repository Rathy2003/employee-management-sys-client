<template>
    <div class="container mx-auto max-w-lg min-h-screen bg-white overflow-hidden">
        <div v-if="tab_index === 0" class="flex-grow flex flex-col justify-center p-8">
            <div class="text-center">
                <div class="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                        </path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Forgot your password?</h2>
                <p class="text-gray-600 mb-8">
                    No worries! Please enter the email address associated with your account. We will send you an OTP to
                    reset your password.
                </p>
                <form @submit.prevent="requestOtp" class="space-y-6">
                    <div class="text-left">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" id="email" v-model="email" placeholder="you@example.com"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required>
                    </div>
                    <button type="submit"
                        class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                        Send OTP
                    </button>
                </form>
            </div>
        </div>

        <div v-if="tab_index === 1" class="flex-grow flex flex-col justify-center p-8">
            <div class="text-center">
                <div class="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                        </path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Enter OTP Code</h2>
                <p class="text-gray-600 mb-8">
                    We have sent a 4-digit verification code to <span class="font-semibold text-gray-800">{{ maskedEmail
                    }}</span>.
                </p>
                <form @submit.prevent="verifyOtp">
                    <div class="flex justify-center space-x-3 mb-6">
                        <input type="text" class="otp-input" v-model="otp[0]" @keyup="handleInput" ref="otpInput0"
                            maxlength="1" pattern="[0-9]" required>
                        <input type="text" class="otp-input" v-model="otp[1]" @keyup="handleInput" ref="otpInput1"
                            maxlength="1" pattern="[0-9]" required>
                        <input type="text" class="otp-input" v-model="otp[2]" @keyup="handleInput" ref="otpInput2"
                            maxlength="1" pattern="[0-9]" required>
                        <input type="text" class="otp-input" v-model="otp[3]" @keyup="handleInput" ref="otpInput3"
                            maxlength="1" pattern="[0-9]" required>
                    </div>
                    <button type="submit"
                        class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                        Verify
                    </button>
                </form>
                <div class="mt-6 text-sm">
                    <p class="text-gray-600">
                        Didn't receive the code?
                        <a href="#" @click.prevent="resendOtp"
                            :class="{ 'opacity-50 pointer-events-none': isResendDisabled }"
                            class="font-semibold text-blue-600 hover:underline">Resend OTP</a>
                        <span v-if="isResendDisabled">{{ timerText }}</span>
                    </p>
                </div>
            </div>
        </div>

        <div v-if="tab_index === 2" class="flex-grow flex flex-col justify-center p-8">
          <div class="text-center">
            <div class="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Set Your New Password</h2>
            <br/>
            <!-- Success Alert -->
            <div id="success-alert" :style="{display:success.show ? '' : 'none'}" class="relative bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-lg shadow-md animate-alert-in mb-5" role="alert">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm">{{success.message}}</p>
                </div>
                <button @click="success.show = false" type="button" class="absolute top-2 right-2 ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8" data-dismiss-target="#success-alert" aria-label="Close">
                  <span class="sr-only">Dismiss</span>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
            </div>
            <!-- End Success Alert -->
            <form class="space-y-5" @submit.prevent="onSaveChangePassword">
              <div class="relative text-left">
                <label for="new-password" class="block mb-2 text-sm font-medium text-gray-700">New Password</label>
                <input v-model="password" type="password" id="new-password" :class="password_confirmation_msg !== '' ? 'border-red-500': ''" placeholder="Enter your new password" class="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                <button type="button" class="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-sm leading-5" @click="togglePasswordVisibility('new-password')">
                  <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <div class="relative text-left">
                <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-700">Confirm New Password</label>
                <input v-model="cf_password" :class="password_confirmation_msg !== '' ? 'border-red-500': ''" type="password" id="confirm-password" placeholder="Confirm your new password" class="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                <button  type="button" class="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-sm leading-5" @click="togglePasswordVisibility('confirm-password')">
                  <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <div v-if="password_confirmation_msg !== ''" class="text-left text-red-500">
                  Password doesn't match
              </div>

              <button v-if="!success.show" type="submit" class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
                Update Password
              </button>
              <router-link to="/login" v-else class="block w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
                Go Login
              </router-link>
            </form>
          </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'ResetPassword',
    data() {
        return {
            tab_index: 0,
            email: '',
            otp: ['', '', '', ''],
            countdown: 30,
            timerInterval: null,
            password:"",
            cf_password:"",
            password_confirmation_msg:"",
            success:{
              show: false,
              message:'',
            }
        }
    },
    computed: {
        headerText() {
            return this.tab_index === 0 ? 'Reset Password' : 'OTP Verification';
        },
        isResendDisabled() {
            return this.countdown > 0;
        },
        timerText() {
            return `(0:${String(this.countdown).padStart(2, '0')})`;
        },
        maskedEmail() {
            if (!this.email) return '';
            const [name, domain] = this.email.split('@');
            return `${name.substring(0, 3)}*****@${domain}`;
        }
    },
    methods: {
        togglePasswordVisibility(fieldId) {
          const passwordField = document.getElementById(fieldId);
          if (passwordField.type === 'password') {
            passwordField.type = 'text';
          } else {
            passwordField.type = 'password';
          }
        },
        onSaveChangePassword(){
          this.password_confirmation_msg = "";
          if(this.password !== this.cf_password){
            this.password_confirmation_msg = "Passwords do not match";
            return;
          }
          $.LoadingOverlay("show")
          axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/change-password`, {
            email: this.email,
            password: this.password,
            confirm_password: this.cf_password,
          }).then(response => {
            if(response.status === 200){
              this.password_confirmation_msg = ""
              this.password = ""
              this.cf_password = ""
              this.success.show = true;
              this.success.message = response.data.message;
            }
            $.LoadingOverlay("hide")
          }).catch(error => {
            $.LoadingOverlay("hide")
            console.log(error);
          })
        },
        goBack() {
            if (this.tab_index === 1) {
                this.tab_index = 0;
                clearInterval(this.timerInterval);
            } else {
                // Handle navigation for the first screen, e.g., window.history.back()
                console.log("Navigating back from email screen.");
            }
        },
        requestOtp() {
            if (this.email) {
              $.LoadingOverlay("show")
              axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/resetPassword`,{
                email: this.email
              }).then(response => {
                if(response.status === 200){
                  this.tab_index = 1;
                  this.startTimer();
                  this.$nextTick(() => {
                    this.$refs.otpInput0.focus();
                  });
                }
                $.LoadingOverlay("hide")
              }).catch(error => {
                  $.LoadingOverlay("hide")
                  console.log(error);
              })
            } else {
                alert('Please enter your email address.');
            }
        },
        handleInput(e) {
            const input = e.target;
            const value = input.value;
            const prevInput = input.previousElementSibling;
            const nextInput = input.nextElementSibling;

            if (!/^[0-9]$/.test(value) && value !== '') {
                input.value = this.otp[Array.from(input.parentNode.children).indexOf(input)] = '';
                return;
            }

            if (value !== '' && nextInput) {
                nextInput.focus();
            }

            if (e.key === 'Backspace' && !value && prevInput) {
                prevInput.focus();
            }
        },
        verifyOtp() {
            const enteredOtp = this.otp.join('');
            if (enteredOtp.length === 4) {
                $.LoadingOverlay("show")
                axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/verify-code`,{
                  email: this.email,
                  code: enteredOtp,
                }).then(response => {
                  if(response.status === 200){
                    this.tab_index = 2;
                  }
                  $.LoadingOverlay("hide")
                }).catch(error => {
                  $.LoadingOverlay("hide")
                  console.log(error);
                })
            } else {
                alert('Please enter all 4 digits.');
            }
        },
        startTimer() {
            clearInterval(this.timerInterval);
            this.countdown = 30;
            this.timerInterval = setInterval(() => {
                this.countdown--;
                if (this.countdown <= 0) {
                    clearInterval(this.timerInterval);
                }
            }, 1000);
        },
        resendOtp() {
            if (this.isResendDisabled) return;
            console.log('Resending OTP...');
            this.startTimer();
            this.otp = ['', '', '', ''];
            this.$refs.otpInput0.focus();
        }
    }
}
</script>

<style scoped>
body {
    font-family: 'Inter', sans-serif;
}

.otp-input {
    width: 3.5rem;
    height: 3.5rem;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 600;
    border-radius: 0.5rem;
    border: 1px solid #D1D5DB;
    /* gray-300 */
    transition: border-color 0.2s, box-shadow 0.2s;
}

.otp-input:focus {
    outline: none;
    border-color: #3B82F6;
    /* blue-500 */
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
}

.otp-input::-webkit-outer-spin-button,
.otp-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>