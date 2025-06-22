// Alternate Route - Enhanced JavaScript with Live Updates
// Smart shortcuts for 294-355 traffic

// Expanded route database with more Chicago-area routes
var routes = {
“ohare-downtown”: {
name: “O’Hare to Downtown Chicago”,
directions: “Take I-190 E to I-90 E. Exit Addison St. South on Elston Ave. East on North Ave. Continue to downtown via surface streets”,
time: “35-50 minutes”,
baseTime: 45,
miles: “22 miles”,
notes: “Avoids 294 backup at Cumberland. Best during rush hour 7-9am, 4-7pm.”,
highways: [“I-294”, “I-355”],
alternatives: [“Take Western Ave south”, “Use Ashland Ave corridor”]
},
“downtown-ohare”: {
name: “Downtown Chicago to O’Hare”,
directions: “Take North Ave west. North on Elston Ave. West on Addison St. I-90 W to I-190 W to airport”,
time: “40-55 minutes”,
baseTime: 50,
miles: “22 miles”,
notes: “Reverse route. Add 10 minutes during peak traffic.”,
highways: [“I-294”, “I-355”],
alternatives: [“Take Milwaukee Ave northwest”, “Use Grand Ave to Harlem”]
},
“schaumburg-naperville”: {
name: “Schaumburg to Naperville”,
directions: “Golf Rd east. South on Arlington Heights Rd. East on Algonquin Rd. South on Route 53. West on 75th St to Naperville”,
time: “28-40 minutes”,
baseTime: 35,
miles: “20 miles”,
notes: “Avoids 355/I-88 interchange congestion. Route 53 is key.”,
highways: [“I-355”, “I-88”],
alternatives: [“Use Barrington Rd to 90th St”, “Take Roselle Rd south”]
},
“naperville-schaumburg”: {
name: “Naperville to Schaumburg”,
directions: “75th St east to Route 53. North on Route 53. West on Algonquin Rd. North on Arlington Heights Rd. West on Golf Rd”,
time: “28-40 minutes”,
baseTime: 35,
miles: “20 miles”,
notes: “Reverse route avoiding 355 backup.”,
highways: [“I-355”, “I-88”],
alternatives: [“Use 95th St to Lemont Rd”, “Take Book Rd north”]
},
“oakbrook-downtown”: {
name: “Oak Brook to Downtown”,
directions: “Roosevelt Rd east through Westchester, Bellwood. Continue east via Roosevelt to downtown”,
time: “45-60 minutes”,
baseTime: 55,
miles: “25 miles”,
notes: “Consistent alternative to 294. Slower but reliable.”,
highways: [“I-294”, “I-290”],
alternatives: [“Take Ogden Ave east”, “Use Lake St corridor”]
},
“elmhurst-midway”: {
name: “Elmhurst to Midway Airport”,
directions: “St. Charles Rd east. South on Cicero Ave. West on 55th St to Midway Airport”,
time: “25-35 minutes”,
baseTime: 30,
miles: “12 miles”,
notes: “Direct route avoiding highway congestion to airport.”,
highways: [“I-294”, “I-55”],
alternatives: [“Take North Ave to Harlem”, “Use Mannheim Rd south”]
},
“midway-elmhurst”: {
name: “Midway Airport to Elmhurst”,
directions: “55th St east to Cicero Ave. North on Cicero Ave. West on St. Charles Rd to Elmhurst”,
time: “25-35 minutes”,
baseTime: 30,
miles: “12 miles”,
notes: “Reverse airport route.”,
highways: [“I-294”, “I-55”],
alternatives: [“Take Harlem Ave north”, “Use LaGrange Rd north”]
},
// New expanded routes
“evanston-downtown”: {
name: “Evanston to Downtown”,
directions: “Take Sheridan Rd south. Continue on Lake Shore Drive south to downtown”,
time: “35-45 minutes”,
baseTime: 40,
miles: “18 miles”,
notes: “Scenic lakefront route. Avoid during Cubs games.”,
highways: [“I-94”],
alternatives: [“Take Ridge Ave to Western”, “Use Clark St south”]
},
“lakeview-ohare”: {
name: “Lakeview to O’Hare”,
directions: “Take Addison west. North on Elston. Continue to I-90 W to I-190 W”,
time: “45-60 minutes”,
baseTime: 52,
miles: “25 miles”,
notes: “Avoids Kennedy Expressway backup. Good Cubs game alternative.”,
highways: [“I-90”, “I-94”],
alternatives: [“Take Irving Park west”, “Use Montrose to Harlem”]
},
“aurora-downtown”: {
name: “Aurora to Downtown”,
directions: “Take Ogden Ave east through Downers Grove, Hinsdale. Continue east to downtown”,
time: “55-75 minutes”,
baseTime: 65,
miles: “35 miles”,
notes: “Reliable west suburb route. Slower but consistent.”,
highways: [“I-88”, “I-294”],
alternatives: [“Take Roosevelt Rd east”, “Use North Ave corridor”]
}
};

