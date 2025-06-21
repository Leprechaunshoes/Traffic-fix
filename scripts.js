// Common 294-355 shortcuts and alternate routes
const alternateRoutes = {
“ohare to downtown”: {
route: “Take I-190 to I-90 East, exit at Addison, take Elston Ave south to North Ave, then east to downtown”,
time: “35-45 minutes”,
distance: “22 miles”
},
“schaumburg to naperville”: {
route: “Take Golf Rd east to Arlington Heights Rd, south to Algonquin Rd, east to Route 53 south”,
time: “25-35 minutes”,
distance: “18 miles”
},
“oak brook to downtown”: {
route: “Take Roosevelt Rd east through Westchester, Bellwood, then continue east to downtown”,
time: “40-50 minutes”,
distance: “20 miles”
},
“elmhurst to midway”: {
route: “Take St. Charles Rd east to Cicero Ave, south to 55th St, west to airport”,
time: “30-40 minutes”,
distance: “15 miles”
}
};

document.getElementById(‘findRoute’).addEventListener(‘click’, function() {
const departure = document.getElementById(‘departure’).value.toLowerCase();
const destination = document.getElementById(‘destination’).value.toLowerCase();

```
if (!departure || !destination) {
    alert('Please enter both departure and destination');
    return;
}

// Simple route matching
const routeKey = `${departure} to ${destination}`;
const reverseKey = `${destination} to ${departure}`;

let route = alternateRoutes[routeKey] || alternateRoutes[reverseKey];

// Fallback for partial matches
if (!route) {
    for (let key in alternateRoutes) {
        if (key.includes(departure) || key.includes(destination)) {
            route = alternateRoutes[key];
            break;
        }
    }
}

const resultsDiv = document.getElementById('routeResults');
const detailsDiv = document.getElementById('routeDetails');

if (route) {
    detailsDiv.innerHTML = `
        <p><strong>Route:</strong> ${route.route}</p>
        <p><strong>Estimated Time:</strong> ${route.time}</p>
        <p><strong>Distance:</strong> ${route.distance}</p>
    `;
    resultsDiv.classList.remove('hidden');
} else {
    detailsDiv.innerHTML = `
        <p>No specific alternate route found. Try avoiding 294-355 by using:</p>
        <p>• Surface streets like Roosevelt, Ogden, or North Ave</p>
        <p>• Route 53 or Route 83 as north-south alternatives</p>
    `;
    resultsDiv.classList.remove('hidden'); 
}
```

});
