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

// replace the home domain of the wine urls to save into the db only the relative path
export const parseUrl = url => url && url.replace(url.split('/wp-content')[0], '');

export const dispatchWine = async (type, payload) => {
  try {
    let res = null;
    switch (type) {
      case 'add': {
        res = await post('/wines', {
          ...payload,
          image_url: parseUrl(payload.image_url),
          award_image: parseUrl(payload.award_image),
          datasheet_es: parseUrl(payload.datasheet_es),
          datasheet_en: parseUrl(payload.datasheet_en),
        });
        break;
      }
      case 'update': {
        res = await patch(`/wines/${payload.id}`, {
          ...payload,
          image_url: parseUrl(payload.image_url),
          award_image: parseUrl(payload.award_image),
          datasheet_es: parseUrl(payload.datasheet_es),
          datasheet_en: parseUrl(payload.datasheet_en),
        });
        break;
      }
      case 'delete': {
        res = await del(`/wines/${payload}`);
        break;
      }
      default:
        break;
    }

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

export const splitAwards = (str, showAwards = false) => {
  if (str) {
    if (showAwards) {
      const [title, ...awards] = str.split('\n');
      const [award, ...rest] = title.split(' | ');
      const color = award === 'ORO' || award === 'GOLD' ? 'gold' : 'silver';
      const name = (
        <span className='fs-6 text'>
          {rest.join('').split(' ')[1]} | <strong className={color}>{award}</strong>
        </span>
      );
      const awardsDescription = (
        <ul>
          {awards.map((a, idx) => (
            <li key={idx}>
              <span className='fs-6 text'>{a}</span>
            </li>
          ))}
        </ul>
      );
      return { name, awards: awardsDescription };
    } else {
      const [name, rest] = str.split(' | ');
      const color = name === 'ORO' || name === 'GOLD' ? 'gold' : 'silver';
      return { name, rest, color };
    }
  } else return;
};

const whatsappApi = 'https://api.whatsapp.com/send?phone=526644840514&text=';

export const generateMessage = txt =>
  txt.replaceAll(' ', '%20').replaceAll('"', '%22').replaceAll('¿', '%C2%BF');

export const whatsappLink = (isMx = true, wine) =>
  `${whatsappApi}${isMx ? whats_es(wine) : whats_en(wine)}`;

const whats_es = wine =>
  `Hola,%20estoy%20interesado%20en%20el%20vino%20%22${wine}%22,%20%C2%BFc%C3%B3mo%20puedo%20adquirirlo?`;
const whats_en = wine =>
  `Hello,%20I%20am%20interested%20in%20the%20wine%20%22${wine}%22,%20how%20can%20I%20buy%20it?`;

export function getLanguage(cookieName = 'wp-wpml_current_language') {
  let cookie = {};
  document.cookie.split(';').forEach(function (el) {
    let [key, value] = el.split('=');
    cookie[key.trim()] = value;
  });
  return cookie[cookieName];
}
