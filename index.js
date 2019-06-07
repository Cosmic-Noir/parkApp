

// NPS auth key
const apiKey = 'KkqMVyqMZwLtvhI57wpKp70vr3QZjKUg2F18iDoj'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    // turns keys in params object into html string to append to the search URL endpoint
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getParkInfo(stateSearch, limit=10) {
    const params = {
        q: stateSearch,
        start: 11,
        limit
        
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
    console.log(url);

    //  API key:

    // obtains videos with fectch
    fetch(url, {
        headers: new Headers({
            'X-APi-Key': apiKey
        }),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } 
            throw new Error(response.statustext);
        })
        .then(responseJson => displayParks(responseJson, limit))
        .catch(err => {
            console.log(err.message);
        });
}

function handleForm() {
    // handles form data when submit button is clicked
    $('#js-parkSearch').submit(event => {
        event.preventDefault();
        const stateSearch = $('#js-searchPark').val();
        console.log(stateSearch);
        const limit = $('#js-limit').val();
        console.log(limit);
        getParkInfo(stateSearch, limit);
    });
}

function displayParks(responseJson, limit) {
    // displays video results in js-results ul
    $('.results').removeClass('hidden');

    console.log('displayParks ran');
}

handleForm();