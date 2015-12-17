import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import {reducer as form} from 'redux-form';
import suppliers from './suppliers';
import serviceTypes from './serviceTypes';
import services from './services';
import sectors from './sectors';

export default combineReducers({
  router: routerStateReducer,
  auth,
  form,
  suppliers,
  serviceTypes,
  services,
  sectors
});
