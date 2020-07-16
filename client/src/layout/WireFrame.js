import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import {
  withRouter,
} from 'react-router-dom';

import {
  CssBaseline,
} from '@material-ui/core';

import TopMenu from './TopMenu';
import SideMenu from './SideMenu';

import LoginDialog from '../components/LoginDialog';

import {
  server_login,
  api_auth_google_url,
  api_auth_google_callback,
} from '../store/store-user';

import { UserProps } from '../models/User';
import { ConnectionProps } from '../models/Connection';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  main: {
    width: '100%',
    display: 'block'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
      flexGrow: 0,
      padding: theme.spacing(1),
    },
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const hide_from = [
  'forgot-password',
  'register',
  'reset-password',
  'google-login'
];

function WireFrame(props) {
  const {
    children,
    user_data,
    location,
    login,
    auth_google_url,
    } = props;

  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { initialized } = user_data.connection;
  const { email } = user_data.account;
  const login_open = (!email && initialized) ? true : false;
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handle_login = (email, password) => login(email, password);
  const is_hidden = () => {
    const root_folder = location.pathname.split('/')[1];
    return (hide_from.indexOf(root_folder) !== -1) ? true : false;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <LoginDialog
        open={ login_open && !is_hidden() }
        handle_login={ handle_login }
        error_msg={ user_data.connection.error_msg }
        get_google_url= { auth_google_url }
        google_url={ props.connection.oath.google }
      />
      <TopMenu toggle={ handleDrawerToggle }></TopMenu>
      <SideMenu
        user_data={user_data}
        toggle={ handleDrawerToggle }
        open={mobileOpen}
        location={ location }
      ></SideMenu>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        { children }
      </main>
    </div>
  );
}

WireFrame.propTypes = {
  user_data: PropTypes.shape({
    connection: ConnectionProps,
    account: UserProps,
  }),
};

const mapStateToProps = (state) => { return {
    user_data: state.user,
    connection: state.user.connection,
}};

const mapDispatchToProps = (dispatch) => { return {
  auth_google_url: (data) => api_auth_google_url(dispatch, data),
  auth_google_callback: (data) => api_auth_google_callback(dispatch, data),
  login: (email, password) => server_login(dispatch, {email, password}),
}};

export default connect( mapStateToProps, mapDispatchToProps )(withRouter(WireFrame));
