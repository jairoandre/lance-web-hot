import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import {reducer as form} from 'redux-form';
import widgets from './widgets';
import suppliers from './suppliers';

export default combineReducers({
  router: routerStateReducer,
  auth,
  form,
  widgets,
  suppliers
});
