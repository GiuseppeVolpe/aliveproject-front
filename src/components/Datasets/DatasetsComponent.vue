<template>
    <div>
        <FunctionalitySelectorComponent :availableComponents="this.desiredComponents" title="Datasets" dropdownText="Go to">
        </FunctionalitySelectorComponent>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
//import axios from 'axios';

import FunctionalitySelectorComponent from "../FunctionalitySelectorComponent";

export default {
    name: "DatasetsComponent",

    components: {
        FunctionalitySelectorComponent,
    },

    data() {
        return {
            desiredComponents: ["DatasetCreationComponent", "DatasetDeleteComponent", "HandlingDatasetComponent"],
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
