<template>
    <div class="container mx-auto max-w-lg min-h-screen bg-white shadow-lg overflow-hidden">
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

        <!-- Main Content: OTP Verification -->
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
    </div>
</template>

<script>
export default {
    name: 'ResetPassword',
    data() {
        return {
            tab_index: 0,
            email: '',
            otp: ['', '', '', ''],
            countdown: 30,
            timerInterval: null
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
                console.log('Requesting OTP for:', this.email);
                this.tab_index = 1;
                this.startTimer();
                // Use $nextTick to wait for the DOM to update before trying to focus
                this.$nextTick(() => {
                    this.$refs.otpInput0.focus();
                });
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
                console.log('Verifying OTP:', enteredOtp);
                alert(`Successfully verified OTP: ${enteredOtp}`);
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