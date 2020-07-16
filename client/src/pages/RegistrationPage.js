import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import {
  Paper,
  Typography,
  FormControl,
  Button,
} from '@material-ui/core/';

import { Redirect } from 'react-router';

import { register_new_user } from '../store/store-user';

import { UserProps } from '../models/User';
import { ConnectionProps } from '../models/Connection';

import {
  PasswordField,
  TextInputField,
} from '../components/form-fields/';

const get_styles = makeStyles(theme => ({
  paper: {
    width: '100%',
    padding: '20px 5px',
    display: "flex",
    flexWrap: "wrap"
  },
  divider: {
    margin: '20px 0',
    display: 'block',
    background: '#eee',
    height: 1,
    width: '100%'
  },
  error_msg: {
    width: '90%',
    margin: '0 auto 20px auto',
    color: '#990000',
  },
}));

const RegistrationPage = (props) => {
  const classes = get_styles();

  const { register, user_data } = props;

  const { initialized } = user_data.connection;
  const { email } = user_data.account;

  const [first_name, set_first_name] = React.useState('Taddy');
  const first_name_change = (first_name) => set_first_name(first_name);

  const [last_name, set_last_name] = React.useState('Mason');
  const last_name_change = (last_name) => set_last_name(last_name);

  const [user_email, set_user_email] = React.useState('getyour@talkon.com');
  const user_email_change = (user_email) => set_user_email(user_email);

  const [password, set_password] = React.useState('12345678');
  const pw_change = (pw) => set_password(pw);

  const submit = () => register({
    first_name,
    last_name,
    user_email,
    password,
    password_confirmation: password,
  });

  const error_msg = '';

  return (email || !initialized) ? (
    <Redirect to='/account' />
  ) : (
    <Paper className={ classes.paper }>
      <Typography variant="h5">Create a new Account.</Typography>
      <TextInputField
        label="First Name"
        error_msg={ error_msg }
        value={ first_name }
        on_change={ first_name_change }
      />
      <TextInputField
        label="Last Name"
        error_msg={ error_msg }
        value={ last_name }
        on_change={ last_name_change }
      />
      <TextInputField
        label="Email"
        error_msg={ error_msg }
        on_change={ user_email_change }
        value={ user_email }
      />
      <PasswordField
        error_msg={ error_msg }
        password={ password }
        pw_change={ pw_change }
      />
      <FormControl fullWidth className={classes.margin}>
        <Button color="primary" variant="contained" onClick={submit}>
          Login
        </Button>
      </FormControl>
    </Paper>
  )
}

RegistrationPage.defaultProps = {}

RegistrationPage.propTypes = {
  user_data: PropTypes.shape({
    connection: ConnectionProps,
    account: UserProps,
  }),
};

const mapStateToProps = state => { return {
  user_data: state.user,
} };

const mapDispatchToProps = dispatch => { return {
  register: () => register_new_user(dispatch, {
    first_name: "Taddy",
    last_name: "Mason",
    email: "getyour@talkon.com",
    password: "123456789",
    password_confirmation: "123456789",
  }),
} };

export default connect( mapStateToProps, mapDispatchToProps )(RegistrationPage);
