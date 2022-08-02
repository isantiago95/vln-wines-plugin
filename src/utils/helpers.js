import { get, post, patch, del } from './apiClient';

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

export const isOdd = num => (num % 2 === 0 ? true : false);

export function isEmptyObject(obj) {
  return JSON.stringify(obj) === '{}';
}

export const isEmptyArray = array => {
  if (Array.isArray(array) && array.length) return false;
  else return true;
};

export const getWines = async () => {
  try {
    const { data } = await get('/wines');
    if (!isEmptyArray(data)) return data;
    else return [];
  } catch (error) {}
};

export const dispatchWine = async (type, payload) => {
  console.log({ type, payload });
  try {
    let res = null;
    switch (type) {
      case 'add': {
        res = await post('/wines', payload);
        break;
      }
      case 'update': {
        res = await patch(`/wines/${payload.id}`, { ...payload, id: null });
        break;
      }
      case 'delete': {
        res = await del(`/wines/${payload}`);
        break;
      }
      default:
        break;
    }
    console.log(res);
    if (res.data.query_response === 'success') {
      if (type === 'add') alert('Wine added successfully');
      else if (type === 'update') alert('Wine updated successfully');
      else if (type === 'delete') alert('Wine deleted successfully');
      res = null;
      return await getWines();
    } else {
      alert('Oops, there was an error, please try again...');
      res = null;
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

export const splitAwards = str => {
  if (str) {
    const [name, rest] = str.split(' | ');
    const color = name === 'ORO' || name === 'GOLD' ? 'gold' : 'silver';
    return { name, rest, color };
  } else return;
};

// const updateUrl = str => str.replace('https://vinicola-la-nuestra.local', '');

// export const updateData = async wines => {
//   try {
//     wines.forEach(async w => {
//       const res = await patch(`/wines/${w.id}`, {
//         ...w,
//         id: null,
//       });
//       console.log(res);
//     });
//   } catch (error) {}
// };

// const prices = [
//   { name: 'Mision', price_es: '$350.00 MXN', price_en: '$12.00 USD' },
//   { name: 'Merlot', price_es: '$430.00 MXN', price_en: '$15.00 USD' },
//   { name: 'Reserva', price_es: '$430.00 MXN', price_en: '$15.00 USD' },
//   { name: 'Adalid', price_es: '$400.00 MXN', price_en: '$14.00 USD' },
//   { name: 'Cantiga', price_es: '$330.00 MXN', price_en: '$12.00 USD' },
//   { name: 'Alabardero', price_es: '$410.00 MXN', price_en: '$14.00 USD' },
//   { name: 'Juglar', price_es: '$400.00 MXN', price_en: '$15.00 USD' },
//   { name: 'Princesa', price_es: '$350.00 MXN', price_en: '$10.00 USD' },
// ];

// export const replaceLineBreak = (str, removeLine = true) => removeLine ? str.replaceAll('\n', '**') : str.replaceAll('**', '\n');
