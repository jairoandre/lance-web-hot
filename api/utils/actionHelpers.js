import 'isomorphic-fetch';

const api_path = 'http://localhost:8080/lance-api/';

export function urlTpl(req, path, method) {
    const requestURL = api_path + path;

    let params = {
        method: method,
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        }};

    if (method !== 'get') {
        params = {...params, body: JSON.stringify(req.body)};
    }

    return fetch(requestURL, params)
    .then( response => {
            console.log('Received response: ' + response);
            console.log('Received response: ' + response.status);
            console.log('Received response: ' + response.statusText);
            if (response.status >= 200 && response.status < 300) {
                return response;
            } else {
                return Promise.reject(response.statusText);
            }
        })
    .then(response => { return response.json() })
    .catch(function(ex){
        return Promise.reject("Erro de comunicação com a base de dados");
    });
}

export function saveTpl(req, path) {
    return urlTpl(req, path + '/add', 'post');
}

export function filterTpl(req, path) {
    return urlTpl(req, path + '/filter', 'post');
}

export function loadTpl(req, path) {
    return urlTpl(req, path + '/load', 'get');
}

export function removeTpl(req, path) {
    return urlTpl(req, path + '/remove', 'post');
}
