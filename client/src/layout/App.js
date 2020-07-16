import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import { connect } from 'react-redux';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import HomePage from '../pages/HomePage';
import AccountSettings from '../pages/AccountSettings';
import RegistrationPage from '../pages/RegistrationPage';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import LoginGoogle from '../pages/LoginGoogle';


import WireFrame from './WireFrame';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import root_reducer from 'store/';
import ReduxThunk from 'redux-thunk';


import { initialize } from '../store/store-user';
let INITIAL_STATE = {};

const store = createStore(root_reducer, INITIAL_STATE, applyMiddleware(ReduxThunk));
initialize(store);

const get_styles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100vh',
  }
}));

const App = (props) => {
  const classes = get_styles();
  return (
    <Provider store={store}>
      <Router>
        <div  className={classes.root}>
          <WireFrame>
            <Switch>
              <Route path="/" exact component={ HomePage } />
              <Route path="/register" exact component={ RegistrationPage } />
              <Route path="/forgot-password/" component={ ForgotPassword } />
              <Route path="/reset-password/:token" component={ ResetPassword } />
              <Route path="/reset-password/" component={ ResetPassword } />
              <Route path="/google-login/" component={ LoginGoogle } />
              <Route path="/account" exact component={ AccountSettings } />
            </Switch>
          </WireFrame>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
