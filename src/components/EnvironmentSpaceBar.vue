<template>
    <div>
        <RouterLink to="/models">Models</RouterLink> |
        <RouterLink to="/datasets">Datasets</RouterLink> |
        <RouterLink to="">Training</RouterLink>

        <button @click="closeSelectedEnvAction()">Close Environment</button>
        <button @click="deleteSelectedEnvAction()">Delete Environment</button>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { mapActions, mapGetters, mapMutations } from "vuex";
//import axios from 'axios';

export default {
    name: "EnvironmentSpaceBar",

    components: { RouterLink },

    data() {
        return {};
    },

    mounted() {

    },

    computed: {
        ...mapGetters([]),
    },

    methods: {
        ...mapMutations([]),
        ...mapActions([
            "closeSelectedEnvAction",
            "deleteSelectedEnvAction",
        ]),
    },
}
</script>