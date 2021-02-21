import { client } from '../../config/api';
import queryString from 'query-string';

export const apiCalls = {
  get(endpoint, data) {
    if (data) {
      return client
        .get(endpoint + '?' + queryString.stringify(data))
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    } else {
      return client
        .get(endpoint)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    }
  },
  getBlob(endpoint, data) {
    return client
      .get(endpoint + '?' + queryString.stringify(data), {
        responseType: 'blob',
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  post(endpoint, data) {
    return client
      .post(endpoint, data)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  put(endpoint, data) {
    return client
      .put(endpoint, data)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  delete(endpoint, data) {
    return client
      .delete(endpoint + '?' + queryString.stringify(data))
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
};