// Location suggestions for autocomplete
var locationSuggestions = [
“O’Hare Airport”, “Midway Airport”, “Downtown Chicago”, “Loop”,
“Schaumburg”, “Naperville”, “Oak Brook”, “Elmhurst”, “Evanston”,
“Lakeview”, “Lincoln Park”, “Wicker Park”, “Aurora”, “Downers Grove”,
“Arlington Heights”, “Des Plaines”, “Park Ridge”, “Skokie”, “Cicero”,
“Berwyn”, “Forest Park”, “River Forest”, “Wheaton”, “Glen Ellyn”,
“Lombard”, “Villa Park”, “Addison”, “Bensenville”, “Wood Dale”,
“Palatine”, “Rolling Meadows”, “Mount Prospect”, “Prospect Heights”
];

// Traffic status simulation and real-time data
var trafficData = {
currentStatus: ‘moderate’,
lastUpdate: new Date(),
highways: {
‘I-294’: { status: ‘heavy’, incidents: 2 },
‘I-355’: { status: ‘heavy’, incidents: 1 },
‘I-88’: { status: ‘moderate’, incidents: 0 },
‘I-90’: { status: ‘light’, incidents: 0 },
‘I-55’: { status: ‘moderate’, incidents: 1 }
},
alerts: [
{ type: ‘construction’, message: ‘I-294 construction near 95th St’, time: ‘2 hours ago’ },
{ type: ‘accident’, message: ‘I-355 accident cleared at Roosevelt’, time: ‘45 min ago’ },
{ type: ‘weather’, message: ‘Light rain affecting visibility’, time: ‘Live’ }
]
};

// App state management
var appState = {
currentRoute: null,
lastRouteCheck: null,
isOnline: navigator.onLine,
updateInterval: null,
userLocation: null
};

// Utility functions
function cleanText(str) {
if (!str) return “”;
return str.replace(/[””]/g, ‘”’).replace(/[’’]/g, “’”).replace(/[–—]/g, “-”).replace(/\s+/g, “ “).trim();
}

function formatTime(minutes) {
if (minutes < 60) return minutes + “ min”;
const hours = Math.floor(minutes / 60);
const mins = minutes % 60;
return hours + “h “ + (mins > 0 ? mins + “m” : “”);
}

// Enhanced route finding with fuzzy matching
function findRoute(from, to) {
if (!from || !to) return null;

```
from = cleanText(from).toLowerCase().replace(/[^a-z\s]/g, "");
to = cleanText(to).toLowerCase().replace(/[^a-z\s]/g, "");

if (!from || !to) return null;

// Direct key match
var key = from.replace(/\s/g, "") + "-" + to.replace(/\s/g, "");
if (routes[key]) return routes[key];

// Fuzzy matching for common variations
var fromVariations = getLocationVariations(from);
var toVariations = getLocationVariations(to);

for (var routeKey in routes) {
    var parts = routeKey.split("-");
    for (var fromVar of fromVariations) {
        for (var toVar of toVariations) {
            if (parts[0].includes(fromVar) && parts[1].includes(toVar)) {
                return routes[routeKey];
            }
        }
    }
}

return null;
```

}

