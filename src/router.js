import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Pages/Home'
import Login from './components/Pages/Login'
import Client from './components/Pages/Client'
import Quotes from './components/Pages/Quotes/Quotes'
import Project from './components/Pages/Project'

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/client',
            name: 'Client',
            component: Client
        },
        {
            path: '/project',
            name: 'Project',
            component: Project
        },
        {
            path: '/quotes',
            name: 'Quotes',
            component: Quotes
        },
    ]
})