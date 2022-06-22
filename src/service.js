import settings from './settings';

const get = query => {
  return fetch(settings.api + query, {
    method: 'GET',
  }).then(response => {
    return response.json();
  });
};

const getEpisode = url => {
  return fetch(url ? url : settings.api, {
    method: 'GET',
  }).then(response => {
    return response.json();
  });
};

const getCharacters = query => {
  return fetch(settings.characters + query, {
    method: 'GET',
  }).then(response => {
    return response.json();
  });
};

export {get, getEpisode, getCharacters};
