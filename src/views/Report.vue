<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Attendance Report</h2>
    <div
        class="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <div class="w-full sm:w-auto">
        <label for="start-date" class="block text-sm font-medium text-gray-700">Start Date</label>
        <input type="date" id="start-date"
               class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      <div class="w-full sm:w-auto">
        <label for="end-date" class="block text-sm font-medium text-gray-700">End Date</label>
        <input type="date" id="end-date"
               class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      <button class="w-full sm:w-auto self-end px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Apply
      </button>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
          <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-3xl font-bold text-gray-800">289</p>
        <p class="text-sm text-gray-500">Total Present</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
          <svg class="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-3xl font-bold text-gray-800">12</p>
        <p class="text-sm text-gray-500">Total Absent</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
        <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
          <svg class="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-3xl font-bold text-gray-800">34</p>
        <p class="text-sm text-gray-500">Total Late</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
        <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
          <svg class="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <p class="text-3xl font-bold text-gray-800">5</p>
        <p class="text-sm text-gray-500">On Leave</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Attendance Summary</h3>
        <!-- FIX: Added a wrapper with a defined height -->
        <div class="relative h-64 md:h-72">
          <canvas id="attendanceSummaryChart"></canvas>
        </div>
      </div>
      <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Monthly Trend</h3>
        <!-- FIX: Added a wrapper with a defined height -->
        <div class="relative h-64 md:h-72">
          <canvas id="monthlyTrendChart"></canvas>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  mounted() {
    this.initializeCharts()
  },
  data() {
    return {}
  },
  methods: {
    createSafeChart(canvasId, config) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) {
        console.error(`Canvas element with id '${canvasId}' not found.`);
        return;
      }
      const existingChart = Chart.getChart(canvas);
      if (existingChart) {
        existingChart.destroy();
      }
      new Chart(canvas, config);
    },

    initializeCharts() {
      const summaryData = {
        labels: ['Present', 'Absent', 'Late', 'On Leave'],
        datasets: [{
          label: 'Attendance Summary',
          data: [289, 12, 34, 5],
          backgroundColor: ['#10B981', '#EF4444', '#F59E0B', '#6366F1'],
          hoverOffset: 4
        }]
      };

      const summaryConfig = {
        type: 'doughnut',
        data: summaryData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {legend: {position: 'bottom'}}
        }
      };

      this.createSafeChart('attendanceSummaryChart', summaryConfig);

      const trendData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Present Days',
          data: [20, 22, 19, 21, 23, 22],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1
        }, {
          label: 'Absent Days',
          data: [1, 0, 2, 0, 1, 0],
          backgroundColor: 'rgba(239, 68, 68, 0.5)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 1
        }]
      };

      const trendConfig = {
        type: 'bar',
        data: trendData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {y: {beginAtZero: true}},
          plugins: {legend: {position: 'top'}}
        }
      };

      this.createSafeChart('monthlyTrendChart', trendConfig);
    }
  }
}

</script>