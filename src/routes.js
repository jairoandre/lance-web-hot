import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    About,
    Login,
    LoginSuccess,
    Suppliers,
    SuppliersNew,
    ServiceTypes,
    ServiceTypesNew,
    Service,
    ServiceNew,
    Contract,
    ContractNew,
    NotFound,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, 'login');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Login}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="about" component={About}/>
        <Route path="loginSuccess" component={LoginSuccess}/>
        <Route path="suppliers" component={Suppliers}/>
        <Route path="suppliers/add" component={SuppliersNew}/>
        <Route path="serviceTypes" component={ServiceTypes}/>
        <Route path="serviceTypes/add" component={ServiceTypesNew}/>
        <Route path="services" component={Service}/>
        <Route path="services/add" component={ServiceNew}/>
        <Route path="contracts" component={Contract}/>
        <Route path="contracts/add" component={ContractNew}/>
      </Route>

      { /* Routes */ }
      <Route path="login" component={Login}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
