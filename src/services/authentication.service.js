import { request, history } from '../utils';
import { endpointConstants } from '../constants';

const login = ({ email, password }) => {
  const requestOptions = request.options(
    'POST',
    JSON.stringify({ email, password }),
    false,
    true
  );

  return fetch(endpointConstants.LOGIN, requestOptions)
    .then(request.handleResponse)
    .then((res) => {
      // login successful if there's a jwt token in the response
      if (res.token) {
        // store user details and jwt token in local storage
        const user = Object.assign({ email: res.email }, { token: res.token });
        localStorage.setItem('user', JSON.stringify(user));
        window.location = '/';
      }

      return res;
    });
};

export const authenticationService = {
  login,
};
