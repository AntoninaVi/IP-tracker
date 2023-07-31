const apiKey = '10724d795dbc51';

// getting user IP
window.addEventListener('load', () => {
    fetch('https://ipinfo.io?token=' + apiKey)
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            getIPDetails(ip);
        })
        .catch(error => console.error('Error:', error));
});

function getIPDetails(ip) {
    fetch(`https://ipinfo.io/${ip}?token=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const [latitude, longitude] = data.loc ? data.loc.split(',') : [null, null];
            const location = `${data.city || 'Unknown City'}, ${data.country || 'Unknown Country'}`;
            const isp = data.org || 'Unknown ISP';

            const date = new Date();
            const timeZoneOffset = date.getTimezoneOffset() / -60;
            const timezone = data.timezone ? `UTC ${timeZoneOffset >= 0 ? '+' : '-'}${Math.abs(timeZoneOffset).toString().padStart(2, '0')}:00` : 'Unknown Timezone';

            document.getElementById('timezone').textContent = timezone;
            document.getElementById('location').textContent = location;
            document.getElementById('isp').textContent = isp;
            document.getElementById('ip-address').textContent = ip || 'Unknown IP';

            if (latitude && longitude) {
                const mapOptions = {
                    center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
                    zoom: 13,
                    mapTypeControl: false,
                };

                map = new google.maps.Map(document.getElementById('map'), mapOptions);
                const marker = new google.maps.Marker({
                    position: mapOptions.center,
                    map: map,
                    icon: {
                        url: 'img/marker.svg',
                        scaledSize: new google.maps.Size(60, 60),
                    }
                });
            } else {
                console.error('Invalid latitude, longitude');
            }
        })
        .catch(error => console.error('Error:', error));
}

// Initialize google map
function initMap() {
    const defaultLatitude = 37.7749;
    const defaultLongitude = -122.4194;
    const mapOptions = {
        center: { lat: defaultLatitude, lng: defaultLongitude },
        zoom: 13,
        mapTypeControl: false,
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

//ip input
const ipForm = document.querySelector('form');
ipForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const ip = formData.get('ip-input');

    //validation IP 
    const ipFormatRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipFormatRegex.test(ip)) {
        showAlertMessage();
        return;
    }
    getIPDetails(ip);
});

//alert message
function showAlertMessage() {
    const alertMessage = document.getElementById('alert');
    alertMessage.style.display = 'flex';

    const closeButton = document.getElementById('close-alert');
    closeButton.addEventListener('click', () => {
        alertMessage.style.display = 'none';
    });
}
