import {loadTpl, filterTpl, saveTpl, removeTpl} from 'utils/actionHelpers';

const serviceName = 'contracts';

export function load(req) {
    return loadTpl(req, serviceName);
}

export function filter(req) {
    return filterTpl(req, serviceName);
}

export function save(req) {
    return saveTpl(req, serviceName);
}

export function remove(req) {
    return removeTpl(req, serviceName);
}
