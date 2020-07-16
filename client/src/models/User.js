import PropTypes from 'prop-types';
import { local_time } from '../util/server-connection';


export const create_user_model = (dto) => {
  const vo = {
    name: dto.name,
    email: dto.email,
    created_at: local_time(dto.created_at),
    updated_at: (dto.updated_at) ? local_time(dto.updated_at) : null,
  }
  return vo;
}

export const user_store_initial_state = {
    name: null,
    email: null,
    created_at: null,
    updated_at: null,
  }


export const UserProps = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  created_at: PropTypes.instanceOf(Date),
  updated_at: PropTypes.instanceOf(Date),
  deleted_at: PropTypes.instanceOf(Date),
});
