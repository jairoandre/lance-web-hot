import 'isomorphic-fetch';

const api_path = 'http://localhost:8080/lance-api/';

export function saveTpl(req, path) {

    const requestURL = api_path + path + '/add';

    return fetch(requestURL, {
        method: 'post',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(req.body)
    })
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

export function filterTpl(req, path) {

    const requestURL = api_path + path + '/filter';

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
                return Promise.reject(response.statusText);
            }
        }).then(response => { return response.json() })
    .catch(function(ex){
        console.log(ex);
        return Promise.reject("Erro de comunicação com a base de dados");
    });
}

export function loadTpl(req, path) {

    const requestURL = api_path + path + '/load';

    return fetch(requestURL, {
        method: 'get',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        }
    }).then( response => {
            console.log('Received response: ' + response);
            console.log('Received response: ' + response.status);
            console.log('Received response: ' + response.statusText);
            if (response.status >= 200 && response.status < 300) {
                return response;
            } else {
                return Promise.reject(response.statusText);
            }
        }).then(response => { return response.json() })
    .catch(function(ex){
        return Promise.reject("Erro de comunicação com a base de dados");
    });
}

export function removeTpl(req, path) {

    const requestURL = api_path + path + '/remove';

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
                return Promise.reject(response.statusText);
            }
        }).then(response => { return response.json() })
    .catch(function(ex){
        return Promise.reject("Erro de comunicação com a base de dados");
    });
}
