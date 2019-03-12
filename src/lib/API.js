import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000/api';

const ACTOR_CLIENTS = '/actor_clients';
const PROJECTS = '/projects';
const QUOTES = '/quotes';
const MODULES = '/modules';
const QUOTES_ADMINISTRATIVE_STATES ='/quotes_administrative_states';
const QUOTES_COVERING ='/component_coverings';
const QUOTES_EXT ='/component_exterior_finishes';
const QUOTES_INS ='/component_insulations';
const QUOTES_INT ='/component_interior_finishes';
const QUOTES_WIN ='/component_window_frames';

export default {
  getAPIUrl() {
    return API_URL;
  },
  getClientsURI() {
    return ACTOR_CLIENTS;
  },
  getProjectsURI() {
    return PROJECTS;
  },
  getModulesURI() {
    return MODULES;
  },
  getQuotesAdministrativesStatesURI() {
    return QUOTES_ADMINISTRATIVE_STATES;
  },

  // CLIENTS
  getClients() {
    return axios.get(API_URL + ACTOR_CLIENTS);
  },

  // PROJECT
  getProjects() {
    return axios.get(API_URL + PROJECTS);
  },

  // QUOTES
  getQuotes() {
    return axios.get(API_URL + QUOTES);
  },

  // MODULES
  getModules() {
    return axios.get(API_URL + MODULES);
  },
    getCoveringQualities() {
        return axios.get(API_URL + QUOTES_COVERING);
    },
    getQuotesAdministrativesStates() {
      return axios.get(API_URL + QUOTES_ADMINISTRATIVE_STATES);
  }
    ,
    getInteriorQualities() {
        return axios.get(API_URL + QUOTES_INT);
    }
    ,
    getExteriorQualities() {
        return axios.get(API_URL + QUOTES_EXT);
    },
    getInsulationQualities() {
        return axios.get(API_URL + QUOTES_INS);
    },
    getWindowQualities() {
        return axios.get(API_URL + QUOTES_WIN);
    }


};
