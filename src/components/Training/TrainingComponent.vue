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
import FunctionalitySelectorComponent from "@/components/FunctionalitySelectorComponent";

export default {
    name: "TrainingComponent",

    components: {
        EnvironmentSpaceBar,
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
