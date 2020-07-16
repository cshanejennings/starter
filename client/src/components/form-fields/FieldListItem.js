import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  ListItem,
  Typography,
  Divider,
} from '@material-ui/core/';

const get_styles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "row wrap",
  },
  label: {
    margin: "0 .5em 0 0",
    padding: "0",
    flex: "1 1 25%"
  },
  value: {
    margin: "0 0 0 .5em",
    padding: "0",
    flex: "1 1 55%"
  },
  action: {
    margin: "0 0 0 .5em",
    padding: "0",
    flex: "1 1 10%"
  }
}));

const FieldListItem = (props) => {
  const classes = get_styles();
  const { value, label } = props;

    return (
      <Fragment>
        <ListItem className={ classes.root }>
          <Typography className={ classes.label }>{ label }</Typography>
          <Typography className={ classes.value }>{ value }</Typography>
        </ListItem>
        <Divider />
      </Fragment>
    );
}

FieldListItem.defaultProps = {
  value: ''
}

FieldListItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
}

export default FieldListItem;
