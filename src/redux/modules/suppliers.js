const LOAD = 'lance-web/suppliers/LOAD';
const LOAD_SUCCESS = 'lance-web/suppliers/LOAD_SUCCESS';
const LOAD_FAIL = 'lance-web/suppliers/LOAD_FAIL';
const EDIT_START = 'lance-web/suppliers/EDIT_START';
const EDIT_STOP = 'lance-web/suppliers/EDIT_STOP';
const SAVE = 'lance-web/suppliers/SAVE';
const SAVE_SUCCESS = 'lance-web/suppliers/SAVE_SUCCESS';
const SAVE_FAIL = 'lance-web/suppliers/SAVE_FAIL';

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
        data: action.result.suppliers,
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
        saveError: null
      };
    case SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        saveError: null
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.suppliers && globalState.suppliers.loaded;
}

export function filter(term) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/supplier/filter/', {data: {title: term}}) // params not used, just shown as demonstration
  };
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/supplier/load') // params not used, just shown as demonstration
  };
}

export function save(supplier) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: supplier.id,
    promise: (client) => client.post('/supplier/save', {
      data: supplier
    })
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
