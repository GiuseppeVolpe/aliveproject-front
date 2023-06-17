<template>
    <div>
        <FunctionalitySelectorComponent :availableComponents="this.desiredComponents" title="Training" dropdownText="Go to">
        </FunctionalitySelectorComponent>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
//import axios from 'axios';

import FunctionalitySelectorComponent from "@/components/FunctionalitySelectorComponent";

export default {
    name: "TrainingComponent",

    components: {
        FunctionalitySelectorComponent,
    },

    data() {
        return {
            desiredComponents: ["AddToTrainingComponent", "RemoveFromTrainingComponent", "StartTrainComponent"],
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
