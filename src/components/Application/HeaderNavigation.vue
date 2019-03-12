<template style="
    background: #C8E6C9;">
    <div>
        <v-navigation-drawer
                clipped
                fixed
                v-model="drawer"
                app
        >
            <!--<v-list dense>-->
            <v-list>
                <v-list-tile class="tile" @click="$router.push('Home')">
                    <v-list-tile-action>
                        <v-icon class="black--text">home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Tableau de bord</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile class="tile" @click="$router.push('Client')">
                    <v-list-tile-action>
                        <v-icon class="black--text">supervised_user_circle</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Clients</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile class="tile" @click="$router.push('Project')">
                    <v-list-tile-action>
                        <v-icon class="black--text">work</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Projets</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile class="tile" @click="$router.push('Quotes')">
                        <v-list-tile-action>
                            <v-icon class="black--text">assignment</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Devis</v-list-tile-title>
                        </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar class="green darken-4" app fixed clipped-left>
            <v-toolbar-side-icon class="white--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="madera-title headline text-uppercase" @click="$router.push('Home')">
                <span class="mr-2 white--text">Madera</span>
                <span class="font-weight-light grey--text text--lighten-4">BACK OFFICE</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="madera-title headline text-uppercase" @click="$router.push('Home')">
                <span class="mr-2 white--text">Testeur</span>
            </v-toolbar-title>
            <v-btn :to="{name: 'Login'}" id="disconnect-btn">Déconnexion</v-btn>
        </v-toolbar>
    </div>
</template>

<script>
    import router from 'vue-router'
    export default {
        name: "HeaderNavigation",
        data: () => ({
            drawer: false
        }),
        methods: {
            onQuotesClicks: function () {
                router.push({ name: "Quotes"})
            }
        }
    }
</script>

<style scoped>
    .tile:hover {
        background: #B9F6CA;
    }

    .madera-title:hover {
        cursor: pointer;
    }

    .router-link {
        text-decoration: none;
        color: black;
    }

    #disconnect-btn:hover {
        background: red;
        color: white;
    }
</style>