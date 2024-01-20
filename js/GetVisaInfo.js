const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: process.env.VISA_AUTH_KEY
    }
};

fetch('https://api.visamundi.fr/v1/visas?citizenship=pl&country=in', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));