<template>
  <v-app id="inspire" app style="
    background: #E8F5E9;">
    <v-content>

          <router-view></router-view>

    </v-content>
  </v-app>
</template>

<script>
    export default {
        name: 'App',
        components: {

        },
        data: () => ({
            drawer: false
        }),
    }
</script>

