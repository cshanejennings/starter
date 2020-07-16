import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { UserProps } from '../models/User';
import { ConnectionProps } from '../models/Connection';
import {
  Typography,
  List,
  Button,
} from '@material-ui/core/';

import {
  Edit,
  Cancel,
} from '@material-ui/icons/';

import {
  TabPanel,
  UploadButton,
} from '../components';

import {
  FieldListItem,
  CheckboxInputField,
  TextInputField
} from '../components/form-fields/';

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
  },
}));

const AccountSettingsProfileTab = (props) => {
  const classes = get_styles();
  const { tab_index, account, update, connection: { updating } } = props;

  const [values, set_values] = React.useState({});
  const [edit_mode, set_edit_mode] = React.useState(false);

  // finish button example as per https://codesandbox.io/s/o57l2?file=/demo.js:1808-1825
  const update_profile = () => {
    update(values);
  }

  const toggle_edit_mode = () => {
    set_values(account);
    set_edit_mode(!edit_mode);
  };

  const get_action_button = () => {
    return (!edit_mode) ? (
      <Button
        onClick={ toggle_edit_mode }
        className={classes.edit_button}
        variant="contained"
        startIcon={<Edit />}
      >Edit</Button>
    ) : (
      <Button
        onClick={ toggle_edit_mode }
        className={classes.edit_button}
        variant="contained"
        startIcon={<Cancel />}
      >Cancel</Button>
    );
  }

  const get_update_button = () => {
    return (edit_mode) ? (
      <UploadButton
        update={ update_profile }
        updating={ updating }
        label="Update Profile Information"
        exit={ toggle_edit_mode }
      />
    ) : '';
  }

  const get_val = (key) => (values.hasOwnProperty(key))
    ? values[key] : account[key];

  const get_checkbox = (lbl, key) => {
    const val = get_val(key);
    const toggle = () => {
      set_values({...values, [key]: !val })
    };
    return (edit_mode)
    ? <CheckboxInputField label={ lbl } value={ val } on_click={ toggle } />
    : <FieldListItem label={ lbl } value={ (val) ? "yes" : "no" }/>
  }

  const get_text_field = (lbl, key) => {
    const val = get_val(key);
    const on_change = val => set_values({...values, [key]: val });
    return (edit_mode)
      ? <TextInputField label={ lbl } value={ val } on_change={ on_change } />
      : <FieldListItem key={ key } label={ lbl } value={ val }/>;
  }

    return (
      <TabPanel value={tab_index} index="user_profile">
      { get_action_button() }
      <Typography variant="subtitle1">Your Profile Information</Typography>
      <List>
        { get_text_field("First Name", "first_name") }
        { get_text_field("Last Name", "last_name") }
        { get_text_field("Company Name", "company_name") }
        { get_text_field("SMS name", "sms_name") }
        { get_checkbox("Get email for incoming texts", "email_incoming") }
        { get_checkbox("Get email for outgoing texts", "email_outgoing") }
        { get_update_button() }
      </List>

      </TabPanel>
    );
}

AccountSettingsProfileTab.defaultProps = {
}

AccountSettingsProfileTab.propTypes = {
  tab_index: PropTypes.string.isRequired,
  account: UserProps,
  connection: ConnectionProps,
  update: PropTypes.func.isRequired,
}

export default AccountSettingsProfileTab;
