<template>
    <nav class="bg-blue-600 py-3 flex justify-center items-center shadow-lg">
        <div id="nav-content" class="w-[65%] max-w-[600px] mx-auto">
            <header class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <div class="bg-white p-1 rounded-md">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h1 class="text-white font-bold text-lg">Checkplify</h1>
                </div>
                <button class="text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                </button>
            </header>

        </div>
    </nav>
    <main class="bg-[#2552d2] h-[calc(100vh-52px)]">
        <div id="main-content" class="w-[65%] max-w-[600px] mx-auto shadow-md h-full flex justify-center items-center">
            <router-view></router-view>
        </div>
    </main>
</template>

<script>
export default {
    name: 'MainLayout',
    data() {
        return {
            name:"MainLayout"
        }
    }
}
</script>

<style scoped>

@media all and (max-width: 600px) {

    #nav-content{
        width: 100%;
        max-width: 100%;
        padding: 0 18px;
    }

    #main-content{
        width: 100%;
        max-width: 100%;
        margin: 0;
        padding: 0;
        border-radius: 0;
        box-shadow: none;
        height: 100%;
    }
}

</style>