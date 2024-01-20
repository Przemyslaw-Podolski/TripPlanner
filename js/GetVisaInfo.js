const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: 'Basic cHJ6ZW15c2xhdy5wb2RvbHNraTpTbGF1Z2h0ZXI2NjY='
    }
};

fetch('https://api.visamundi.fr/v1/visas?citizenship=pl&country=in', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));