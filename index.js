const apiKey = ''; 
const searchURL = '';

function formatQueryParams(params) {
    // turns keys in params object into html string to append to the search URL endpoint
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getYouTubeVideos(query, maxResults=10) {
    const params = {
      key: apiKey,
      q: query,
      part: 'snippet',
      maxResults
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

function getParks() {
    // obtains videos with fectch
    fetch(url)
        .then(response => {
            if (response.ok {
                return response.json();
            } 
            throw new Error(response.statustext);
        })
        .then(responseJson => console.log(JSON.stringify(responseJson)))
        .catch(err => {
            console.log(${err.message});
        });
}

function handleForm() {
    // handles form data when submit button is clicked
}

function displayParks() {
    // displays video results in js-results ul
}

handleForm();