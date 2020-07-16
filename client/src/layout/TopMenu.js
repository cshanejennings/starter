import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons/';

import { APP_COMPONENTS } from '../config';
import { server_logout } from '../store/store-user';

const drawerWidth = APP_COMPONENTS.DRAWER_WIDTH;

const get_styles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },

  hide: {
    display: 'none',
  },
  toolbar: theme.mixins.toolbar,
}));
/* eslint no-undef: 0 */ // --> OFF

// https://github.com/alex996/react-writers-blog/blob/master/src/Components/App.js
// https://codesandbox.io/s/y90re
const ResponsiveDrawer = (props) => {
  const classes = get_styles();
  const { connection, logout_user, toggle } = props;
  const { initialized, authorizing } = connection;

  const logout = () => {
    logout_user(connection);
  }

  const get_login_button = () => {
    return (!initialized || authorizing)
    ? <Typography style={{ marginLeft: 'auto' }} variant="subtitle1" >Initializing</Typography>
    : (
      <Button style={{ marginLeft: 'auto' }} variant="contained" color="primary"  onClick={ logout }>Log Out</Button>
    )
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Menu"
          onClick={ toggle }
          className={classes.menuButton}
        >
          <Menu />
        </IconButton>
        <IconButton component={ Link } to="/" edge="end" color="inherit" aria-label="Menu">

        </IconButton>
        { get_login_button() }
      </Toolbar>
    </AppBar>
  );
}

ResponsiveDrawer.propTypes = {
  toggle: PropTypes.func.isRequired,
  user_data: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
  }),
  initialized: PropTypes.bool,
  authorizing: PropTypes.bool,
  signed_in: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    connection: state.user.connection,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout_user: (data) => server_logout(dispatch, data)
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(ResponsiveDrawer);
