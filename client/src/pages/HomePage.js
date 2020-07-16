import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import {
  Paper,
  Typography,
} from '@material-ui/core/';

import { user_loaded } from '../store/store-user.js';
import { LoadingCard } from '../components/';

const get_styles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(4),
  },
}));

const HomePage = (props) => {
  const classes = get_styles();
  const { user, get_dispatch } = props;
  const { account } = user;

  const queue = user_loaded({ user }, get_dispatch());

  return (queue.length) ? <LoadingCard queue={ queue } /> : (
    <Paper className={classes.paper}>
      <Typography variant="h5">You are logged in as { account.first_name }.</Typography>
    </Paper>
  );
}

HomePage.defaultProps = {}

HomePage.propTypes = {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ])
};

const mapStateToProps = state => { return {
  user_data: state.user.connection,
  user: state.user,
} };

const mapDispatchToProps = dispatch => { return {
  get_dispatch: () => dispatch,
} };

export default connect( mapStateToProps, mapDispatchToProps )(HomePage);
