<template>
    <!-- Notifications List -->
    <div class="w-full p-8">
            <!-- Today's Notifications -->
            <div>
                <h2 class="text-sm font-semibold text-gray-500 mb-3 px-2">Today</h2>
                <div class="space-y-3">
                    <!-- Unread Notification -->
                    <div class="flex items-start space-x-4 p-3 bg-blue-50 rounded-lg">
                        <div class="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm text-gray-800">
                                <span class="font-bold">Kak Vattana</span> sent you a new message.
                            </p>
                            <p class="text-xs text-gray-500 mt-1">10m ago</p>
                        </div>
                        <div class="w-2.5 h-2.5 bg-blue-600 rounded-full mt-1.5"></div>
                    </div>

                     <!-- Unread Notification Example 2 -->
                    <div class="flex items-start space-x-4 p-3 bg-blue-50 rounded-lg">
                        <div class="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
                           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm text-gray-800">
                                Your <span class="font-bold">Leave Request</span> has been approved.
                            </p>
                            <p class="text-xs text-gray-500 mt-1">45m ago</p>
                        </div>
                        <div class="w-2.5 h-2.5 bg-blue-600 rounded-full mt-1.5"></div>
                    </div>
                </div>
            </div>

            <!-- Yesterday's Notifications -->
            <div class="mt-8">
                <h2 class="text-sm font-semibold text-gray-500 mb-3 px-2">Yesterday</h2>
                <div class="space-y-3">
                     <!-- Read Notification Example -->
                    <div class="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
                        <div class="flex-shrink-0 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm text-gray-700">
                                Your <span class="font-bold">Overtime Request</span> is pending confirmation.
                            </p>
                             <p class="text-xs text-gray-500 mt-1">1 day ago</p>
                        </div>
                    </div>

                    <!-- Read Notification -->
                    <div class="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
                         <div class="flex-shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
                           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm text-gray-700">
                                A new <span class="font-bold">Weekly Report</span> is available for you to view.
                            </p>
                            <p class="text-xs text-gray-500 mt-1">1 day ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>