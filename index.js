

// NPS auth key
const apiKey = 'KkqMVyqMZwLtvhI57wpKp70vr3QZjKUg2F18iDoj'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    // turns keys in params object into html string to append to the search URL endpoint
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getParkInfo(stateSearch, limit) {
    const params = {
        stateCode: stateSearch,
        limit
}

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
        let limit = $('#js-limit').val();
        console.log(limit);
        if (limit === ""){
            limit = 10;
            console.log(limit);
        } 
        
        if (stateSearch === "" || stateSearch.length < 2){
            alert("Please enter a state abreviation.");
        } else {
            getParkInfo(stateSearch, limit);
        }
    });
}

function displayParks(responseJson) {
    // displays video results in js-results ul
    console.log(responseJson);
    
    // empty display area
    $('#js-results').empty();

    for (let i = 0; i < responseJson.data.length - 1; i++){
        console.log(i);
        $('#js-results').append(
            `<li>
                <h2><a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].fullName}</a></h2>
                <p>${responseJson.data[i].description}</p>
            </li>
            `
        )}

    console.log('displayParks ran');
    $('.results').removeClass('hidden');
}

handleForm();