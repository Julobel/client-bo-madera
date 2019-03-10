<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fluid class="pa-0">
        <HeaderNavigation/>

        <v-layout ml-3 mt-3>
                <h1 class="display-1 headline text-uppercase font-weight-bold">Tableau de bord</h1>
        </v-layout>
        <v-layout class="justify-center column mt-5">
            <v-layout class="align-center justify-center row fill-height ml-5 mr-5">
                <v-flex ml-5 md-2>
                    <v-layout class="menuElt align-center justify-center column fill-height"
                              @click="$router.push('Client')">
                        <v-icon class="black--text icon">supervised_user_circle</v-icon>
                        <h2>Clients</h2>
                    </v-layout>
                </v-flex>
                <v-flex md-2>
                    <v-layout class="menuElt align-center justify-center column fill-height"
                              @click="$router.push('Project')">
                        <v-icon class="black--text icon">work</v-icon>
                        <h2>Projets</h2>
                    </v-layout>
                </v-flex>
                <v-flex mr-5 md-2>
                    <v-layout class="menuElt align-center justify-center column fill-height"
                              @click="$router.push('Quotes')">
                        <v-icon class="black--text icon">assignment</v-icon>
                        <h2>Devis</h2>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-layout>

        <Footer/>
    </v-container>
</template>

<script>
    import HeaderNavigation from "../Application/HeaderNavigation";
    import Footer from "../Application/Footer";
    export default {
        name: 'App',
        components: {
            Footer,
            HeaderNavigation

        },
        data: () => ({
            drawer: false
        }),
    }
</script>

<style scoped>
    .icon {
        font-size: 130px;
    }

    .icon:hover {
        color: #00E676;
    }

    .menuElt:hover, .menuElt:hover * {
        color: #00E676;
        cursor: pointer;
    }
</style>