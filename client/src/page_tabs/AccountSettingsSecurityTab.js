import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { UserProps } from '../models/User';

import {
  Typography,
  List,
} from '@material-ui/core/';

import {
  TabPanel,
} from '../components';

import {
  FieldListItem,
} from '../components/form-fields';

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

const AccountSettingsSecurityTab = (props) => {
  const classes = get_styles();
  const { tab_index, account } = props;

    return (
      <TabPanel className={ classes.root } value={tab_index} index="user_security">
        <Typography variant="subtitle1">Your Profile Information</Typography>
        <List>
          <FieldListItem label="Email" value={ account.email } />
        </List>
      </TabPanel>
    );
}

AccountSettingsSecurityTab.defaultProps = {
}

AccountSettingsSecurityTab.propTypes = {
  tab_index: PropTypes.string.isRequired,
  account: UserProps,
}

export default AccountSettingsSecurityTab;
