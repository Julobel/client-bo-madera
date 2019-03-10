<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fluid class="pa-0">
        <HeaderNavigation/>
        <v-layout align-center row ml-3 mr-3 mt-3>
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on }">
                    <h1 class="display-1 headline text-uppercase font-weight-bold">Devis</h1>
                    <v-spacer></v-spacer>
                    <v-btn color="info" v-on="on">Ajouter un devis</v-btn>
                </template>
                <v-card>
                    <v-toolbar dark color="green darken-4">
                        <v-toolbar-title>Création d'un nouveau devis</v-toolbar-title>
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
                                            <v-subheader class="text-uppercase title">Informations générales</v-subheader>
                                        </v-flex>
                                        <v-flex xs12 sm12 md6>
                                            <v-text-field label="Date*" v-model="quotesDate" type="date"
                                                          :rules="quotesDateRules" required clearable></v-text-field>
                                        </v-flex>
                                        <v-spacer></v-spacer>
                                        <v-flex xs12 sm12 md6 mb-3>
                                            <v-text-field label="Remise" v-model="quotesDiscount"
                                                          required clearable></v-text-field>
                                        </v-flex>

                                        <v-flex xs12 sm12 md12 mb-5>
                                            <v-layout row justify-space-between>
                                                <v-subheader class="text-uppercase title">Modules</v-subheader>

                                                <v-btn  color="info"
                                                        @click="addNewModule()">Ajouter un module</v-btn>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex v-for="(module, index) in quotesModules" class="xs12 sm12 md-5 mb-5">
                                            <v-layout class="row">
                                                <h3>Module {{index + 1}}</h3>
                                                <v-spacer></v-spacer>
                                            </v-layout>
                                            <v-layout class="row">
                                                <v-flex xs12 sm12 md5>
                                                    <v-select label="Nom*" v-model="module.data"
                                                              :items="modules"
                                                              item-text="label"
                                                              persistent-hint
                                                              return-object
                                                              single-line
                                                              :rules="moduleNameRules" required>
                                                        <template slot="selection" slot-scope="data">
                                                            <template>
                                                                {{data.item.label}}
                                                            </template>
                                                        </template>
                                                        <template slot="item" slot-scope="data">
                                                            <template>
                                                                <v-list-tile-content>
                                                                    <v-list-tile-title v-html="
                                                                        data.item.label
                                                                    "></v-list-tile-title>
                                                                    <v-list-tile-sub-title v-html="
                                                                        data.item.moduleNature.label
                                                                    "></v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                                <p>
                                                                    <strong>L:</strong> {{data.item.length}}{{data.item.moduleNature.moduleUnit.label}}  -
                                                                    <strong>l:</strong> {{data.item.height}}{{data.item.moduleNature.moduleUnit.label}}
                                                                </p>
                                                            </template>
                                                        </template>
                                                    </v-select>
                                                </v-flex>
                                                <v-flex xs12 sm12 md5>
                                                    <v-text-field label="Quantité*" v-model="module.quantity" type="number"
                                                                  required></v-text-field>
                                                </v-flex>
                                                <v-icon class="formIcon red--text ml-3"
                                                        @click="deleteModulule(index)">close</v-icon>
                                            </v-layout>
                                        </v-flex>
                                        <small>* indique les champs obligatoires</small>

                                        <v-flex xs12 sm12 md12 mt-4>
                                            <v-subheader class="text-uppercase title">Vue d'ensemble</v-subheader>
                                        </v-flex>

                                        <!--TABLEAU-->
                                        <v-flex xs12 sm12 md12>
                                            <v-card class="mt-3 ml-2 mr-2">
                                                <v-data-table
                                                        :headers="headers"
                                                        :items="quotesModules"
                                                        hide-actions
                                                        hide-details
                                                        no-data-text="Aucun modules n'a été ajouté pour le moment !"
                                                >
                                                    <template class="tableLine" v-slot:items="props">
                                                        <td>{{ props.item.data.label }}</td>
                                                        <td>{{ props.item.data.moduleNature.label }}</td>
                                                        <td>{{ props.item.data.length }} {{ props.item.data.moduleNature.moduleUnit.label }}</td>
                                                        <td>{{ props.item.data.height }} {{ props.item.data.moduleNature.moduleUnit.label }}</td>
                                                        <td>{{ props.item.quantity }}</td>
                                                        <td>{{ calculatePrice(props.item.data, props.index, props.item.quantity) * props.item.quantity }}€</td>
                                                    </template>
                                                    <template v-slot:footer>
                                                        <td :colspan="headers.length" class="text-xs-right">
                                                            <strong>Prix Total: {{ totalPriceHT }}€ HT | {{totalPriceHT + (totalPriceHT * (20/100))}}€ TTC</strong>
                                                        </td>
                                                    </template>
                                                </v-data-table>
                                            </v-card>
                                        </v-flex>

                                    </v-layout>
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

        <!--NOTIFICATION-->
        <v-snackbar
                v-model="snackbar"
                color="info"
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
                    width="300"
            >
                <v-card
                        color="#1B5E20"
                        dark
                >
                    <v-card-text>
                        Chargement des devis
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
    import API from '../../../lib/API';
    import axios from 'axios';
    import HeaderNavigation from "../../Application/HeaderNavigation";
    import Footer from "../../Application/Footer";
    export default {
        name: "Quotes",
        components: {Footer, HeaderNavigation},
        mounted() {
            this.load();
        },
        methods: {
            calculatePrice(item, index, quantity) {
                let price = 0;
                item.structureComponents.forEach((structureComponent) => {
                    price += (structureComponent.component.componentPrices[0].value * structureComponent.componentQuantity);
                    console.log('Price = ' + price);
                });
                this.quotesModules[index].price = price * quantity;
                this.calculateTotalPriceHT();
                return price;
            },
            calculateTotalPriceHT() {
                this.totalPriceHT = 0;
                let currentTotal = 0;
                this.quotesModules.forEach((quotesModule) => {
                    currentTotal += quotesModule.price;
                });
                this.totalPriceHT = currentTotal;
            },
            addNewModule() {
                this.quotesModules.push({
                    data: [],
                    quantity: '',
                    price: 0
                })
            },
            deleteModulule(index) {
                this.quotesModules.splice(index, 1);
            },
            validate() {
                if (this.$refs.form.validate()) {
                    this.snackbar = true;
                    this.dialog = false;
                    this.postClient();
                }
            },
            close() {
                this.quotesModules = [];
                this.quotesModules = [
                    {
                        data: [],
                        quantity: '',
                        price: 0
                    }
                ];
                this.dialog = false;
                this.$refs.form.reset();
            },
            load() {
                this.totalPriceHT = 0;
                this.loader = true;
                API.getModules()
                    .then(modules => {
                        console.log(modules.data['hydra:member']);
                        this.modules = modules.data['hydra:member'];
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
                modules: [],
                notifications: false,
                sound: true,
                widgets: false,
                valid: true,
                totalPriceHT: 0,

                quotesDate: '',
                quotesDateRules: [
                    v => !!v || 'La date est requise'
                ],
                quotesDiscount: '',
                moduleNameRules: [
                    v => !!v || 'Le label est requis'
                ],
                moduleQuantityRules: [
                    v => !!v || 'La quantité est requise'
                ],

                quotesModules: [
                    {
                        data: [],
                        quantity: '',
                        price: 0
                    }
                ],

                headers: [
                    { text: 'Module', value: 'data.label' },
                    { text: 'Nature', value: 'data.moduleNature.label' },
                    { text: 'Longueur', value: 'data.length' },
                    { text: 'Largeur', value: 'data.height' },
                    { text: 'Quantité', value: 'quantity' },
                    { text: 'Prix', value: 'price'},
                ],

                snackbar: false,
                y: 'top',
                x: null,
                mode: '',
                timeout: 2000,
                text: 'Devis enregistré',
            }
        }
    }
</script>

<style scoped>
    .formIcon {
        font-size: 40px;
    }

    .formIcon:hover {
        cursor: pointer;
    }
</style>