import {loadTpl, filterTpl, saveTpl} from 'utils/actionHelpers';

const serviceName = 'serviceTypes';

export function load(req) {
    return loadTpl(req, serviceName);
}

export function filter(req) {
    return filterTpl(req, serviceName);
}

export function save(req) {
    return saveTpl(req, serviceName);
}
