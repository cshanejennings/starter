import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Paper,
  Typography,
  FormControl,
  Button
} from '@material-ui/core/';

import { Redirect } from 'react-router';

import {
  PasswordField
} from '../components/form-fields/';

import {
  check_pw_validation_token,
  submit_reset_password,
  clear_update,
} from '../store/store-user.js';

const get_styles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(4),
  },
  option_buttons: {
    margin: theme.spacing(1),
  }
}));

const ResetPassword = (props) => {
  const classes = get_styles();
  const { account, check, submit, updating, email, update_msg, error_msg } = props;
  const token = props.match.params.token;
  const [password, set_password] = React.useState('');

  if (account.email) return <Redirect to='/account' />;

  if (!token) return <Redirect to='/' />;

  const pw_change = (password) => set_password(password);

  const error_prompt = (error_msg) ? (
    <div>
    <Typography align="center" variant="subtitle2" className={ classes.error_msg }>
      { error_msg }
    </Typography>
    <div>
      <Button className={ classes.option_buttons } variant="contained" color="primary" component={Link} to={'/forgot-password'}>Send another password reset</Button>
      <Button className={ classes.option_buttons } variant="contained" color="primary" component={Link} to={'/'}>Go to Login</Button>
    </div>
    </div>
  ) : "";
  const send_request = () => submit(email, token, password);

  if (!update_msg && !email && !error_msg) {
    if (!updating) check(token);
    return <div>Checking Token</div>;
  }

  return (error_msg) ? (
    <Paper className={classes.paper}>
      { error_prompt }
    </Paper>
  ) : (
    <Paper className={classes.paper}>
      <Typography variant="h5">Request a password reset for { email }</Typography>
      <div>{ update_msg }</div>
      <PasswordField
        error_msg={ error_msg }
        pw_change={ pw_change }
        password={ password }
      />
      <FormControl fullWidth className={classes.margin}>
        <Button color="primary" variant="contained" onClick={ send_request }>
          Update Password
        </Button>
      </FormControl>
    </Paper>
  );
}

ResetPassword.defaultProps = {}

ResetPassword.propTypes = {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ])
};

const mapStateToProps = state => { return {
  email: state.user.connection.email,
  updating: state.user.connection.updating,
  update_msg: state.user.connection.update_msg,
  error_msg: state.user.connection.error_msg,
  account: state.user.account,
} };

const mapDispatchToProps = dispatch => { return {
  check: (token) => check_pw_validation_token(dispatch, token),
  submit: (email, token, password) => submit_reset_password(dispatch, { email, token, password }),
  done: () => clear_update(dispatch),
} };

export default connect( mapStateToProps, mapDispatchToProps )(ResetPassword);
