let redLight, yellowLight, greenLight;
let carCount = 0;

function updateTrafficSignal() {
    if (carCount > 10) {
        redLight.classList.add("active");
        yellowLight.classList.remove("active");
        greenLight.classList.remove("active");
        document.getElementById("traffic-status").textContent = "Too much traffic. Stop!";
    } else if (carCount > 5) {
        redLight.classList.remove("active");
        yellowLight.classList.add("active");
        greenLight.classList.remove("active");
        document.getElementById("traffic-status").textContent = "Moderate traffic. Prepare to stop.";
    } else {
        redLight.classList.remove("active");
        yellowLight.classList.remove("active");
        greenLight.classList.add("active");
        document.getElementById("traffic-status").textContent = "Traffic is moving. Go!";
    }
}

// Simulating car count increment
setInterval(function() {
    carCount++;
    updateTrafficSignal();
}, 5000); // Increment car count every 5 seconds

// Initialize traffic lights
document.addEventListener("DOMContentLoaded", function() {
    redLight = document.getElementById("red-light");
    yellowLight = document.getElementById("yellow-light");
    greenLight = document.getElementById("green-light");
});
