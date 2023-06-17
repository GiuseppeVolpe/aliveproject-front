<template>
    <div class="row">
        <div class="col-12 ml-2 mr-2">

            <div class="row mt-3 mb-3">
                <div class="col-4 offset-4">
                    <small class="form-text text-muted">Model To Show</small>
                    <b-form-select v-model="modelToShow" :options="getAvailableModels" @change="updateGraphs()"
                        class="form-control">
                        <option value="null" disabled hidden>Select Model to Show</option>
                    </b-form-select>
                </div>
            </div>

            <template v-if="modelToShow != null">

                <template v-if="trainingGraphs.length > 0">

                    <b-container fluid class="p-4 mt-2 mb-4">
                        <b-row>
                            <b-col>
                                <b-button class="mainColor" v-if="selectedGraphIndex > 0"
                                    @click="changeSelectedGraph(1)">Previous</b-button>
                            </b-col>

                            <b-col>
                                <b-img :src="trainingGraphs[selectedGraphIndex]" width="500" height="415"></b-img>
                            </b-col>

                            <b-col>
                                <b-button v-if="selectedGraphIndex < (trainingGraphs.length - 1)"
                                    @click="changeSelectedGraph(-1)">Next</b-button>
                            </b-col>
                        </b-row>
                    </b-container>

                </template>
                <template v-else>

                    <div class="row mt-3 mb-3">
                        <div class="col-6 offset-3">
                            Nothing to show...
                        </div>
                    </div>

                </template>

            </template>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

export default {
    name: "ModelTrainingHistoriesComponent",

    data() {
        return {
            modelToShow: null,
            trainingGraphs: [],
            selectedGraphIndex: null,
        };
    },

    mounted() {

    },

    computed: {
        ...mapGetters([
            "getUserId",
            "getSelectedEnvId",
            "getSession",
            "getAvailableModels",
            "isWaitingForServerResponse",
        ]),

    },

    methods: {
        ...mapMutations([
            "resetState",
            "setWaitingForServerResponse",
        ]),
        ...mapActions([
            "updateAvailableModelsAction",
        ]),

        updateGraphs() {

            if (this.isWaitingForServerResponse) {
                return
            }

            if (this.getUserId == null || this.getSelectedEnvId == null) {
                this.$root.$emit("pushAlert", "Lost your session data... try to login again.")
                this.resetState()
                this.$router.push("/")
                return
            }

            this.trainingGraphs = []

            console.log(this.modelToShow)

            if (this.modelToShow == null) {
                return
            }

            var url_to_get_training_graphs = process.env.VUE_APP_API_URL + "get_model_training_graphs"

            var payload = {
                "session": this.getSession,
                "model_name": this.modelToShow.name,
            }

            axios.post(url_to_get_training_graphs, payload).then(response => {

                var responseData = response.data

                switch (responseData.code) {
                    case 1:

                        var data = responseData.data

                        for (var i = 0; i < data.length; i++) {
                            var currentImage = "data:image/gif;base64," + data[i]
                            this.trainingGraphs.push(currentImage)
                        }

                        console.log("Len" + this.trainingGraphs.length)

                        if (this.trainingGraphs.length > 0) {
                            this.selectedGraphIndex = 0
                        }

                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.$root.$emit("pushAlert", "Couldn't load graphs...")
                }
            }).catch(function (error) {
                console.log(error)
            })
        },

        changeSelectedGraph(direction) {
            if (this.trainingGraphs.length > 0) {
                this.selectedGraphIndex = Math.min(Math.max(this.selectedGraphIndex - direction, 0), this.trainingGraphs.length - 1)
            }
        },
    },
}

</script>