function getLocationVariations(location) {
var variations = [location.replace(/\s/g, “”)];

```
// Common abbreviations and variations
if (location.includes("ohare") || location.includes("o'hare")) {
    variations.push("ohare");
}
if (location.includes("downtown") || location.includes("loop")) {
    variations.push("downtown");
}
if (location.includes("midway")) {
    variations.push("midway");
}

return variations;
```

}

// Live traffic simulation (in real app, this would call actual APIs)
function updateTrafficData() {
const now = new Date();
const hour = now.getHours();

```
// Simulate rush hour traffic patterns
let baseStatus = 'light';
if ((hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 19)) {
    baseStatus = 'heavy';
} else if ((hour >= 6 && hour <= 10) || (hour >= 15 && hour <= 20)) {
    baseStatus = 'moderate';
}

trafficData.currentStatus = baseStatus;
trafficData.lastUpdate = now;

// Randomly update highway conditions
Object.keys(trafficData.highways).forEach(highway => {
    const rand = Math.random();
    if (rand > 0.8) {
        trafficData.highways[highway].status = 'heavy';
        trafficData.highways[highway].incidents = Math.floor(Math.random() * 3);
    } else if (rand > 0.4) {
        trafficData.highways[highway].status = 'moderate';
        trafficData.highways[highway].incidents = Math.floor(Math.random() * 2);
    } else {
        trafficData.highways[highway].status = 'light';
        trafficData.highways[highway].incidents = 0;
    }
});

updateTrafficDisplay();
updateRouteTimings();
```

}

function updateTrafficDisplay() {
const statusEl = document.getElementById(‘trafficStatus’);
const dot = statusEl.querySelector(’.status-dot’);
const text = statusEl.querySelector(’.status-text’);

```
dot.className = 'status-dot pulsing ' + trafficData.currentStatus;

switch(trafficData.currentStatus) {
    case 'light':
        text.textContent = 'Traffic flowing';
        break;
    case 'moderate':
        text.textContent = 'Moderate delays';
        break;
    case 'heavy':
        text.textContent = 'Heavy congestion';
        break;
}

updateAlerts();
```

}

