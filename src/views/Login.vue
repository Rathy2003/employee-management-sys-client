<template>
    <div class="flex flex-col md:flex-row min-h-screen">
        <div class="w-full md:w-1/2 bg-white flex flex-col justify-center p-8 sm:p-12">
            <div class="w-full max-w-md mx-auto">
                <div class="mb-8">
                    <h1 class="text-4xl sm:text-5xl font-bold text-blue-600">Hello !</h1>
                    <h1 class="text-4xl sm:text-5xl font-bold text-blue-600">Welcome to SU1</h1>
                </div>
                <h2 class="text-5xl sm:text-6xl font-bold text-blue-600 mb-10">Log In</h2>
                <form>
                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-bold text-blue-600">Email</label>
                        <input type="email" id="email" placeholder="Enter Your Email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-bold text-blue-600">Password</label>
                        <input type="password" id="password" placeholder="Enter Your Password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="mb-6">
                        <a href="#" class="text-sm text-gray-600 hover:text-blue-600">Forget password?</a>
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mb-6">Login</button>
                    <div class="text-left text-sm text-gray-600 mb-8">
                        No have account? <a href="#" class="font-bold text-blue-600 hover:underline">Create account</a>
                    </div>
                    <div class="flex space-x-4">
                        <div class="w-10 h-10 bg-blue-600 rounded-lg"></div>
                        <div class="w-10 h-10 bg-blue-600 rounded-lg"></div>
                        <div class="w-10 h-10 bg-blue-600 rounded-lg"></div>
                    </div>
                </form>
            </div>
        </div>
        <div class="hidden md:block md:w-1/2 bg-gray-300"></div>
    </div>
</template>