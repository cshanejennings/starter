import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import {
  Paper,
  Typography,
  FormControl,
  Button
} from '@material-ui/core/';

import { Redirect } from 'react-router';

import {
  TextInputField
} from '../components/form-fields/';

import {
  submit_forgot_password,
  clear_update,
} from '../store/store-user.js';

const get_styles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(4),
  },
}));

const ForgotPassword = (props) => {
  const classes = get_styles();
  const { user, submit, error_msg, update_msg } = props;
  const [email, set_email] = React.useState('');
  const user_change = (email) => set_email(email);

  if (user.account.email) return <Redirect to='/account' />;

  const error_prompt = (error_msg) ? (
    <Typography align="center" variant="subtitle2" className={ classes.error_msg }>
      { error_msg }
    </Typography>
  ) : "";
  const send_request = () => submit(email);

  return (update_msg) ? (
    <div>{ update_msg }</div>
  ): (
    <Paper className={classes.paper}>
      <Typography variant="h5">Request a password reset.</Typography>
      { error_prompt }
      <TextInputField
        label={ "Account Email" }
        error_msg={ error_msg }
        on_change={ user_change }
        value={ email }
      />
      <FormControl fullWidth className={classes.margin}>
        <Button color="primary" variant="contained" onClick={ send_request }>
          Get Password Reset Email
        </Button>
      </FormControl>
    </Paper>
  );
}

ForgotPassword.defaultProps = {}

ForgotPassword.propTypes = {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ])
};

const mapStateToProps = state => { return {
  updating: state.user.connection.updating,
  update_msg: state.user.connection.update_msg,
  user: state.user,
} };

const mapDispatchToProps = dispatch => { return {
  submit: (email) => submit_forgot_password(dispatch, { email }),
  done: () => clear_update(dispatch),
} };

export default connect( mapStateToProps, mapDispatchToProps )(ForgotPassword);
