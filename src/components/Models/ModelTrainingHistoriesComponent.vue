<template>
    <div class="row">
        <div class="col-12 ml-2 mr-2 pl-2 pr-2">

            <div class="row mt-3">
                <div class="col-4 offset-4">

                    <small class="form-text text-muted">Model To Show</small>
                    <b-form-select v-model="modelToShow" :options="getAvailableModels" @change="getGraphs"
                        class="form-control" size="lg">
                        <option value="null" disabled hidden>Select Model to Show</option>
                    </b-form-select>
                </div>
            </div>

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

        getGraphs(modelToShow) {

            if (this.isWaitingForServerResponse) {
                return
            }

            if (this.getUserId == null || this.getSelectedEnvId == null) {
                this.$root.$emit("pushAlert", "Lost your session data... try to login again.")
                this.resetState()
                this.$router.push("/")
                return
            }

            if (modelToShow == null) {
                return
            }

            this.setWaitingForServerResponse(true)

            var url_to_get_training_graphs = process.env.VUE_APP_API_URL + "get_model_training_graphs"

            var payload = {
                "session": this.getSession,
                "model_name": modelToShow.name,
            }

            axios.post(url_to_get_training_graphs, payload).then(response => {

                var responseData = response.data

                switch (responseData.code) {
                    case 1:

                        var data = responseData.data

                        for (var i = 0; i < data.length; i++) {
                            var current_img = data[i]

                            var byteCharacters = atob(current_img);
                            var byteNumbers = new Array(byteCharacters.length);
                            for (var j = 0; j < byteCharacters.length; j++) {
                                byteNumbers[i] = byteCharacters.charCodeAt(i);
                            }
                            var byteArray = new Uint8Array(byteNumbers);

                            console.log(byteArray)
                        }

                        this.$root.$emit("pushAlert", "Graphs loaded!")
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.$root.$emit("pushAlert", "Couldn't load graphs...")
                }

                this.setWaitingForServerResponse(false)
            }).catch(function (error) {
                console.log(error)
            })
        },
    },
}

</script>
