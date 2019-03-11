<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <HeaderNavigation/>

        <v-layout align-center row ml-3 mr-3 mt-3>
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on }">
                    <h1 class="display-1 headline text-uppercase font-weight-bold">Projets</h1>
                    <v-spacer></v-spacer>
                    <v-btn color="info" v-on="on">Ajouter un projet</v-btn>
                </template>
                <v-card>
                    <v-toolbar dark color="green darken-4">
                        <v-toolbar-title>Création d'un nouveau projet</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-container class="align-center justify-center grid-list-md">
                            <v-flex xs12 sm12 offset-md1 md10 offset-lg2 lg8>
                                <v-form
                                        ref="form"
                                        v-model="valid"
                                        lazy-validation
                                >
                                    <v-layout wrap>
                                        <v-flex xs12 sm12 md12>
                                            <v-subheader class="text-uppercase title">Projet</v-subheader>
                                        </v-flex>
                                        <v-flex xs12 sm12 md6>
                                            <v-text-field label="Nom*" v-model="projectName"
                                                          :rules="projectNameRules" clearable required></v-text-field>
                                        </v-flex>
                                        <v-spacer></v-spacer>
                                        <v-flex xs12 sm12 md6>
                                            <v-text-field label="Date*" v-model="projectDate" type="date"
                                                          :rules="projectDateRules" clearable required></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-subheader class="text-uppercase title">Client</v-subheader>
                                        </v-flex>
                                        <v-flex xs12 sm12 md6>
                                            <v-autocomplete
                                                    v-model="projectClient"
                                                    :items="clients"
                                                    label="Client*"
                                                    persistent-hint
                                                    return-object
                                                    single-line
                                                    item-text="firstName"
                                                    :rules="projectClientRules" clearable required
                                            >
                                                <template slot="selection" slot-scope="data">
                                                    <template>
                                                        {{data.item.firstName}} {{data.item.lastName}}
                                                    </template>
                                                </template>
                                                <template slot="item" slot-scope="data">
                                                    <template>
                                                        {{data.item.firstName}} {{data.item.lastName}}
                                                    </template>
                                                </template>
                                            </v-autocomplete>
                                        </v-flex>
                                    </v-layout>
                                    <small>* indique les champs obligatoires</small>
                                    <v-layout align-center justify-end row>
                                        <v-btn dark color="red" @click="close">
                                            Annuler
                                        </v-btn>
                                        <v-btn
                                                :disabled="!valid"
                                                color="success"
                                                @click="validate"
                                        >
                                            Valider
                                        </v-btn>
                                    </v-layout>
                                </v-form>
                            </v-flex>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-layout>

        <v-card class="mt-3 ml-2 mr-2">
            <v-card-title>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Rechercher"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="projects"
                    :search="search"
            >
                <template class="tableLine" v-slot:items="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.date }}</td>
                    <td>{{ props.item.actorClientId.firstName }} {{ props.item.actorClientId.lastName }}</td>
                </template>
            </v-data-table>
        </v-card>

        <!--NOTIFICATION-->
        <v-snackbar
                v-model="snackbar"
                color="info"
                :right="x === 'right'"
                :timeout="timeout"
                :top="y === 'top'"
        >
            {{ text }}
            <v-btn
                    color="red"
                    flat
                    @click="snackbar = false"
            >
                Fermer
            </v-btn>
        </v-snackbar>

        <!--LOADER-->
        <div class="text-xs-center">
            <v-dialog
                    v-model="loader"
                    hide-overlay
                    persistent
                    width="400"
            >
                <v-card
                        color="#1B5E20"
                        dark
                >
                    <v-card-text id="card-text">
                        Chargement des projets
                        <v-progress-linear
                                indeterminate
                                color="#69F0AE"
                                class="mb-0"
                        ></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import API from '../../lib/API';
    import axios from 'axios'
    import HeaderNavigation from "../Application/HeaderNavigation";
    import Footer from "../Application/Footer";
    export default {
        name: "Project",
        components: {Footer, HeaderNavigation},
        mounted() {
            this.load();
        },
        methods: {
            load() {
                this.loader = true;
                API.getProjects()
                    .then((projects) => {
                        this.projects = projects.data['hydra:member'];
                        this.loader = false;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loader = false;
                    });
                API.getClients()
                    .then((clients) => {
                        this.clients = Object.values(clients.data['hydra:member']);
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loader = false;
                    });
            },
            validate() {
                if (this.$refs.form.validate()) {
                    this.snackbar = true;
                    this.dialog = false;
                    console.log(this.projectClient);
                    this.postProject();
                }
            },
            close() {
                this.dialog = false;
                this.$refs.form.reset();
            },
            postProject() {
                this.loader = true;
                axios.post(API.getAPIUrl() + API.getProjectsURI(), {
                    "actorClientId": "/api/actor_clients/" + this.projectClient.id,
                    "name": this.projectName,
                    "date": this.projectDate,
                })
                    .then((res) => {
                        this.$refs.form.reset();
                        this.load();
                        console.log(res);
                    });
            },
        },
        data () {
            return {
                dialog: false,
                loader: false,
                projects: [],
                clients: [],
                notifications: false,
                sound: true,
                widgets: false,
                valid: true,
                search: '',
                snackbar: false,
                y: 'top',
                x: null,
                mode: '',
                timeout: 2000,
                text: 'Nouveau projet enregistré',

                headers: [
                    { text: 'Nom', value: 'name' },
                    { text: 'Date', value: 'date' },
                    { text: 'Client', value: 'actorClientId.firstName'}
                ],

                projectName: '',
                projectNameRules: [
                    v => !!v || 'Le nom est requis'
                ],
                projectDate: '',
                projectDateRules: [
                    v => !!v || 'La date est requise'
                ],
                projectClient: '',
                projectClientRules: [
                    v => !!v || 'Le client est requis'
                ],
            }
        }
    }
</script>

<style scoped>
    #card-text {
        font-size: 25px;
    }

</style>