<template>
    <div>

        <!-- QR Scanner -->
        <div id="qr-reader-container" class="mb-6">
            <div id="qr-reader"></div>
            <div v-if="!showSuccessModal" class="scan-line"></div>
        </div>

        <p class="text-gray-400 mb-8 mt-3">Align QR Code within frame to scan</p>

        <div class="flex justify-center items-center">
            <button @click="$router.push('/')" class="bg-gray-500 w-full text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition duration-300">
                CLOSE
            </button>
        </div>

        <!-- Success Modal -->
        <div v-if="showSuccessModal"
            class="absolute inset-0 bg-black bg-opacity-80 z-10">
            <div class="w-[50%] mx-auto mt-[70px] flex flex-col items-center justify-center p-8 ">
                <div class="bg-white text-green-500 rounded-full p-4 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h2 class="text-3xl font-bold text-white mb-4">Success!</h2>
            <p class="text-gray-300 mb-2">Scanned Value:</p>
            <p class="text-white font-mono break-all mb-8 bg-gray-800 p-2 rounded">{{ scanResult }}</p>
            <button @click="scanAgain"
                class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                Back
            </button>
            </div>
        </div>

        <div v-if="errorMessage" class="mt-4 p-4 bg-red-900 text-red-300 border border-red-700 rounded-lg">
            <p><strong>Error:</strong> {{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup>

import { Html5Qrcode } from 'html5-qrcode';
import { ref, onMounted } from 'vue';

const scanResult = ref(null);
const errorMessage = ref(null);
const showSuccessModal = ref(false);
let html5QrCode = null;

const onScanSuccess = (decodedText, decodedResult) => {
    scanResult.value = decodedText;
    showSuccessModal.value = true;
    console.log(`Code matched = ${decodedText}`, decodedResult);
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            console.log("QR Code scanning stopped.");
        }).catch(err => {
            console.error("Failed to stop scanning.", err);
        });
    }
};

const onScanFailure = (error) => {
    // Failures are frequent, so we won't log them to avoid console spam.
};

const startScanner = () => {
    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 }
    };

    // Request the rear camera
    html5QrCode.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        onScanFailure
    ).catch(err => {
        console.warn(`Failed to start with rear camera: ${err}. Trying any camera.`);
        // If rear camera fails, try any available camera
        html5QrCode.start(
            { }, // Passing empty constraints tries to use any camera
            config,
            onScanSuccess,
            onScanFailure
        ).catch(err2 => {
            errorMessage.value = `Unable to start scanning: ${err2}`;
        });
    });
};

const scanAgain = () => {
    showSuccessModal.value = false;
    scanResult.value = null;
    startScanner();
};

onMounted(() => {
    html5QrCode = new Html5Qrcode("qr-reader");
    startScanner();
});
</script>

<style>
#qr-reader video {
    height: 100%;
    width: 300px !important;
    object-fit: cover; /* This makes the video fill the container, cropping if necessary */
}
#qr-shaded-region{
    inset: -13px !important;
}
</style>

<style scoped>
#qr-reader-container {
    position: relative;
    width: 100%;
    /* Control scanner size */
    margin: 0 auto;
    overflow: hidden;
    /* Hide parts of the scanner line that go outside */
    border-radius: 1rem;
}


#qr-reader {
    border-radius: 1rem;
    border: 4px solid #fff;
    overflow: hidden;
    width: 275px;
    aspect-ratio: 2 / 2;
}

.scan-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
    box-shadow: 0 0 10px #3b82f6, 0 0 20px #3b82f6;
    animation: scan 2.5s infinite linear;
    border-radius: 5px;
}

@keyframes scan {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(340px);
    }

    /* Should be slightly less than container height */
}
</style>