function updateRouteTimings() {
const presetBtns = document.querySelectorAll(’.preset-btn’);
presetBtns.forEach(btn => {
const routeKey = btn.getAttribute(‘data-route’);
const timeEl = btn.querySelector(’.route-time’);
const statusEl = btn.querySelector(’.route-status’);
const baseTime = parseInt(btn.querySelector(’.route-time’).getAttribute(‘data-base-time’));

```
    if (routes[routeKey]) {
        const route = routes[routeKey];
        let adjustedTime = baseTime;
        
        // Adjust time based on current traffic affecting the highways this route avoids
        route.highways.forEach(highway => {
            const hwStatus = trafficData.highways[highway];
            if (hwStatus) {
                switch(hwStatus.status) {
                    case 'heavy':
                        adjustedTime -= 5; // Our route saves more time
                        break;
                    case 'light':
                        adjustedTime += 3; // Highway might be faster
                        break;
                }
            }
        });
        
        timeEl.textContent = `~${adjustedTime} min`;
        
        // Update status indicator
        if (adjustedTime < baseTime) {
            statusEl.textContent = '🟢'; // Recommended
            btn.classList.add('recommended');
        } else if (adjustedTime > baseTime + 5) {
            statusEl.textContent = '🔴'; // Highway might be better
            btn.classList.remove('recommended');
        } else {
            statusEl.textContent = '🟡'; // Neutral
            btn.classList.remove('recommended');
        }
    }
});
```

}

function updateAlerts() {
const alertsContainer = document.getElementById(‘alertsContainer’);
const alertCount = document.getElementById(‘alertCount’);

```
alertsContainer.innerHTML = '';
alertCount.textContent = trafficData.alerts.length;

trafficData.alerts.forEach(alert => {
    const alertEl = document.createElement('div');
    alertEl.className = 'alert-item';
    
    let icon = '🚨';
    switch(alert.type) {
        case 'construction': icon = '🚧'; break;
        case 'accident': icon = '🚗'; break;
        case 'weather': icon = '🌧️'; break;
    }
    
    alertEl.innerHTML = `
        <span class="alert-icon">${icon}</span>
        <span class="alert-text">${alert.message}</span>
        <span class="alert-time">${alert.time}</span>
    `;
    
    alertsContainer.appendChild(alertEl);
});
```

}

// Enhanced route display with live comparisons
function showRoute(route) {
const resultDiv = document.getElementById(“result”);
const infoDiv = document.getElementById(“routeInfo”);
const titleEl = document.getElementById(“routeTitle”);
const timeBadge = document.getElementById(“timeBadge”);
const trafficBadge = document.getElementById(“trafficBadge”);

```
if (!resultDiv || !infoDiv) return;

if (route) {
    appState.currentRoute = route;
    
    titleEl.textContent = route.name;
    timeBadge.textContent = route.time;
    
    // Determine if route is recommended based on current traffic
    const isRecommended = isRouteRecommended(route);
    trafficBadge.className = `traffic-badge ${isRecommended ? 'recommended' : 'neutral'}`;
    trafficBadge.textContent = isRecommended ? '⚡ Recommended' : '📍 Alternative';
    
    let html = `
        <div class="route-directions">
            <h4>🗺️ Directions</h4>
            <p>${cleanText(route.directions)}</p>
        </div>
        
        <div class="route-stats">
            <div class="stat-grid">
                <div class="stat-item">
                    <span class="stat-label">Distance:</span>
                    <span class="stat-value">${cleanText(route.miles)}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Est. Time:</span>
                    <span class="stat-value">${cleanText(route.time)}</span>
                </div>
            </div>
        </div>
        
        <div class="route-notes">
            <h4>💡 Local Tips</h4>
            <p>${cleanText(route.notes)}</p>
        </div>
    `;
    
    if (route.alternatives && route.alternatives.length > 0) {
        html += `
            <div class="route-alternatives">
                <h4>🔀 Other Options</h4>
                <ul>
                    ${route.alternatives.map(alt => `<li>${alt}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    infoDiv.innerHTML = html;
    updateTrafficComparison(route);
    
} else {
    titleEl.textContent = "No Specific Route Found";
    timeBadge.textContent = "General";
    trafficBadge.className = 'traffic-badge neutral';
    trafficBadge.textContent = '📍 Alternatives';
    
    infoDiv.innerHTML = `
        <div class="general-routes">
            <h4>🛣️ General Alternatives to 294-355</h4>
            <div class="alternative-list">
                <div class="alt-route">
                    <strong>East-West Routes:</strong>
                    <p>Roosevelt Rd, Ogden Ave, North Ave, Lake St</p>
                </div>
                <div class="alt-route">
                    <strong>North-South Routes:</strong>
                    <p>Route 53, Route 83, Harlem Ave, Cicero Ave</p>
                </div>
                <div class="alt-route">
                    <strong>During Rush Hour:</strong>
                    <p>Use surface streets and avoid highway on-ramps</p>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('trafficComparison').style.display = 'none';
}

resultDiv.classList.remove("hidden");
```

}

function isRouteRecommended(route) {
if (!route.highways) return false;

```
// Check if any of the highways this route avoids are currently congested
return route.highways.some(highway => {
    const status = trafficData.highways[highway];
    return status && (status.status === 'heavy' || status.incidents > 0);
});
```

}

function updateTrafficComparison(route) {
const comparisonDiv = document.getElementById(‘trafficComparison’);
const timeDiffEl = document.getElementById(‘timeDiff’);
const highwayStatusEl = document.getElementById(‘highwayStatus’);

```
if (!route.highways) {
    comparisonDiv.style.display = 'none';
    return;
}

comparisonDiv.style.display = 'block';

// Calculate average highway status
let heavyCount = 0;
let totalIncidents = 0;

route.highways.forEach(highway => {
    const status = trafficData.highways[highway];
    if (status) {
        if (status.status === 'heavy') heavyCount++;
        totalIncidents += status.incidents;
    }
});

const avgStatus = heavyCount > route.highways.length / 2 ? 'heavy' : 
                 heavyCount > 0 ? 'moderate' : 'light';

// Estimate time difference
let timeSaved = 0;
switch(avgStatus) {
    case 'heavy':
        timeSaved = 15 + (totalIncidents * 5);
        break;
    case 'moderate':
        timeSaved = 5 + (totalIncidents * 3);
        break;
    case 'light':
        timeSaved = -5; // Highway might be faster
        break;
}

if (timeSaved > 0) {
    timeDiffEl.innerHTML = `<span class="positive">+${timeSaved} min saved</span>`;
} else if (timeSaved < 0) {
    timeDiffEl.innerHTML = `<span class="negative">${Math.abs(timeSaved)} min slower</span>`;
} else {
    timeDiffEl.innerHTML = `<span class="neutral">Similar time</span>`;
}

// Highway status display
const statusIndicator = highwayStatusEl.querySelector('.status-indicator');
const statusText = highwayStatusEl.querySelector('.status-text');

statusIndicator.className = `status-indicator ${avgStatus}`;

switch(avgStatus) {
    case 'heavy':
        statusText.textContent = 'Heavy congestion';
        break;
    case 'moderate':
        statusText.textContent = 'Moderate delays';
        break;
    case 'light':
        statusText.textContent = 'Light traffic';
        break;
}
```

}

// Autocomplete functionality
function setupAutocomplete() {
const fromInput = document.getElementById(‘from’);
const toInput = document.getElementById(‘to’);
const fromSuggestions = document.getElementById(‘fromSuggestions’);
const toSuggestions = document.getElementById(‘toSuggestions’);

```
function showSuggestions(input, suggestionsDiv, query) {
    if (!query || query.length < 2) {
        suggestionsDiv.classList.add('hidden');
        return;
    }
    
    const matches = locationSuggestions.filter(location => 
        location.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
    
    if (matches.length === 0) {
        suggestionsDiv.classList.add('hidden');
        return;
    }
    
    suggestionsDiv.innerHTML = matches.map(match => 
        `<div class="suggestion-item" data-value="${match}">${match}</div>`
    ).join('');
    
    suggestionsDiv.classList.remove('hidden');
    
    // Add click listeners to suggestions
    suggestionsDiv.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            input.value = item.getAttribute('data-value');
            suggestionsDiv.classList.add('hidden');
            input.focus();
        });
    });
}

fromInput.addEventListener('input', (e) => {
    showSuggestions(fromInput, fromSuggestions, e.target.value);
});

toInput.addEventListener('input', (e) => {
    showSuggestions(toInput, toSuggestions, e.target.value);
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!fromInput.contains(e.target) && !fromSuggestions.contains(e.target)) {
        fromSuggestions.classList.add('hidden');
    }
    if (!toInput.contains(e.target) && !toSuggestions.contains(e.target)) {
        toSuggestions.classList.add('hidden');
    }
});
```

}

// Live update functionality
function startLiveUpdates() {
// Update traffic data every 2 minutes
appState.updateInterval = setInterval(() => {
if (appState.isOnline) {
showUpdateIndicator();
updateTrafficData();

```
        // If user has a current route, refresh the comparison
        if (appState.currentRoute) {
            updateTrafficComparison(appState.currentRoute);
        }
        
        hideUpdateIndicator();
    }
}, 120000); // 2 minutes

