import { async } from 'regenerator-runtime';
// import { TIMEOUT_SEC } from './config.js';

/////////////////////////////////////////////////
// dá erro no parcel, dis que não acha o config.js
// por isso coloquei no helpers.js
export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
export const TIMEOUT_SEC = 10;
export const RES_PER_PAGE = 10;
export const KEY = '687fdd71-64f2-4bd9-93f5-c442264d8b96';
export const MODAL_CLOSE_SEC = 2.5;
// fim do config.js
/////////////////////////////////////////////////

// functions that we use all over the project

// caso o fetch demore muito:
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// vamos juntar getJSON e send JSON em uma função
// upload setamos par aundefined para definir o fetchPro como undefined se não houver upload data
export const AJAX = async function (url, uploadData = undefined) {
  try {
    // testa se uploadData existe ou não, para definir fetchPro
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    // se response. ok é false (!res.ok):
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    // quando ocorre um erro queremos lidar com ele no model e não no helpers
    throw err;
  }
};

/*
// ex function that will get json
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    // se response. ok é false (!res.ok):
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    // quando ocorre um erro queremos lidar com ele no model e não no helpers
    throw err;
  }
};

// send JSON
export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    // se response. ok é false (!res.ok):
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    // quando ocorre um erro queremos lidar com ele no model e não no helpers
    throw err;
  }
};
*/
