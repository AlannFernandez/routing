
    let map = L.map('map').setView([-28.05815970583552,-56.01599463603798], 15);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarUbicacion);
    }


    function mostrarUbicacion (ubicacion) {
        const lng = ubicacion.coords.longitude;
        const lat = ubicacion.coords.latitude;        
        usuario = L.marker([lat, lng]).bindPopup('estas aca');
        map.addLayer(usuario);        
    }
   

    //user marker
    map.on('dblclick', e=>{        
    let destino = null;
    let latlng = map.mouseEventToLatLng(e.originalEvent);
    console.log(latlng);
    destino = L.marker([latlng.lat, latlng.lng]).bindPopup('Alan');
        if(destino){
        map.removeLayer(destino);
        }
    map.addLayer(destino);

    })

   

    let latLng1 = L.latLng(-28.048525027214637, -56.00477206680808);
    let latLng2 = L.latLng(-28.04331520533566, -56.018213152656244);
    let wp1 = new L.Routing.Waypoint(latLng1);
    let wp2 = new L.Routing.Waypoint(latLng2);   

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    L.Routing.control({
        waypoints: [latLng1,latLng2],
        language: 'es'       
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
            // alert("hay "+to+" km");
            // alert("precio a pagar es $"+ price);
            L.Routing.line(routes[bestRoute]).addTo(map);
        
        }


    })

