<template>
    <div>
        <EnvironmentSpaceBar></EnvironmentSpaceBar>
        <DatasetCreationComponent></DatasetCreationComponent>
        <DatasetDeleteComponent></DatasetDeleteComponent>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
//import axios from 'axios';

import EnvironmentSpaceBar from '@/components/EnvironmentSpaceBar'
import DatasetCreationComponent from "@/components/Datasets/DatasetCreationComponent"
import DatasetDeleteComponent from "@/components/Datasets/DatasetDeleteComponent"

export default {
    name: "DatasetsComponent",

    components: {
        EnvironmentSpaceBar,
        DatasetCreationComponent,
        DatasetDeleteComponent,
    },

    data() {
        return {
            
        };
    },

    mounted() {
        this.updateAvailableModelTypesAction()
        this.updateAvailableDatasetsAction()
    },

    computed: {
        ...mapGetters([]),
    },

    methods: {
        ...mapMutations([]),
        ...mapActions([
            "updateAvailableModelTypesAction",
            "updateAvailableDatasetsAction",
        ]),
    },
}

</script>
