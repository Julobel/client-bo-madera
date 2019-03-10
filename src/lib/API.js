import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000/api';

const ACTOR_CLIENTS = '/actor_clients';
const PROJECTS = '/projects';
const MODULES = '/modules';

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

    // CLIENTS
    getClients() {
        return axios.get(API_URL + ACTOR_CLIENTS);
    },

    //PROJECT
    getProjects() {
        return axios.get(API_URL + PROJECTS);
    },

    //MODULES
    getModules() {
        return axios.get(API_URL + MODULES);
    }
}