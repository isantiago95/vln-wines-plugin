import axios from 'axios';

const Axios = axios.create({
  baseURL: `${appLocalizer.apiUrl}/vln-api/v1`,
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

export async function post(url, data = null) {
  try {
    return await Axios.post(url, data);
  } catch (error) {
    return error.response;
  }
}

export const patch = async (url, data) => {
  try {
    return await Axios.patch(url, data);
  } catch (error) {
    return error.response;
  }
};

export const del = async (url, data) => {
  try {
    console.log({ url, data });
    return await Axios.delete(url, data);
  } catch (error) {
    return error.response;
  }
};
