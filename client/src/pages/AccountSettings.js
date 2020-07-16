import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { UserProps } from '../models/User';
import { ConnectionProps } from '../models/Connection';

import {
  Typography,
  Paper,
  Tabs,
  Tab,
} from '@material-ui/core/';

import { LoadingCard } from '../components';

import { update_user_profile } from '../store/store-user';

import AccountSettingsProfileTab from '../page_tabs/AccountSettingsProfileTab';
import AccountSettingsSecurityTab from '../page_tabs/AccountSettingsSecurityTab';

import { user_loaded } from '../store/store-user.js';

const get_styles = makeStyles(theme => ({
  root: {
    marginTop: 20,
    flexGrow: 1,
    position: "relative",
  },
  edit_button: {
    position: "absolute",
    top: 60,
    right: 20,
  }
}));

const AccountSettings = (props) => {
  const classes = get_styles();

  const { user, get_dispatch } = props;

  const [tab_index, set_tab_index] = React.useState("user_profile");
  const handleChange = (event, newValue) => { set_tab_index(newValue); };

  const queue = user_loaded({user}, get_dispatch());
  const update_profile_info = (data) => {
    console.log(data);
    update_user_profile(get_dispatch(), data);
  }

  return (queue.length) ? <LoadingCard queue={ queue } /> : (
    <div className={ classes.root }>
    <Typography variant="h4">Manage Account</Typography>
    <Paper square className={classes.root}>
      <Tabs value={tab_index} onChange={handleChange}>
        <Tab value="user_profile" variant="fullWidth" label="User Information" />
        <Tab value="user_security" variant="fullWidth" label="Security" />
      </Tabs>
      <AccountSettingsProfileTab
        tab_index={ tab_index }
        account= { user.account }
        connection={ user.connection }
        update={ update_profile_info }
      />
      <AccountSettingsSecurityTab
        tab_index={ tab_index }
        account= { user.account }
        update={ update_profile_info }
      />
    </Paper>

    </div>
  );

}

AccountSettings.propTypes = {
  user: PropTypes.shape({
    connection: ConnectionProps,
    account: UserProps
  })
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_dispatch: () => dispatch,
}};

export default connect( mapStateToProps, mapDispatchToProps )(AccountSettings);
