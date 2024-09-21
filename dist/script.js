import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAJTsDmD4-T-_QpskXMaKxEFanw0MBMQ-U",
    authDomain: "monitoring-konsentrator.firebaseapp.com",
    databaseURL: "https://monitoring-konsentrator-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "monitoring-konsentrator",
    storageBucket: "monitoring-konsentrator.appspot.com",
    messagingSenderId: "429163813782",
    appId: "1:429163813782:web:62f6e69ef0cf153fc51bb7",
    measurementId: "G-QF4LP1Q1SF"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM elements
const trackerPosition = document.getElementById('trackerPosition');
const powerOutput = document.getElementById('powerOutput');
const batteryLevel = document.getElementById('batteryLevel');
const btnManual = document.getElementById('btnManual');
const btnAuto = document.getElementById('btnAuto');

// Chart.js setup
const ctx = document.getElementById('powerChart').getContext('2d');
const powerChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Power Output (W)',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'minute'
                }
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

// Mengambil data dari Firebase Realtime Database
const dataRef = ref(database, 'sensorData');
onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    console.log('Data received:', data);

    // Update UI
    trackerPosition.textContent = `Tracker Position: ${data.trackerPosition}`;
    powerOutput.textContent = `Power Output: ${data.powerOutput}`;
    batteryLevel.textContent = `Battery Level: ${data.batteryLevel}`;

    // Update chart
    powerChart.data.labels.push(new Date());
    powerChart.data.datasets[0].data.push(data.powerOutput);
    powerChart.update();
});

// Kontrol manual dan otomatis
btnManual.addEventListener('click', () => {
    set(ref(database, 'control'), { mode: 'manual' });
});

btnAuto.addEventListener('click', () => {
    set(ref(database, 'control'), { mode: 'auto' });
});
