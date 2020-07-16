import PropTypes from 'prop-types';

export const create_connect_model = (dto) => {
  const vo = {
    authorizing: dto.authorizing,
    signed_in: dto.signed_in,
    initialized: dto.initialized,
    updating: dto.updating,
    update_msg: dto.update_msg,
    error_msg: dto.error_msg,
    email: dto.email,
  }
  return vo;
}

export const user_connection_store_initial_state = {
  authorizing: false,
  oath: {
    google: '',
  },
  initialized: false,
  signed_in: false,
  updating: false,
  update_msg: '',
  error_msg: '',
  email: '',
}

export const ConnectionProps = PropTypes.shape({
  authorizing: PropTypes.bool.isRequired,
  oath: PropTypes.shape({
    google: PropTypes.string.isRequired,
  }),
  initialized: PropTypes.bool.isRequired,
  signed_in: PropTypes.bool.isRequired,
  updating: PropTypes.bool.isRequired,
  update_msg: PropTypes.string.isRequired,
  error_msg: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
});
