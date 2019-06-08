

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
        stateCode: stateSearch,
        start: 11,
        limit
        
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
    const corsURL = "https://cors-anywhere.herokuapp.com/" + url;

    console.log(url);

    //  API key:

    // obtains videos with fectch
    fetch(corsURL, {
        headers: new Headers({
            'X-APi-Key': apiKey,
            accept: "application/json",
            crossDomain: true
        }),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } 
            throw new Error(response.statustext);
        })
        .then(responseJson => displayParks(responseJson))
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
    console.log(responseJson);
    
    // empty display area
    $('#js-results').empty();

    for (let i = 0; i < responseJson.data.length; i++){
        console.log('the for loop ran');
        $('#js-results').append(
            `<li>
                <h2>${responseJson.data[i].fullName}</h2>
                <p>This</p>
            </li>
            `
        )
        console.log(responseJson.data[i]);
    }

    console.log('displayParks ran');
    $('.results').removeClass('hidden');
}

handleForm();