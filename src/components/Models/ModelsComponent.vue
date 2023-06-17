<template>
    <div>
        <FunctionalitySelectorComponent :availableComponents="this.desiredComponents" title="Models" dropdownText="Go to">
        </FunctionalitySelectorComponent>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
//import axios from 'axios';

import FunctionalitySelectorComponent from "../FunctionalitySelectorComponent";

export default {
    name: "ModelsComponent",

    components: {
        FunctionalitySelectorComponent,
    },

    data() {
        return {
            desiredComponents: ["ModelCreationComponent", "ModelDeleteComponent",
                "ModelPredictionComponent", "ModelTrainingHistoriesComponent"],
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
