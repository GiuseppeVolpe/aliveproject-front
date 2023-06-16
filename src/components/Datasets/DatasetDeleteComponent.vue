<template>
    <div class="row">

        <div class="col-12 ml-2 mr-2 pl-2 pr-2">

            <div class="row mt-3">
                <div class="col-4 offset-4">
                    <small class="form-text text-muted">Dataset To Delete</small>
                    <b-form-select v-model="datasetToDelete" :options="getAvailableDatasets" class="form-control" size="lg">
                        <option value="null" disabled hidden>Select dataset to delete</option>
                    </b-form-select>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-4 offset-4">
                    <b-button class="col-12 mb-3" @click="deleteDataset(datasetToDelete)"
                        :disabled="!deleteButtonIsEnabled">Delete dataset</b-button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

export default {
    name: "DatasetDeleteComponent",

    data() {
        return {
            datasetToDelete: null,
        };
    },

    mounted() {

    },

    computed: {
        ...mapGetters([
            "getUserId",
            "getSelectedEnvId",
            "getSession",
            "getAvailableDatasets",
            "isWaitingForServerResponse",
        ]),

        deleteButtonIsEnabled() {
            return this.datasetToDelete != null && !this.isWaitingForServerResponse
        },
    },

    methods: {
        ...mapMutations([
            "resetState",
            "setWaitingForServerResponse",
        ]),
        ...mapActions([
            "pushAlertAction",
            "updateAvailableDatasetsAction",
        ]),

        deleteDataset(datasetToDelete) {

            if (this.isWaitingForServerResponse) {
                return
            }

            if (this.getUserId == null || this.getSelectedEnvId == null) {
                this.pushAlertAction("Lost your session data... try to login again.")
                this.resetState()
                this.$router.push("/")
                return
            }

            if (datasetToDelete == null) {
                return
            }

            this.setWaitingForServerResponse(true)

            var url_to_delete_dataset = process.env.VUE_APP_API_URL + "delete_dataset"

            var payload = {
                "session": this.getSession,
                "dataset_name": datasetToDelete.name,
            }

            axios.post(url_to_delete_dataset, payload).then(response => {

                var responseData = response.data

                switch (responseData.code) {
                    case 1:
                        this.pushAlertAction("Dataset deleted!")
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.pushAlertAction("Couldn't delete the dataset...")
                }

                this.updateAvailableDatasetsAction()
                this.setWaitingForServerResponse(false)
            }).catch(function (error) {
                console.log(error)
                this.$store.commit("setWaitingForServerResponse", false)
            })
        },
    },
}

</script>
