<template>
    <div>
        <EnvironmentSpaceBar></EnvironmentSpaceBar>
        <RemoveFromTrainingComponent></RemoveFromTrainingComponent>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
//import axios from 'axios';

import EnvironmentSpaceBar from '@/components/EnvironmentSpaceBar'
//import AddToTrainingComponent from "@/components/Training/AddToTrainingComponent";
import RemoveFromTrainingComponent from "@/components/Training/RemoveFromTrainingComponent";

export default {
    name: "TrainingComponent",

    components: {
        EnvironmentSpaceBar,
        //AddToTrainingComponent,
        RemoveFromTrainingComponent,
    },

    data() {
        return {
            
        };
    },

    mounted() {
        //this.updateAvailableModelsAction()
        //this.updateAvailableDatasetsAction()
        this.updateTrainingSessionsAction()
    },

    computed: {
        ...mapGetters([]),
    },

    methods: {
        ...mapMutations([]),
        ...mapActions([
            "updateAvailableModelsAction",
            "updateAvailableDatasetsAction",
            "updateTrainingSessionsAction",
        ]),
    },
}

</script>
