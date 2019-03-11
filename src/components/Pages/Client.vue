<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fluid class="pa-0">
        <HeaderNavigation/>
        <v-layout align-center row ml-3 mr-3 mt-3>
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on }">
                    <h1 class="display-1 headline text-uppercase font-weight-bold">Clients</h1>
                    <v-spacer></v-spacer>
                    <v-btn color="info" v-on="on">Ajouter un client</v-btn>
                </template>
                <v-card>
                    <v-toolbar dark color="green darken-4">
                        <v-toolbar-title>Création d'un nouveau client</v-toolbar-title>
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
                                            <v-subheader class="text-uppercase title">Identité</v-subheader>
                                        </v-flex>
                                        <v-flex xs12 sm12 md6>
                                            <v-text-field label="Prénom*" v-model="firstName"
                                                          :rules="firstNameRules" required></v-text-field>
                                        </v-flex>
                                        <v-spacer></v-spacer>
                                        <v-flex xs12 sm12 md6>
                                            <v-text-field label="Nom*" v-model="lastName"
                                                          :rules="lastNameRules" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-subheader class="text-uppercase title">Adresse</v-subheader>
                                        </v-flex>
                                        <v-flex xs2 sm2 md2>
                                            <v-text-field label="N° de rue*" v-model="streetNumber" type="number"
                                                          :rules="streetNumberRules" required></v-text-field>
                                        </v-flex>
                                        <v-spacer></v-spacer>
                                        <v-flex xs10 sm10 md10>
                                            <v-text-field label="Rue*" v-model="street"
                                                          :rules="streetRules" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-text-field label="Bâtiment, entrée, code, ..." v-model="addressOption">
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4>
                                            <v-text-field label="Pays*" v-model="country"
                                                          :rules="countryRules"  required></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4>
                                            <v-text-field label="Ville*" v-model="city"
                                                          :rules="cityRules" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4>
                                            <v-text-field label="Code postal*" v-model="postalCode" type="number"
                                                          :rules="postalCodeRules"  required></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-subheader class="text-uppercase title">Contacts</v-subheader>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-text-field label="Email*" v-model="mail"
                                                          :rules="mailRules" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md6>
                                            <v-text-field label="Téléphone*" v-model="phoneNumber" type="number"
                                                          :rules="phoneNumberRules"  required></v-text-field>
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

        <!--TABLEAU-->
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
                    :items="clients"
                    :search="search"
            >
                <template class="tableLine" v-slot:items="props">
                    <td>{{ props.item.firstName }}</td>
                    <td>{{ props.item.lastName }}</td>
                    <td>{{ props.item.email }}</td>
                    <td>{{ props.item.phoneNumber }}</td>
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
                        Chargement des clients
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
    </v-container>
</template>

<script>
    import API from '../../lib/API';
    import axios from 'axios'
    import HeaderNavigation from "../Application/HeaderNavigation";
    import Footer from "../Application/Footer";
    export default {
        name: "Client",
        components: {Footer, HeaderNavigation},
        mounted() {
          this.load();
        },
        methods: {
            validate() {
                if (this.$refs.form.validate()) {
                    this.snackbar = true;
                    this.dialog = false;
                    this.postClient();
                }
            },
            close() {
                this.dialog = false;
                this.$refs.form.reset();
            },
            postClient() {
                this.loader = true;
                axios.post(API.getAPIUrl() + API.getClientsURI(),{
                    "firstName": this.firstName,
                    "lastName": this.lastName,
                    "streetNumber": Number(this.streetNumber),
                    "address1": this.street,
                    "address2": this.addressOption,
                    "postalCode": Number(this.postalCode),
                    "city": this.city,
                    "state": this.country,
                    "phoneNumber": Number(this.phoneNumber),
                    "email": this.mail
                })
                    .then((res) => {
                        this.$refs.form.reset();
                        this.load();
                        console.log(res);
                    });
            },
            load() {
                this.loader = true;
                API.getClients()
                    .then(clients => {
                        console.log(clients.data['hydra:member']);
                        this.clients = clients.data['hydra:member'];
                        this.loader = false;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loader = false;
                    })
            }
        },
        data () {
            return {
                dialog: false,
                loader: false,
                clients: [],
                notifications: false,
                sound: true,
                widgets: false,
                valid: true,

                search: '',
                headers: [
                    { text: 'Nom', value: 'firstName' },
                    { text: 'Prénom', value: 'lastName' },
                    { text: 'Email', value: 'email' },
                    { text: 'Tel', value: 'phoneNumber' },
                ],

                firstName: '',
                firstNameRules: [
                    v => !!v || 'Le prénom est requis'
                ],
                lastName: '',
                lastNameRules: [
                    v => !!v || 'Le prénom est requis'
                ],
                streetNumber: '',
                streetNumberRules: [
                    v => !!v || "Le numéro de rue est requis"
                ],
                street: '',
                addressOption: '',
                streetRules: [],
                country: '',
                countryRules: [],
                city: '',
                cityRules: [],
                postalCode: '',
                postalCodeRules: [],
                mail: '',
                mailRules: [
                    v => !!v || "L'email esr requis",
                    v => /.+@.+/.test(v) || "E-mail must be valid"
                ],
                phoneNumber: '',
                phoneNumberRules: [],
                snackbar: false,
                y: 'top',
                x: null,
                mode: '',
                timeout: 2000,
                text: 'Nouveau client enregistré'
            }
        }
    }
</script>

<style scoped>
    .tableLine:hover {
        background: #B9F6CA;
    }

    #card-text {
        font-size: 25px;
    }
</style>