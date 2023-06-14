<template>
    <div>
        <EnvironmentSpaceBar></EnvironmentSpaceBar>
        <ModelCreationComponent></ModelCreationComponent>
        <ModelDeleteComponent></ModelDeleteComponent>
        <ModelPredictionComponent></ModelPredictionComponent>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
//import axios from 'axios';

import EnvironmentSpaceBar from '@/components/EnvironmentSpaceBar'
import ModelCreationComponent from "@/components/Models/ModelCreationComponent"
import ModelDeleteComponent from "@/components/Models/ModelDeleteComponent"
import ModelPredictionComponent from "@/components/Models/ModelPredictionComponent";

export default {
    name: "ModelsComponent",

    components: {
        EnvironmentSpaceBar,
        ModelCreationComponent,
        ModelDeleteComponent,
        ModelPredictionComponent,
    },

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    computed: {
        ...mapGetters([
            "getSession",
            "getAvailableModels"
        ]),
    },

    methods: {
        ...mapMutations([
            "setAvailableModels"
        ]),
    },
}

</script>
