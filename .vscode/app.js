
    let map = L.map('map').setView([-28.05815970583552,-56.01599463603798], 15);
    let latLng1 = L.latLng(-28.057201821899295, -56.0190424917164);
    let latLng2 = L.latLng(-28.05102611059904,-56.0418487786592);
    let wp1 = new L.Routing.Waypoint(latLng1);
    let wp2 = new L.Routing.Waypoint(latLng2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    L.Routing.control({
        waypoints: [latLng1,latLng2],
        language: 'es', 
        
    }).addTo(map);

    let routeUs = L.Routing.osrmv1();
    routeUs.route([wp1,wp2],(err,routes)=>{
        if(!err)
        {
            let best = 100000000000000;
            let bestRoute = 0;
            for(i in routes)
            {
                if(routes[i].summary.totalDistance < best) {
                    bestRoute = i;
                    best = routes[i].summary.totalDistance;
                }
            }
            console.log('best route',routes[bestRoute]);
            const totalKm =best/1000;
            const to = parseInt(totalKm, 10)
            const price = 200*to;
            alert(to);
            alert("precio a pagar es $"+ price);
            L.Routing.line(routes[bestRoute],{
                styles : [
                    {
                        color : 'red',
                        weight : '5'
                    }
                ]
            }).addTo(map);
        
        }


    })

