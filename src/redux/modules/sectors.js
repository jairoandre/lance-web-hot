const LOAD = 'lance-web/sectors/LOAD';
const LOAD_SUCCESS = 'lance-web/sectors/LOAD_SUCCESS';
const LOAD_FAIL = 'lance-web/sectors/LOAD_FAIL';
const EDIT_START = 'lance-web/sectors/EDIT_START';
const EDIT_STOP = 'lance-web/sectors/EDIT_STOP';
const SAVE = 'lance-web/sectors/SAVE';
const SAVE_SUCCESS = 'lance-web/sectors/SAVE_SUCCESS';
const SAVE_FAIL = 'lance-web/sectors/SAVE_FAIL';
const CLEAR_ERRORS = 'lance-web/sectors/CLEAR_ERRORS';

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
        data: action.result.sectors,
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
        loadingSave: true,
        saveError: null
      };
    case SAVE_SUCCESS:
      return {
        ...state,
        loadingSave: false,
        saveError: null
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        loadingSave: false,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        saveError: null
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.sectors && globalState.sectors.loaded;
}

export function filter(term) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/sector/filter/', {data: {title: term}}) // params not used, just shown as demonstration
  };
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/sector/load') // params not used, just shown as demonstration
  };
}

export function save(sector) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: sector.id,
    promise: (client) => client.post('/sector/save', {
      data: sector
    })
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
