const LOAD = 'lance-web/sectors/LOAD';
const LOAD_SUCCESS = 'lance-web/sectors/LOAD_SUCCESS';
const LOAD_FAIL = 'lance-web/sectors/LOAD_FAIL';
const EDIT_START = 'lance-web/sectors/EDIT_START';
const EDIT_STOP = 'lance-web/sectors/EDIT_STOP';
const SAVE = 'lance-web/sectors/SAVE';
const SAVE_SUCCESS = 'lance-web/sectors/SAVE_SUCCESS';
const SAVE_FAIL = 'lance-web/sectors/SAVE_FAIL';
const REMOVE = 'lance-web/sectors/REMOVE';
const REMOVE_SUCCESS = 'lance-web/sectors/REMOVE_SUCCESS';
const REMOVE_FAIL = 'lance-web/sectors/REMOVE_FAIL';
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
        sector: {
          name: 'Teste from reducer ' + action.id
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
        data: [...state.data, action.result.sector],
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
  return globalState.sectors && globalState.sectors.loaded;
}

export function filter(term) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/sector/filter/', {data: {name: term}}) // params not used, just shown as demonstration
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

export function remove(id) {
  return {
    types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
    id: id,
    promise: (client) => client.post('/sector/remove', {data: {id: id}})
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
