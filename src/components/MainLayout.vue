<template>
    <nav class="bg-blue-600 py-3 flex justify-center items-center shadow-lg min-h-[52px]">
        <div id="nav-content" class="w-[65%] max-w-[600px] mx-auto relative">
            <header class="flex justify-between items-center">
                <!-- left side -->
                    <!-- logo -->
                    <div v-if="isHome" class="flex items-center space-x-2">
                        <div class="bg-white p-1 rounded-md">
                            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h1 class="text-white font-bold text-lg">Checkplify</h1>
                    </div>
                    <!-- end logo -->

                    <!-- back button -->
                    <router-link id="back-button" v-if="!isHome" to="/" class="text-white">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </router-link>
                    <!-- end back button -->
                <!-- end left side -->

                <!-- center side -->
                    <div v-if="!isHome" class="text-white text-lg font-semibold">
                        <span class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">{{ $route.name }}</span>
                    </div>
                <!-- end center side -->
               
                <!-- right side -->
                <div class="flex items-center space-x-2">
                    <!-- profile button -->
                        <router-link to="/profile" class="text-white">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </router-link>
                    <!-- end profile button -->
                 </div>
                <!-- end right side -->
            </header>

        </div>
    </nav>
    <main class="bg-[#ffffff] h-[calc(100vh-52px)]">
        <div id="main-content" style="overflow-y: scroll;" class="w-[65%] max-w-[600px] mx-auto shadow-md h-full flex justify-center items-start">
            <router-view></router-view>
        </div>
    </main>
</template>

<script>
export default {
    name: 'MainLayout',
    computed: {
        isHome() {
            return this.$route.path === '/';
        }
    },
    data() {
        return {
            name:"MainLayout"
        }
    }
}
</script>

<style scoped>

#back-button{
    &:hover{
        opacity: 0.8;
    }
}

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