// Initial update
updateTrafficData();
```

}

function showUpdateIndicator() {
const indicator = document.getElementById(‘updateIndicator’);
indicator.classList.remove(‘hidden’);
setTimeout(() => indicator.classList.add(‘hidden’), 2000);
}

function hideUpdateIndicator() {
const indicator = document.getElementById(‘updateIndicator’);
indicator.classList.add(‘hidden’);
}

// Event handlers
function setupEventHandlers() {
const form = document.getElementById(“routeForm”);
const fromInput = document.getElementById(“from”);
const toInput = document.getElementById(“to”);
const swapBtn = document.getElementById(“swapBtn”);
const clearBtn = document.getElementById(“clearBtn”);
const refreshBtn = document.getElementById(“refreshRoute”);

```
// Form submission
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const findBtn = document.getElementById("findBtn");
    const btnText = findBtn.querySelector(".btn-text");
    const btnLoading = findBtn.querySelector(".btn-loading");
    
    // Show loading state
    btnText.classList.add("hidden");
    btnLoading.classList.remove("hidden");
    findBtn.disabled = true;
    
    setTimeout(() => {
        const route = findRoute(fromInput.value, toInput.value);
        showRoute(route);
        
        // Reset button state
        btnText.classList.remove("hidden");
        btnLoading.classList.add("hidden");
        findBtn.disabled = false;
    }, 500);
});

