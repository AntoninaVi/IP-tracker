
const apiKey = '967fc01f637f62b44ecfe691b44e394e06fd0e1377d21f3c4345046b';


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
    fetch(`https://api.ipdata.co/${ip}?api-key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const latitude = data.latitude;
            const longitude = data.longitude;

            // Google Maps
            const mapOptions = {
                center: { lat: latitude, lng: longitude },
                zoom: 15,
                mapTypeControl: false,
            };
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
            const marker = new google.maps.Marker({         //marker custom
                position: { lat: latitude, lng: longitude },
                map: map,
                icon: {
                    url: 'img/marker.svg',
                    scaledSize: new google.maps.Size(60, 60),
                }
            });
            updateInformation(data);
        })

        .catch(error => console.error('Error:', error));

}

//information section
function updateInformation(data) {
    document.getElementById('location').textContent = `${data.city || 'Unknown City'}, ${data.country_name || 'Unknown Country'}`;
    document.getElementById('timezone').textContent = data.time_zone ? `UTC ${data.time_zone.offset.slice(0, 3)}:${data.time_zone.offset.slice(3)}` : 'Unknown Timezone';
    document.getElementById('isp').textContent = data.asn ? data.asn.name : 'Unknown ISP';
}


// Initialize google map
function initMap() {
    const defaultLatitude = 37.7749;
    const defaultLongitude = -122.4194;
    const mapOptions = {
        center: { lat: defaultLatitude, lng: defaultLongitude },
        zoom: 15,
    };


}
const ipForm = document.querySelector('form');
ipForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const ip = formData.get('ip-input');
    getIPDetails(ip);
});
