<template>
    <div>
        <div class="row">
            <div class="col-8 offset-2 mt-3">
                <b-navbar toggleable="lg" type="dark" variant="info">
                    <b-navbar-brand>
                        <b-collapse id="nav-collapse" is-nav>
                            <b-navbar-nav>
                                <b-dropdown dropright text="Go to" class="m-md-2">

                                    <div v-for="(availableComponent, index) in availableComponents" :key="index">
                                        <b-dropdown-item @click="setComponent(index)"> {{ availableComponent }}
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
                                <h3 class="text-light text-center font-weight-bold col-12">Models {{ selectedComponent }}
                                </h3>
                            </div>
                        </div>
                    </b-collapse>
                </b-navbar>

                <div v-for="(availableComponent, index) in availableComponents" :key="index">
                    <component :is="availableComponent" v-if="selectedComponent == index"></component>
                </div>

            </div>
        </div>
        <EnvironmentSpaceBar></EnvironmentSpaceBar>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import ModelCreationComponent from "@/components/Models/ModelCreationComponent"
import ModelDeleteComponent from "@/components/Models/ModelDeleteComponent"
import ModelPredictionComponent from "@/components/Models/ModelPredictionComponent";

export default {
    name: "FunctionalitySelectorComponent",

    components: {
        ModelCreationComponent,
        ModelDeleteComponent,
        ModelPredictionComponent,
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
