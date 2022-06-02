import axios from 'axios';

const Axios = axios.create({
  baseURL: `${appLocalizer.apiUrl}/msapi/v1`,
  headers: {
    'content-type': 'application/json',
    'X-WP-NONCE': appLocalizer.nonce,
  },
});

export const get = async url => {
  try {
    return await Axios.get(url);
  } catch (error) {
    return error.response;
  }
};

export async function post({ url, data = null }) {
  try {
    return await Axios.post(url, data);
  } catch (error) {
    return error.response;
  }
}

export const put = async ({ url, data }) => {
  try {
    return await Axios.put(url, data);
  } catch (error) {
    return error.response;
  }
};
