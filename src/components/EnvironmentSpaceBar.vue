<template>
    <div>
        <RouterLink to="/models">Models</RouterLink> |
        <RouterLink to="">Datasets</RouterLink> |
        <RouterLink to="">Training</RouterLink>

        <button @click="closeSelectedEnvironmentAction()">Close Environment</button>
        <button @click="deleteSelectedEnvironmentAction()">Delete Environment</button>
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
            "closeSelectedEnvironmentAction",
            "deleteSelectedEnvironmentAction",
        ]),
    },
}
</script>