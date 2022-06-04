import { get } from './apiClient';

export function checkIfImageExists(url, callback) {
  const img = new Image();
  img.src = url;
  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };
    img.onerror = () => {
      callback(false);
    };
  }
}

export async function retrieveData(callUsers = false) {
  let result = {};
  if (callUsers) {
    const { data, status } = await get('/users');
    console.log(data);
    if (status === 200) result = { ...result, users: data };
  }
  const stackList = getStackList();
  if (!stackList) {
    const { data, status } = await get('/stack');
    if (status === 200) {
      localStorage.setItem('stackList', JSON.stringify(data));
      result = { ...result, stack: data };
    }
  } else {
    result = { ...result, stack: stackList };
  }

  return result;
}

export const getStackList = () => JSON.parse(localStorage.getItem('stackList'));
