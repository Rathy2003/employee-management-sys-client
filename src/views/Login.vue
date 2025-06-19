<template>
    <div class="flex flex-col md:flex-row min-h-screen">
        <div class="w-full md:w-1/2 bg-white flex flex-col justify-center p-8 sm:p-12">
            <div class="w-full max-w-md mx-auto">
                <div class="mb-8">
                    <h1 class="text-4xl sm:text-5xl font-bold text-blue-600">Hello !</h1>
                    <h1 class="text-4xl sm:text-5xl font-bold text-blue-600">Welcome Back!</h1>
                </div>
                <h2 class="text-5xl sm:text-6xl font-bold text-blue-600 mb-10">Log In</h2>
                <form @submit.prevent="login">
                    <div v-if="errors.email == 'Invalid email or password'">
                        <span class="text-red-500 text-sm mt-3">
                            {{ errors.email }}
                        </span>
                    </div>
                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-bold text-blue-600">Email</label>
                        <input @input="errors.email = ''" v-model="form_data.email" type="email" id="email"
                            placeholder="Enter Your Email" :class="{ 'is-invalid': errors.email }"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <div v-if="errors.email != '' && errors.email != 'Invalid email or password'"
                            class="invalid-feedback text-red-500 text-sm mt-3">
                            <span>{{ errors.email }}</span>
                        </div>
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-bold text-blue-600">Password</label>
                        <input @input="errors.password = ''" v-model="form_data.password" type="password" id="password"
                            placeholder="Enter Your Password" :class="{ 'is-invalid': errors.password }"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <div v-if="errors.password != '' && errors.password != 'Invalid email or password'"
                            class="invalid-feedback text-red-500 text-sm mt-3">
                            <span>{{ errors.password }}</span>
                        </div>
                    </div>

<!--                    <div class="mb-6">-->
<!--                        <router-link to="/reset-password" class="text-sm text-gray-600 hover:text-blue-600">Forget-->
<!--                            password?</router-link>-->
<!--                    </div>-->
                    <button type="submit"
                        class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mb-6">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../store/index.js';
import axios from 'axios';

export default {
    name: 'Login',
    data() {
        return {
            form_data: {
                email: '',
                password: ''
            },
            errors: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async login() {
          $.LoadingOverlay("show")
            if (this.form_data.email === '') {
                this.errors.email = 'Email is required';
            }
            if (this.form_data.password === '') {
                this.errors.password = 'Password is required';
            }
            if (this.form_data.email !== '' && this.form_data.password !== '') {
                axios.post(import.meta.env.VITE_API_BASE_URL + '/process-login', this.form_data)
                    .then(async response => {
                        if (response.status === 200) {
                            const token = response.data.token;
                            localStorage.setItem('_token', token);
                            const success = await store.dispatch('auth/verifyToken');

                            if (success) {
                                $.LoadingOverlay("hide")
                                this.$router.push('/');
                            } else {
                                console.log('Token verification failed after login');
                              $.LoadingOverlay("hide")
                            }
                        }
                    })
                    .catch(error => {
                        if (error.response && error.response.data) {
                            let keys = Object.keys(error.response.data);
                            for (let i = 0; i < keys.length; i++) {
                                this.errors[keys[i]] = error.response.data[keys[i]];
                            }
                            if (this.errors.email === 'Invalid email or password') {
                                this.errors.password = 'Invalid email or password';
                            }
                            $.LoadingOverlay("hide")
                        } else {
                            alert('Login failed:', error)
                            this.errors.email = 'Something went wrong. Please try again.';
                            $.LoadingOverlay("hide")
                        }
                    })
            }

        }
    }
}
</script>

<style scoped>
.is-invalid {
    border-color: #dc3545;
}

.invalid-feedback {
    display: none;
}

.is-invalid+.invalid-feedback {
    display: block;
}
</style>