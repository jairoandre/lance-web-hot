const LOAD = 'lance-web/serviceTypes/LOAD';
const LOAD_SUCCESS = 'lance-web/serviceTypes/LOAD_SUCCESS';
const LOAD_FAIL = 'lance-web/serviceTypes/LOAD_FAIL';
const EDIT_START = 'lance-web/serviceTypes/EDIT_START';
const EDIT_STOP = 'lance-web/serviceTypes/EDIT_STOP';
const SAVE = 'lance-web/serviceTypes/SAVE';
const SAVE_SUCCESS = 'lance-web/serviceTypes/SAVE_SUCCESS';
const SAVE_FAIL = 'lance-web/serviceTypes/SAVE_FAIL';
const REMOVE = 'lance-web/serviceTypes/REMOVE';
const REMOVE_SUCCESS = 'lance-web/serviceTypes/REMOVE_SUCCESS';
const REMOVE_FAIL = 'lance-web/serviceTypes/REMOVE_FAIL';
const CLEAR_ERRORS = 'lance-web/serviceTypes/CLEAR_ERRORS';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.serviceTypes,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case SAVE:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case SAVE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case REMOVE:
      return {
        ...state,
        loading: true,
        error: null
      };
    case REMOVE_SUCCESS:
      let idx;
      for (let jdx = 0; jdx < state.data.length; jdx++) {
        if (state.data[jdx].id === action.id) {
          idx = jdx;
        }
      }
      return {
        ...state,
        data: [
          ...state.data.slice(0, idx),
          ...state.data.slice(idx + 1)],
        loading: false,
        error: null
      };
    case REMOVE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.serviceTypes && globalState.serviceTypes.loaded;
}

export function filter(term) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/serviceType/filter/', {data: {title: term}}) // params not used, just shown as demonstration
  };
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/serviceType/load') // params not used, just shown as demonstration
  };
}

export function save(serviceType) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: serviceType.id,
    promise: (client) => client.post('/serviceType/save', {
      data: serviceType
    })
  };
}

export function remove(id) {
  return {
    types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
    id: id,
    promise: (client) => client.post('/serviceType/remove', {data: {id: id}})
  };
}

export function clearErrors() {
  return {
    type: CLEAR_ERRORS
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
