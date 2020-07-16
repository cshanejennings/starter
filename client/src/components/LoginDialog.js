import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import {
  Dialog,
  DialogTitle,
  Paper,
  Button,
  FormControl,
  Divider,
  Typography,
  SvgIcon,
} from '@material-ui/core/';

import {
  PasswordField,
  TextInputField
} from '../components/form-fields/';

const google_styles = makeStyles(theme => ({
  icon: {
    width: 15,
    marginRight: 10
  },
}));


const GoogleLogo = (props) => {
  const classes = google_styles();
  return (
    <SvgIcon className={ classes.icon } viewBox="0 0 256 262" x="0px" y="0px">
      <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/>
      <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/>
      <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/>
      <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>
    </SvgIcon>
  );
}

const get_styles = makeStyles(theme => ({
  paper: {
    width: '100%',
    maxWidth: 600,
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
  login_links: {
    width: '90%',
    margin: '10px auto'
  },
  title: {
    textAlign: 'center'
  }
}));
const sys_pw = process.env.REACT_APP_TXTWAIT_ADMIN_PW || '';
const sys_email = process.env.REACT_APP_TXTWAIT_ADMIN_EMAIL || '';

const LoginDialog = (props) => {
  const classes = get_styles();

  const {
    open,
    handle_login,
    error_msg,
    get_google_url,
    google_url,
  } = props;

  const [email, set_email] = React.useState(sys_email);
  const [password, set_password] = React.useState(sys_pw);

  const submit = () => handle_login(email, password);
  const user_change = (email) => set_email(email);
  const pw_change = (pw) => set_password(pw);


  const error_prompt = (error_msg) ? (
    <Typography align="center" variant="subtitle2" className={ classes.error_msg }>
      { error_msg }
    </Typography>
  ) : "";
  if (google_url) window.location=google_url;

    return (
      <Dialog aria-labelledby="simple-dialog-title" open={ open }>
        <DialogTitle className={ classes.title }>Log in</DialogTitle>
        <Paper className={ classes.paper }>
            <TextInputField
              label={ "Account Email" }
              error_msg={ error_msg }
              on_change={ user_change }
              value={ email }
            />
            <PasswordField
              error_msg={ error_msg }
              password={ password }
              pw_change={ pw_change }
            />
            { error_prompt }
            <FormControl fullWidth className={classes.margin}>
              <Button color="primary" variant="contained" onClick={submit}>
                Login
              </Button>
            </FormControl>
            <Typography align="center" className={ classes.login_links } variant="subtitle2">
              <Link to="/forgot-password">Forgot Password?</Link>
            </Typography>
            <Typography align="center" className={ classes.login_links } variant="subtitle2">Or</Typography>
            <FormControl fullWidth className={classes.margin}>
              <Button color="primary" variant="outlined" onClick={ get_google_url }>
                <GoogleLogo /> Sign-in to your account with Google
              </Button>
            </FormControl>
            <Divider className={ classes.divider } />
            <Typography align="right" className={ classes.login_links } variant="subtitle2">
              <Link to="/register">Create an account</Link>
            </Typography>
        </Paper>
      </Dialog>
    );
}

LoginDialog.defaultProps = {
  open: true,
}

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handle_login: PropTypes.func.isRequired,
  error_msg: PropTypes.string.isRequired,
  get_google_url: PropTypes.func.isRequired,
  google_url: PropTypes.string.isRequired,
}

export default LoginDialog;
