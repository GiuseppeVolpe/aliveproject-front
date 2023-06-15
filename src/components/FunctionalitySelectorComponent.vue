<template>
    <div>
        <div class="row mt-3">
            <div class="col-8 offset-2">
                <div class="container-fluid">
                    <div class="shadow rounded border border-primary">
                        <div class="row mt-0">
                            <div class="col-12">
                                <b-navbar toggleable="lg" type="dark" variant="info">
                                    <b-navbar-brand>
                                        <b-collapse id="nav-collapse" is-nav>
                                            <b-navbar-nav>
                                                <b-dropdown dropright text="Go to" class="m-md-2">

                                                    <div v-for="(availableComponent, index) in availableComponents"
                                                        :key="index">
                                                        <b-dropdown-item @click="setComponent(index)"> {{ availableComponent
                                                        }}
                                                        </b-dropdown-item>
                                                    </div>

                                                </b-dropdown>
                                            </b-navbar-nav>
                                        </b-collapse>
                                    </b-navbar-brand>

                                    <b-navbar-toggle target="nav-collapse">
                                    </b-navbar-toggle>

                                    <b-collapse id="nav-collapse" is-nav>
                                        <div class="col-md-12 mt-0 mb-0 pt-0 pb-0">
                                            <div class="row mt-0 mb-0 pt-0 pb-0">
                                                <h3 class="text-light text-center font-weight-bold col-12">Models {{
                                                    selectedComponent }}
                                                </h3>
                                            </div>
                                        </div>
                                    </b-collapse>
                                </b-navbar>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-10 offset-1">
                                <div v-for="(availableComponent, index) in availableComponents" :key="index">
                                    <component :is="availableComponent" v-if="selectedComponent == index"></component>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import ModelCreationComponent from "@/components/Models/ModelCreationComponent"
import ModelDeleteComponent from "@/components/Models/ModelDeleteComponent"
import ModelPredictionComponent from "@/components/Models/ModelPredictionComponent";
import DatasetCreationComponent from "@/components/Datasets/DatasetCreationComponent"
import DatasetDeleteComponent from "@/components/Datasets/DatasetDeleteComponent"
import CsvToDatasetComponent from "@/components/Datasets/CsvToDatasetComponent";

export default {
    name: "FunctionalitySelectorComponent",

    components: {
        ModelCreationComponent,
        ModelDeleteComponent,
        ModelPredictionComponent,
        DatasetCreationComponent,
        DatasetDeleteComponent,
        CsvToDatasetComponent,
    },

    data() {
        return {
            selectedComponent: null,
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

        setComponent(index) {
            this.selectedComponent = index
        }
    },

    props: {
        availableComponents: [],
    },

}
</script>
