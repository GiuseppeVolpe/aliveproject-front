<template>
    <div>
        <EnvironmentSpaceBar></EnvironmentSpaceBar>
        <FunctionalitySelectorComponent :availableComponents="this.desiredComponents" >
        </FunctionalitySelectorComponent>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
//import axios from 'axios';

import EnvironmentSpaceBar from '@/components/EnvironmentSpaceBar'
import FunctionalitySelectorComponent from "../FunctionalitySelectorComponent";

export default {
    name: "ModelsComponent",

    components: {
        EnvironmentSpaceBar,
        FunctionalitySelectorComponent,
    },

    data() {
        return {
            desiredComponents: ["ModelCreationComponent", "ModelDeleteComponent", "ModelPredictionComponent"],
        };
    },

    mounted() {

    },

    computed: {
        ...mapGetters([]),
    },

    methods: {
        ...mapMutations([]),
        ...mapActions([]),
    },
}

</script>
