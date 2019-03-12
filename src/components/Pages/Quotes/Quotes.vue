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
                                            <v-select label="Projet*" v-model="quotes.project"
                                                      :items="projects"
                                                      item-text="firstName"
                                                      persistent-hint
                                                      return-object
                                                      single-line
                                                      clearable
                                                      :rules="projectRules" required>
                                                <template slot="selection" slot-scope="data">
                                                    <template>
                                                        {{data.item.name}}
                                                    </template>
                                                </template>
                                                <template slot="item" slot-scope="data">
                                                    <template>
                                                        <v-list-tile-content>
                                                            <v-list-tile-title v-html="
                                                                    data.item.name
                                                            "></v-list-tile-title>
                                                        </v-list-tile-content>
                                                        <small>
                                                            {{data.item.actorClientId.firstName}}  -
                                                            {{data.item.actorClientId.firstName}}
                                                        </small>
                                                    </template>
                                                </template>
                                            </v-select>
                                        </v-flex>
                                        <v-flex xs12 sm12 md6>
                                            <v-text-field label="Date*" v-model="quotes.date" type="date"
                                                          :rules="quotesDateRules" required clearable></v-text-field>
                                        </v-flex>
                                        <v-spacer></v-spacer>
                                        <v-flex xs12 sm12 md6>
                                            <v-autocomplete
                                                    v-model="administrativeState"
                                                    :items="administrativeSates"
                                                    label="Etat*"
                                                    persistent-hint
                                                    return-object
                                                    single-line
                                                    item-text="label"
                                                    :rules="administrativeStateRules" clearable required
                                            >
                                            </v-autocomplete>
                                        </v-flex>
                                        <v-flex xs12 sm12 md6 mb-3>
                                            <v-text-field label="Remise" v-model="quotes.discount" type="number"
                                                          required clearable></v-text-field>
                                        </v-flex>

                                        <v-flex xs12 sm12 md12 mb-5>
                                            <v-layout row>
                                                <v-subheader class="text-uppercase title">Modules</v-subheader>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex v-for="(module, index) in quotesModules" class="xs12 sm12 md-5 mb-5">
                                            <v-layout class="row">
                                                <h3>Module {{index + 1}}</h3>
                                                <v-spacer></v-spacer>
                                            </v-layout>
                                            <v-layout class="row">
                                                <v-flex xs12 sm12 md5>
                                                    <v-select label="Nom*" v-model="module.data" @change="initCustomizeModule(index)"
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
                                            <v-layout v-if="Object.values(module.data).length >0 " class="row" >
                                                <v-flex xs10 sm10 md4>
                                                    <v-btn  color="info"
                                                            @click="customizeModule(index,module.data)">Personnaliser</v-btn>
                                                </v-flex>
                                                <v-flex v-if="customizedModule.includes(index)" class="row">
                                                    <v-select label="" v-model="covering[index]"
                                                              :items="coveringQualities"
                                                              item-text="label"
                                                              persistent-hint
                                                              return-object
                                                              single-line>
                                                    </v-select>
                                                    <v-select label="Finition Extérieure : " v-model="exterior[index]"
                                                              :items="exteriorQualities"
                                                              item-text="label"
                                                              persistent-hint
                                                              return-object
                                                              single-line>
                                                    </v-select>
                                                    <v-select label="Finition Intérieure : " v-model="interior[index]"
                                                              :items="interiorQualities"
                                                              item-text="label"
                                                              persistent-hint
                                                              return-object
                                                              single-line>
                                                    </v-select>
                                                    <v-select label="Isolation: " v-model="insulation[index]"
                                                              :items="insulationQualities"
                                                              item-text="label"
                                                              persistent-hint
                                                              return-object
                                                              single-line>
                                                    </v-select>
                                                    <v-select label="Huisserie : " v-model="window[index]"
                                                              :items="windowQualities"
                                                              item-text="label"
                                                              persistent-hint
                                                              return-object
                                                              single-line>
                                                    </v-select>

                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12 mb-5>
                                            <v-layout row justify-end>
                                                <v-btn  color="info"
                                                        @click="addNewModule()">Ajouter un module</v-btn>
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
                                                        :headers="headersModules"
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
                                                        <td :colspan="headersModules.length" class="text-xs-right">
                                                            <strong>Prix Total: {{ quotes.sellingPrice }}€ HT | {{quotes.sellingPrice + (quotes.sellingPrice * (20/100))}}€ TTC</strong>
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
                    :headers="headersQuotes"
                    :items="quotesList"
                    :search="search"
            >
                <template class="tableLine" v-slot:items="props">
                    <td>{{ props.item.project.name }}</td>
                    <td>{{ props.item.project.actorClientId.firstName }} {{ props.item.project.actorClientId.lastName }}</td>
                </template>
            </v-data-table>
        </v-card>

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
                    width="400"
            >
                <v-card
                        color="#1B5E20"
                        dark
                >
                    <v-card-text id="card-text">
                        {{ loaderText }}
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
                let nbBoucle = 0;
                item.structureComponents.forEach((structureComponent) => {
                    price += (structureComponent.component.componentPrices[1].value * structureComponent.componentQuantity);
                    console.log('Price = ' + price);
                    nbBoucle += 1;
                });
                console.log('Tour de boucle: ' + nbBoucle);
                this.quotesModules[index].price = price * quantity;
                //if (structureComponent.component.componentPrices[1])
                this.calculateTotalPriceHT();
                return price;
            },
            calculateTotalPriceHT() {
                this.quotes.sellingPrice = 0;
                let currentTotal = 0;
                this.quotesModules.forEach((quotesModule) => {
                    currentTotal += quotesModule.price;
                });
                this.quotes.sellingPrice = currentTotal;
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
            initCustomizeModule(index) {
                this.covering[index] = '';
                this.interior [index] = '';
                this.exterior [index] = '';
                this.window [index] = '';
                this.insulation[index] = '';
                if (array.indexOf(index)>-1) {
                    this.customizedModule.splice(array.indexOf(index), 1);
                }
                console.log('coucou');
                console.log(this.customizedModule);
                console.log('coucou');
            },
            customizeModule(index,module) {
                this.covering[index] = module.moduleRange.componentCovering;
                this.interior [index] = module.moduleRange.componentInteriorFinish;
                this.exterior [index] = module.moduleRange.componentWindowFrame;
                this.window [index] = module.moduleRange.componentCovering;
                this.insulation[index] = module.moduleRange.componentInsulation;
                if(!this.customizedModule.includes(index)){
                    this.customizedModule.push(index);
                }
            },
            load() {
                this.totalPriceHT = 0;
                this.loader = true;
                API.getQuotes()
                    .then(quotes => {
                        console.log(quotes.data['hydra:member']);
                        this.quotesList = Object.values(quotes.data['hydra:member']);
                        this.loader = false;
                        this.loaderText = 'Chargement des modules';
                        this.loader = true;
                        API.getModules()
                            .then(modules => {
                                console.log(modules.data['hydra:member']);
                                this.modules = modules.data['hydra:member'];
                                this.loader = false;
                                this.loaderText = 'Chargement des projets';
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
                            })
                            .catch((error) => {
                                console.log(error);
                                this.loader = false;
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loader = false;
                    });
                API.getQuotesAdministrativesStates()
                    .then((administrativesSates) => {
                        this.administrativeSates = administrativesSates.data['hydra:member'];
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loader = false;
                    });
                API.getCoveringQualities()
                    .then((coveringQualities) => {
                        this.coveringQualities = coveringQualities.data['hydra:member'];
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loader = false;
                    });
                API.getInteriorQualities()
                    .then((intQualities) => {
                        this.interiorQualities = intQualities.data['hydra:member'];
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loader = false;
                    });
                API.getExteriorQualities()
                    .then((extQualities) => {
                        this.exteriorQualities= extQualities.data['hydra:member'];
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loader = false;
                    });
                API.getInsulationQualities()
                    .then((insQualities) => {
                        this.insulationQualities= insQualities.data['hydra:member'];
                        console.log('-------------------');
                        console.log(this.insulationQualities);
                        console.log('-------------------');
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loader = false;
                    });
                API.getWindowQualities()
                    .then((winQualities) => {
                        this.windowQualities= winQualities.data['hydra:member'];
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loader = false;
                    });
            }
        },
        data () {
            return {
                dialog: false,
                loader: false,
                loaderText: 'Chargement des devis',
                modules: [],
                projects: [],
                administrativeSates: [],
                notifications: false,
                sound: true,
                widgets: false,
                valid: true,
                totalPriceHT: 0,
                quotesList: [],
                search: '',

                quotes: {
                    date: '',
                    discount: 0,
                    project: '',
                    commercialId: 1,
                    sellingPrice: 0,
                },

                quotesDate: '',
                administrativeState: '',
                administrativeStateRules: [
                    v => !!v || "L'état administratif est requis"
                ],
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

                projectRules: [
                    v => !!v || 'Le projet est requis'
                ],
                quotesModules: [
                    {
                        data: [],
                        quantity: '',
                        price: 0
                    }
                ],

                headersQuotes: [
                    { text: 'Projet', value: 'project.name' },
                    { text: 'Client', value: 'project.actorClientId.firstName' },
                ],

                headersModules: [
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
                customizedModule:[],
                coveringQualities:[],
                interiorQualities:[],
                exteriorQualities:[],
                insulationQualities:[],
                windowQualities:[],
                covering:{},
                interior:{},
                exterior:{},
                insulation:{},
                window:{}
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

    #card-text {
        font-size: 25px;
    }
</style>