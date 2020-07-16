import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import {
  Paper,
  Typography,
} from '@material-ui/core/';

import {
  api_auth_google_callback
} from '../store/store-user.js';
import { ConnectionProps } from '../models/Connection';
import { UserProps } from '../models/User';

const get_styles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(4),
  },
}));
const CONNECTION = {
  initialized: false
}
const LoginGoogle = (props) => {
  const classes = get_styles();
  const { get_google_profile, connection, account } = props;

  const params = window.location.search;
  if (params && !CONNECTION.initialized) {
    CONNECTION.initialized = true;
    console.log(params);
    get_google_profile(params);
  }

  if (connection.email && account.sms_number) {
    return <Redirect to={'/'} />;
  } else if (connection.email) {
    return <Redirect to={'/account'} />;
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Login to google</Typography>
    </Paper>
  );
}

LoginGoogle.defaultProps = {}

LoginGoogle.propTypes = {
  connection: ConnectionProps,
  account: UserProps,
};

const mapStateToProps = state => { return {
  connection: state.user.connection,
  account: state.user.account,
} };

const mapDispatchToProps = dispatch => { return {
  get_dispatch: () => dispatch,
  get_google_profile: (params) => api_auth_google_callback(dispatch, params),
} };

export default connect( mapStateToProps, mapDispatchToProps )(LoginGoogle);
