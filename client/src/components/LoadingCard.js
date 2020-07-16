import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  Paper,
  Card,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress
}  from '@material-ui/core/';

import {
  Sync
} from '@material-ui/icons/';


const get_styles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  card: {
    marginTop: theme.spacing(2),
    width: '100%',
    marginBottom: theme.spacing(2),
    padding : theme.spacing(2),
    textAlign: 'center'
  },
  bar: {
    margin: 15
  }
}));

const LoadingCard = (props) => {
  const classes = get_styles();
  const { label, queue} = props;
  useEffect(() => { }, [ ]);

  const map_queue_item = (item, key) => {
    return (
      <ListItem key={key}>
        <ListItemIcon>
          <Sync />
        </ListItemIcon>
        <ListItemText inset={true} primary={ item } />
      </ListItem>
    )
  }

  return (
    <Paper>
      <Card className= { classes.card }>
        <Typography variant="h5">{ label }</Typography>
        <LinearProgress className={ classes.bar } variant="query" />
        <List>
          { queue.map(map_queue_item) }
        </List>
      </Card>
    </Paper>
  );
}

LoadingCard.defaultProps = {
  label: 'Loading required data, one moment...',
  queue: [],
}

LoadingCard.propTypes = {
  label: PropTypes.string.isRequired,
  queue: PropTypes.array.isRequired,
}

export default LoadingCard;
