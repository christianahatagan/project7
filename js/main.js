function closeAlert() {
    const alertBox = document.querySelector('.alert');
    alertBox.style.display = 'none';
}

// Define data for different time ranges
const trafficData = {
    hourly: [100, 200, 150, 300, 250, 100, 350, 300], // Hourly data (example)
    daily: [750, 1250, 1000, 2000, 1500, 1750, 2250], // Daily data (example)
    weekly: [5000, 7000, 8000, 9500, 11000],          // Weekly data (example)
    monthly: [20000, 15000, 18000, 25000, 23000]      // Monthly data (example)
};

// Get chart element
const trafficChartElement = document.getElementById('trafficChart');

// Initial chart setup
let trafficChart = new Chart(trafficChartElement, {
    type: 'line',
    data: {
        labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3'],
        datasets: [{
            label: 'Traffic',
            data: trafficData.daily, // Start with daily data
            backgroundColor: 'rgba(130, 130, 238, 0.2)',
            borderColor: 'rgba(130, 130, 238, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: 'white',
            pointBorderColor: 'rgba(130, 130, 238, 1)',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});



// Function to update chart data
function updateTrafficChart(timeframe) {
    let newData;
    let newLabels;

    switch (timeframe) {
        case 'hourly':
            newData = trafficData.hourly;
            newLabels = ['12am', '4am', '8am', '12pm', '4pm', '8pm', '12am'];
            break;
        case 'daily':
            newData = trafficData.daily;
            newLabels = ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3'];
            break;
        case 'weekly':
            newData = trafficData.weekly;
            newLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
            break;
        case 'monthly':
            newData = trafficData.monthly;
            newLabels = ['January', 'February', 'March', 'April', 'May'];
            break;
        default:
            newData = trafficData.daily;
            newLabels = ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3'];
    }

    trafficChart.data.labels = newLabels; // Update the labels
    trafficChart.data.datasets[0].data = newData; // Update the data
    trafficChart.update(); // Re-render the chart with new data
}

// Add event listeners to the buttons
document.querySelectorAll('.time-buttons button').forEach(button => {
    button.addEventListener('click', (e) => {
        // Get the timeframe from the button text and update the chart
        const timeframe = e.target.innerText.toLowerCase();
        updateTrafficChart(timeframe);
    });
});


const dailyTrafficChart = new Chart(document.getElementById('dailyTrafficChart'), {
    type: 'bar',
    data: {
        labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'], // Days of the week
        datasets: [{
            label: 'Daily Traffic',
            data: [75, 115, 175, 125, 225, 200, 100], // Sample daily traffic data
            backgroundColor: 'rgba(130, 130, 238, 0.7)',
            borderColor: 'rgba(130, 130, 238, 1)',
            borderWidth: 1,
            borderRadius: 5 // Round corners on the bars
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});


const mobileUsersChart = new Chart(document.getElementById('mobileUsersChart'), {
    type: 'doughnut',
    data: {
        labels: ['Desktop', 'Tablet', 'Phones'], // Device types
        datasets: [{
            label: 'Mobile Users',
            data: [2000, 550, 500], // Sample device usage data
            backgroundColor: [
                'rgba(130, 130, 238, 0.7)', // Desktop color
                'rgba(72, 72, 232, 0.7)',   // Tablet color
                'rgba(60, 180, 120, 0.7)'   // Phone color
            ],
            borderColor: 'white',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right', // Mută legenda în dreapta
                align: 'center',   // Aliniază etichetele la centru
                labels: {
                    boxWidth: 20,  // Dimensiunea pătrățelului de culoare lângă etichete
                    padding: 20,   // Spațiu între etichete
                }
            }
        }
    }
});

// Sample notifications
let notifications = [
    { id: 1, message: "You have 6 unread messages" },
    { id: 2, message: "You have 3 new followers" }
];

// Function to render notifications
function renderNotifications() {
    const notificationList = document.getElementById('notificationList');
    notificationList.innerHTML = ''; // Clear previous notifications

    notifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.classList.add('notification-item');
        notificationItem.setAttribute('data-id', notification.id);

        const notificationText = document.createElement('span');
        notificationText.textContent = notification.message;

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✖';
        closeBtn.classList.add('close-btn');
        closeBtn.onclick = () => removeNotification(notification.id);

        notificationItem.appendChild(notificationText);
        notificationItem.appendChild(closeBtn);

        notificationList.appendChild(notificationItem);
    });
    updateBellIcon();
}

// Function to remove a notification
function removeNotification(id) {
    const index = notifications.findIndex(notification => notification.id === id);
    if (index > -1) {
        notifications.splice(index, 1);
        renderNotifications(); // Re-render notifications
    }
}

// Function to show or hide the green dot
function updateBellIcon() {
    const bellIcon = document.querySelector('.bell-icon');
    const badge = document.querySelector('.badge');
    const notificationList = document.getElementById('notificationList');
    if (notifications.length === 0) {
        notificationList.style.display='none';
        badge.style.display = 'none'; // Hide the green dot
    } else {
        badge.style.display = 'block'; // Show the green dot
    }
}
// Event listener for the bell icon click
document.querySelector('.bell-icon').addEventListener('click', () => {
    const notificationList = document.getElementById('notificationList');
    
    // Toggle visibility of notifications
    if (notificationList.style.display === 'block') {
        notificationList.style.display = 'none'; // Hide the notifications
    } else {
        notificationList.style.display = 'block'; // Show the notifications
    }
});

// Initially render the notifications
renderNotifications();

document.getElementById("messageForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const user = document.getElementById("searchUser").value.trim();
    const message = document.getElementById("messageTextarea").value.trim();

    const userError = document.getElementById("userError");
    const messageError = document.getElementById("messageError");

    const confirmationMessage = document.getElementById("confirmationMessage");

    let isValid = true;
    if (user === "") {
        userError.style.display = "block"; // Show the error message
        isValid = false;
    } else {
        userError.style.display = "none"; // Hide the error message
    }
    if (message === "") {
        messageError.style.display = "block"; // Show the error message
        isValid = false;
    } else {
        messageError.style.display = "none"; // Hide the error message
    }
    if (isValid) {
        confirmationMessage.style.display = "block";
        setTimeout(() => {
            confirmationMessage.style.display = "none";
        }, 3000);
        document.getElementById("messageForm").reset();
    }
});


document.querySelectorAll('.slideButton').forEach(slider => {
    slider.addEventListener('change', function () {
        const onOffText = this.parentElement.querySelector('.on-off-text');
        if (this.checked) {
            onOffText.textContent = 'ON';
        } else {
            onOffText.textContent = 'OFF';
        }
    });
});
