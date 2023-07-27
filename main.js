
// function httpGetAsync(url, callback) {
//     const xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function () {
//         if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
//             callback(xmlHttp.responseText);
//     }
//     xmlHttp.open("GET", url, true); // true for asynchronous
//     xmlHttp.send(null);
// }

// const url = "https://ipgeolocation.abstractapi.com/v1/?api_key=b773c1e6dd0b40ad903d56b322aba57a"

// httpGetAsync(url)

const apiKey = 'b773c1e6dd0b40ad903d56b322aba57a';

// getting user IP
window.addEventListener('load', () => {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            document.getElementById('ip-address').textContent = ip || 'Unknown IP'; // update ip
            getIPDetails(ip);
        })
        .catch(error => console.error('Error:', error));
});

function getIPDetails(ip) {
    fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}&ip=${ip}`)
        .then(response => response.json())
        .then(data => {
            const latitude = data.latitude;
            const longitude = data.longitude;

            // Google Maps
            const mapOptions = {
                center: { lat: latitude, lng: longitude },
                zoom: 12
            };
            const map = new google.maps.Map(document.getElementById('map'), mapOptions);
            const marker = new google.maps.Marker({         //marker custom
                position: { lat: latitude, lng: longitude },
                map: map,
                icon: {
                    url: '/img/marker.svg',
                    scaledSize: new google.maps.Size(60, 60),
                }
            });
            updateInformation(data);
        })

        .catch(error => console.error('Error:', error));

}

function formatTimezone(offset) {
    const formattedOffset = new Date().toLocaleTimeString('en', { timeZoneOffset: offset, timeZoneName: 'short' }).split(' ')[2];
    return formattedOffset;
}

function updateInformation(data) {
    document.getElementById('location').textContent = `${data.city || 'Unknown City'}, ${data.country || 'Unknown Country'}`;
    document.getElementById('timezone').textContent = formatTimezone(data.timezone?.offset);
    document.getElementById('isp').textContent = data.connection?.organization_name || 'Unknown ISP';
}


// initialize google map
function initMap() {
    const mapOptions = {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
}