// Swap button
swapBtn.addEventListener("click", function() {
    const temp = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = temp;
    
    // Add visual feedback
    swapBtn.style.transform = "rotate(180deg)";
    setTimeout(() => {
        swapBtn.style.transform = "rotate(0deg)";
    }, 300);
    
    // Auto-search if both fields have values
    if (fromInput.value && toInput.value) {
        const route = findRoute(fromInput.value, toInput.value);
        showRoute(route);
    }
});

// Clear button
clearBtn.addEventListener("click", function() {
    fromInput.value = "";
    toInput.value = "";
    document.getElementById("result").classList.add("hidden");
    fromInput.focus();
});

// Refresh route button
if (refreshBtn) {
    refreshBtn.addEventListener("click", function() {
        if (appState.currentRoute) {
            showUpdateIndicator();
            updateTrafficData();
            updateTrafficComparison(appState.currentRoute);
        }
    });
}

// Preset buttons
const presetButtons = document.querySelectorAll(".preset-btn");
presetButtons.forEach(button => {
    button.addEventListener("click", function() {
        const routeKey = this.getAttribute("data-route");
        const fromValue = this.getAttribute("data-from");
        const toValue = this.getAttribute("data-to");
        
        if (fromValue && toValue) {
            fromInput.value = fromValue;
            toInput.value = toValue;
            const route = findRoute(fromValue, toValue);
            showRoute(route);
            
            // Visual feedback
            this.style.transform = "scale(0.95)";
            setTimeout(() => {
                this.style.transform = "scale(1)";
            }, 150);
        }
    });
});

// Input field enhancements
fromInput.addEventListener("blur", function() {
    this.value = cleanText(this.value);
});

toInput.addEventListener("blur", function() {
    this.value = cleanText(this.value);
});

// Network status handlers
window.addEventListener('online', () => {
    appState.isOnline = true;
    updateTrafficData();
});

window.addEventListener('offline', () => {
    appState.isOnline = false;
});
```

}

// Initialize app
document.addEventListener(“DOMContentLoaded”, function() {
setupEventHandlers();
setupAutocomplete();
startLiveUpdates();

```
// Set initial focus
document.getElementById("from").focus();

console.log("Alternate Route app initialized with live updates!");
```

});