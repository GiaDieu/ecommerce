import Axios from 'axios';
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../constants/RegisterConstants';

export const register = (name, email, password, confirmPassword) => async (
  dispatch,
) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { name, email, password, confirmPassword },
  });

  try {
    const { data } = await Axios.post('/api/users/register', {
      name,
      email,
      password,
      confirmPassword,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};
