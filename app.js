// configuracion inicial del mapa
let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [-28.05815970583552,-56.01599463603798],
    zoom: 15
});
    

function runDirection(start, end) {
    
    // configuracion para el nuevo mapa despues de enviar el formulario
    map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [-28.05815970583552,-56.01599463603798],
        zoom: 15
    });
    
    var dir = MQ.routing.directions();

    dir.route({
        locations: [
            start,
            end
        ]
    });


    CustomRouteLayer = MQ.Routing.RouteLayer.extend({
        // creacion del marcardor de inicio
        createStartMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: 'img/red.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);
            
            return marker;
        },
        // creacion del marcardor del final
        createEndMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: 'img/blue.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

            return marker;
        }
    });
    
    map.addLayer(new CustomRouteLayer({
        directions: dir,
        fitBounds: true
    })); 
}


// Funcion que se ejecuta cuando se envia el formulario
function submitForm(event) {
    event.preventDefault();

    // Se elimina la primer capa del mapa
    map.remove();

    // Se obtiene los datos del formulario
    start = document.getElementById("start").value;
    end = document.getElementById("destination").value;

    // se ejecuta la funcion de la linea 9 con los parametros
    runDirection(start, end);

    // se reinicia el formulario
    document.getElementById("form").reset();
}

// se asigna el formulario a la variable de formulario
const form = document.getElementById('form');

// Se ejecuta la funcion de la linea 71 al detectar el evento submit
form.addEventListener('submit', submitForm);