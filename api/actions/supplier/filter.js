import 'isomorphic-fetch';

export default function filter(req) {

    const requestURL = 'http://localhost:8080/lance-api/suppliers/filter';

    console.log(req.body);

    return fetch(requestURL, {
        method: 'post',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(req.body)
    }).then( response => {
            console.log('Received response: ' + response);
            console.log('Received response: ' + response.status);
            console.log('Received response: ' + response.statusText);
            if (response.status >= 200 && response.status < 300) {
                return response;
            } else {
                var error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        }).then(response => { return response.json() });

}