<template>
    <div>
        <EnvironmentSpaceBar></EnvironmentSpaceBar>
        <AddToTrainingComponent></AddToTrainingComponent>
        <RemoveFromTrainingComponent></RemoveFromTrainingComponent>
        <StartTrainComponent></StartTrainComponent>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
//import axios from 'axios';

import EnvironmentSpaceBar from '@/components/EnvironmentSpaceBar'
import AddToTrainingComponent from "@/components/Training/AddToTrainingComponent";
import RemoveFromTrainingComponent from "@/components/Training/RemoveFromTrainingComponent";
import StartTrainComponent from "@/components/Training/StartTrainComponent";

export default {
    name: "TrainingComponent",

    components: {
        EnvironmentSpaceBar,
        AddToTrainingComponent,
        RemoveFromTrainingComponent,
        StartTrainComponent,
    },

    data() {
        return {
            
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
