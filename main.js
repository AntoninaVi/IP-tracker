
const apiKey = 'b773c1e6dd0b40ad903d56b322aba57a';


// getting user IP
window.addEventListener('load', () => {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            document.getElementById('ip-address').textContent = ip || 'Unknown IP';
            getIPDetails(ip);
        })
        .catch(error => console.error('Error:', error));
});


function getIPDetails(ip) {
    fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}&ip=${ip}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const latitude = data.latitude;
            const longitude = data.longitude;

            // Google Maps
            const mapOptions = {
                center: { lat: latitude, lng: longitude },
                zoom: 15
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
function formatTimezone(timezone) {
    if (!timezone || !timezone.name) {
        return 'Unknown Timezone';
    }

    const gmtOffset = timezone.gmt_offset;
    const sign = gmtOffset >= 0 ? '+' : '-';
    const hours = Math.floor(Math.abs(gmtOffset));
    const minutes = (Math.abs(gmtOffset) % 1) * 60;

    return `UTC ${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}


function updateInformation(data) {
    document.getElementById('location').textContent = `${data.city || 'Unknown City'}, ${data.country || 'Unknown Country'}`;
    document.getElementById('timezone').textContent = formatTimezone(data.timezone);
    document.getElementById('isp').textContent = data.connection?.organization_name || 'Unknown ISP';
}


// Initialize google map
function initMap() {

    const defaultLatitude = 37.7749;
    const defaultLongitude = -122.4194;

    const mapOptions = {
        center: { lat: defaultLatitude, lng: defaultLongitude },
        zoom: 15,
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
// var map;
// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: -34.397, lng: 150.644 },
//     });
// }

// 92.54.195.50  212.102.40.177
// Add event listener to the search button
