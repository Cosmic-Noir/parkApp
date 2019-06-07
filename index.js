

// NPS auth key
const apiKey = 'KkqMVyqMZwLtvhI57wpKp70vr3QZjKUg2F18iDoj'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    // turns keys in params object into html string to append to the search URL endpoint
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getParkInfo(searchTerm, limit=10) {
    const params = {
        stateCode: searchTerm,
        limit
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
    console.log(url);

    //  API key:
    const options = {
        headers: new Headers({
          "X-Api-Key": apiKey})
      };

    // obtains videos with fectch
    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } 
            throw new Error(response.statustext);
        })
        .then(responseJson => console.log(JSON.stringify(responseJson)))
        .catch(err => {
            console.log(err.message);
        });
}

function handleForm() {
    // handles form data when submit button is clicked
    $('#js-parkSearch').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-searchPark').val();
        console.log(searchTerm);
        const limit = $('#js-limit').val();
        console.log(limit);
        getParkInfo(searchTerm, limit);
    });
}

function displayParks() {
    // displays video results in js-results ul
}

handleForm();