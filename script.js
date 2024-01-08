let crimes = L.layerGroup();
const request = new XMLHttpRequest();

let map = "";
const borough = [
    {
        id: 0,
        name: "Barking and Dagenham",
        mapLat: 51.55,
        mapLong: 0.11667
    },
    {
        id: 1,
        name: "Barnet",
        mapLat: 51.6254,
        mapLong: -0.1527
    },
    {
        id: 2,
        name: "Bexley",
        mapLat: 51.456600,
        mapLong: 0.105600
    },
    {
        id: 3,
        name: "Brent",
        mapLat: 51.5597,
        mapLong: -0.2710
    },
    {
        id: 4,
        name: "Bromley",
        mapLat: 51.36797050,
        mapLong: 0.07006200
    },
    {
        id: 5,
        name: "Camden",
        mapLat: 51.536388,
        mapLong: -0.140556
    },
    {
        id: 6,
        name: "Croydon",
        mapLat: 51.376495,
        mapLong: -0.100594
    },
    {
        id: 7,
        name: "Ealing",
        mapLat: 51.5000,
        mapLong: -0.3333
    },
    {
        id: 8,
        name: "Enfield",
        mapLat: 51.654827,
        mapLong: -0.083599
    },
    {
        id: 9,
        name: "Greenwich",
        mapLat: 51.477928,
        mapLong: -0.001545
    },
    {
        id: 10,
        name: "Hackney",
        mapLat: 51.5451,
        mapLong: -0.0564
    },
    {
        id: 11,
        name: "Hammersmith and Fulham",
        mapLat: 51.5000,
        mapLong: -0.2500
    },
    {
        id: 12,
        name: "Haringey",
        mapLat: 51.581551,
        mapLong: -0.099649
    },
    {
        id: 13,
        name: "Harrow",
        mapLat: 51.583015,
        mapLong: -0.337820
    },
    {
        id: 14,
        name: "Havering",
        mapLat: 51.5500,
        mapLong: 0.2167
    },
    {
        id: 15,
        name: "Hillingdon",
        mapLat: 51.5000,
        mapLong: -0.4500
    },
    {
        id: 16,
        name: "Hounslow",
        mapLat: 51.4672,
        mapLong: -0.3570
    },
    {
        id: 17,
        name: "Islington",
        mapLat: 51.5362,
        mapLong: -0.1030
    },
    {
        id: 18,
        name: "Kensington and Chelsea",
        mapLat: 51.5000,
        mapLong: -0.1900
    },
    {
        id: 19,
        name: "Kingston upon Thames",
        mapLat: 51.3900,
        mapLong: -0.2800
    },
    {
        id: 20,
        name: "Lambeth",
        mapLat: 51.4167,
        mapLong: -0.1333
    },
    {
        id: 21,
        name: "Lewisham",
        mapLat: 51.4167,
        mapLong: -0.0333
    },
    {
        id: 22,
        name: "Merton",
        mapLat: 51.40977420,
        mapLong: -0.21080840
    },
    {
        id: 23,
        name: "Newham",
        mapLat: 51.5167,
        mapLong: 0.0333
    },
    {
        id: 24,
        name: "Redbridge",
        mapLat: 51.5667,
        mapLong: 0.0833
    },
    {
        id: 25,
        name: "Richmond upon Thames",
        mapLat: 51.4167,
        mapLong: -0.3333
    },
    {
        id: 26,
        name: "Southwark",
        mapLat: 51.4500,
        mapLong: -0.0833
    },
    {
        id: 27,
        name: "Sutton",
        mapLat: 51.3656,
        mapLong: -0.1963
    },
    {
        id: 28,
        name: "Tower Hamlets",
        mapLat: 51.5167,
        mapLong: -0.0500
    },
    {
        id: 29,
        name: "Waltham Forest",
        mapLat: 51.5667,
        mapLong: -0.0333
    },
    {
        id: 30,
        name: "Wandsworth",
        mapLat: 51.4544,
        mapLong: -0.1902
    },
    {
        id: 31,
        name: "Westminster",
        mapLat: 51.499390,
        mapLong: -0.127465
    }
];

var max = 100,
    select = document.getElementById('selectElementId');

for (var x = 0; x < borough.length; x++) {
    var opt = document.createElement('option');
    opt.value = x;
    opt.innerHTML = borough[x].name;
    select.appendChild(opt);
}

function mapCrime(i) {

    let lat = borough[i].mapLat;
    let long = borough[i].mapLong

    let apiUrl = 'https://data.police.uk/api/crimes-street/all-crime?lat=' + lat + '&lng=' + long;

    request.open('GET', apiUrl);
    request.send();

    request.onload = () => {
        if (request.status === 200) {
            let crime = JSON.parse(request.response);
            cLen = crime.length; 
            console.log(cLen);
            document.getElementById("content").innerHTML = cLen;
            for (i = 0; i < cLen; i++) L.marker([crime[i].location.latitude, crime[i].location.longitude]).bindPopup('Location: ' + crime[i].location.street.name + '<br>Crime Category: ' + crime[i].category.toUpperCase() + '<br>Year and Month: ' + crime[i].month).addTo(crimes);
        }
    };
    request.onerror = () => {
        console.log("error")
    };
    let mbAttr = '',
        mbUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    let grayscale = L.tileLayer(mbUrl, { id: 'mapbox.light', attribution: mbAttr }),
        streets = L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr });

    map = L.map('map', {
        center: [lat, long],
        zoom: 14,
        layers: [streets, crimes]
    });
    let baseLayers = {
        "Streets": streets,
        "Grayscale": grayscale
    };
    let overlays = {
        "Cities": crimes
    };
    L.control.layers(baseLayers, overlays).addTo(map);


}

function selectBorough(selectObject) {
    map.remove();
    var value = selectObject.value;
    mapCrime(value);
}


mapCrime(0);