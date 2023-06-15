<template>
    <div>
        <EnvironmentSpaceBar></EnvironmentSpaceBar>
        <DatasetCreationComponent></DatasetCreationComponent>
        <DatasetDeleteComponent></DatasetDeleteComponent>
        <CsvToDatasetComponent></CsvToDatasetComponent>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
//import axios from 'axios';

import EnvironmentSpaceBar from '@/components/EnvironmentSpaceBar'
import DatasetCreationComponent from "@/components/Datasets/DatasetCreationComponent"
import DatasetDeleteComponent from "@/components/Datasets/DatasetDeleteComponent"
import CsvToDatasetComponent from "@/components/Datasets/CsvToDatasetComponent"

export default {
    name: "DatasetsComponent",

    components: {
        EnvironmentSpaceBar,
        DatasetCreationComponent,
        DatasetDeleteComponent,
        CsvToDatasetComponent,
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
