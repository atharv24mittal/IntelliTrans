let map, userMarker;

function initMap() {
    const center = { lat: 12.8688906, lng: 77.6650548 }; 
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: center,
    });

    // Call a function to fetch camera locations and add markers to the map
    fetchCameraLocations();
}

function fetchCameraLocations() {
    // This is a placeholder function to simulate fetching camera locations
    // Replace this with your actual logic to fetch camera locations from a server or database
    // For demo purposes, let's add a single camera location
    const cameraLocations = [
        { lat: 12.870041, lng: 77.6507871 }, // Camera location 1 
        { lat: 12.8688906, lng: 77.7507871 },    // Camera location 2 
        // Add more camera locations as needed
    ];

    // Add markers for camera locations
    cameraLocations.forEach(location => {
        const cameraMarker = new google.maps.Marker({
            position: location,
            map: map,
            title: "Traffic Camera",
        });
    });

    // Check if the user is near any camera location
    checkUserDistance(cameraLocations);
}

function checkUserDistance(cameraLocations) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        // Add marker for user's current location
        userMarker = new google.maps.Marker({
            position: userLocation,
            map: map,
            title: "Your Location",
        });

        // Check distance between user and camera locations
        cameraLocations.forEach(cameraLocation => {
            const distance = google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng(userLocation.lat, userLocation.lng),
                new google.maps.LatLng(cameraLocation.lat, cameraLocation.lng)
            );

            // Convert distance from meters to kilometers
            const distanceKm = distance / 1000;

            // Display warning if user is near any camera location
            if (distanceKm <= 1) 
            {
                document.getElementById("camera-warning").textContent = "Warning: Traffic camera ahead! Check your speed.";
                return; // Exit loop if warning displayed
            } 
            else 
            {
                document.getElementById("camera-warning").textContent = "";
            }
        });
    });
}
