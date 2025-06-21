(function() {
var routes = {
‘ohare-downtown’: {
name: “O’Hare to Downtown Chicago”,
directions: “Take I-190 E to I-90 E → Exit Addison St → South on Elston Ave → East on North Ave → Continue to downtown via surface streets”,
time: “35-50 minutes”,
miles: “22 miles”,
notes: “Avoids 294 backup at Cumberland. Best during rush hour 7-9am, 4-7pm.”
},
‘downtown-ohare’: {
name: “Downtown Chicago to O’Hare”,
directions: “Take North Ave west → North on Elston Ave → West on Addison St → I-90 W to I-190 W to airport”,
time: “40-55 minutes”,
miles: “22 miles”,
notes: “Reverse route. Add 10 minutes during peak traffic.”
},
‘schaumburg-naperville’: {
name: “Schaumburg to Naperville”,
directions: “Golf Rd east → South on Arlington Heights Rd → East on Algonquin Rd → South on Route 53 → West on 75th St to Naperville”,
time: “28-40 minutes”,
miles: “20 miles”,
notes: “Avoids 355/I-88 interchange congestion. Route 53 is key.”
},
‘naperville-schaumburg’: {
name: “Naperville to Schaumburg”,
directions: “75th St east to Route 53 → North on Route 53 → West on Algonquin Rd → North on Arlington Heights Rd → West on Golf Rd”,
time: “28-40 minutes”,
miles: “20 miles”,
notes: “Reverse route avoiding 355 backup.”
},
‘oakbrook-downtown’: {
name: “Oak Brook to Downtown Chicago”,
directions: “Roosevelt Rd east through Westchester → Continue on Roosevelt through Bellwood, Maywood → East to downtown Chicago”,
time: “45-65 minutes”,
miles: “18 miles”,
notes: “Roosevelt Rd is the main 294 alternative. Heavy traffic lights but moves steadily.”
},
‘downtown-oakbrook’: {
name: “Downtown Chicago to Oak Brook”,
directions: “Take Roosevelt Rd west through city → Continue west through Maywood, Bellwood, Westchester to Oak Brook”,
time: “45-65 minutes”,
miles: “18 miles”,
notes: “Consistent alternative to 294. Slower but reliable.”
},
‘elmhurst-midway’: {
name: “Elmhurst to Midway Airport”,
directions: “St. Charles Rd east → South on Cicero Ave → West on 55th St to Midway Airport”,
time: “25-35 minutes”,
miles: “12 miles”,
notes: “Direct route avoiding highway congestion to airport.”
},
‘midway-elmhurst’: {
name: “Midway Airport to Elmhurst”,
directions: “55th St east to Cicero Ave → North on Cicero Ave → West on St. Charles Rd to Elmhurst”,
time: “25-35 minutes”,
miles: “12 miles”,
notes: “Reverse airport route.”
}
};

```
var presets = {
    'ohare-downtown': ['ohare', 'downtown'],
    'schaumburg-naperville': ['schaumburg', 'naperville'], 
    'oakbrook-downtown': ['oak brook', 'downtown'],
    'elmhurst-midway': ['elmhurst', 'midway']
};

function findRoute(from, to) {
    if (!from || !to) return null;
    
    from = from.toLowerCase().trim();
    to = to.toLowerCase().trim();
    
    var key = from.replace(/\s/g, '') + '-' + to.replace(/\s/g, '');
    if (routes[key]) return routes[key];
    
    var reverseKey = to.replace(/\s/g, '') + '-' + from.replace(/\s/g, '');
    if (routes[reverseKey]) return routes[reverseKey];
    
    for (var routeKey in routes) {
        var parts = routeKey.split('-');
        if ((parts[0].indexOf(from.replace(/\s/g, '')) > -1) &&
            (parts[1].indexOf(to.replace(/\s/g, '')) > -1)) {
            return routes[routeKey];
        }
    }
    
    return null;
}

function showRoute(route) {
    var resultDiv = document.getElementById('result');
    var infoDiv = document.getElementById('routeInfo');
    
    if (route) {
        infoDiv.innerHTML = 
            '<strong>' + route.name + '</strong><br><br>' +
            '<strong>Route:</strong><br>' + route.directions + '<br><br>' +
            '<div class="time-info">Time: ' + route.time + ' | Distance: ' + route.miles + '</div><br>' +
            '<strong>Notes:</strong> ' + route.notes;
    } else {
        infoDiv.innerHTML = 
            '<strong>No specific route found</strong><br><br>' +
            'General alternatives to 294-355:<br>' +
            '• Roosevelt Rd (east-west)<br>' +
            '• Ogden Ave (east-west)<br>' + 
            '• Route 53 (north-south)<br>' +
            '• Route 83 (north-south)<br><br>' +
            '<div class="time-info">Use surface streets during heavy traffic</div>';
    }
    
    resultDiv.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('routeForm');
    var fromInput = document.getElementById('from');
    var toInput = document.getElementById('to');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var route = findRoute(fromInput.value, toInput.value);
        showRoute(route);
    });
    
    document.querySelectorAll('.preset').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var routeKey = this.getAttribute('data-route');
            if (presets[routeKey]) {
                fromInput.value = presets[routeKey][0];
                toInput.value = presets[routeKey][1];
                var route = findRoute(presets[routeKey][0], presets[routeKey][1]);
                showRoute(route);
            }
        });
    });
});
```

})();
