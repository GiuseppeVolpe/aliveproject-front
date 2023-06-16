<template>
    <div class="row">
        <div class="col-12 ml-2 mr-2 pl-2 pr-2">

            <div class="row mt-3">
                <div class="col-5 offset-1">
                    <small class="form-text text-muted">New dataset name</small>
                    <input type="text" name="datasetName" class="form-control mb-2" placeholder="New dataset name"
                        maxlength="100" v-model="newDatasetName" />
                </div>
                <div class="col-5">
                    <small class="form-text text-muted">Select dataset type</small>
                    <b-form-select v-model="selectedDatasetType" :options="getAvailableModelTypes" class="form-control"
                        size="lg">
                        <option value="null" disabled hidden>Select dataset type</option>
                    </b-form-select>
                </div>
            </div>

            <div class="row">
                <div class="col-4 offset-4">
                    <small class="form-text text-muted">Public</small>
                    <b-checkbox switch v-model="publicDataset" class="mt-2" />
                </div>
            </div>

            <div class="row mt-3">

                <b-button class="col-4 offset-4 mb-3" @click="createNewDataset(newDatasetName)"
                    :disabled="!createButtonIsEnabled">
                    Create new dataset
                </b-button>

                <PulseLoader :loading="loading"></PulseLoader>

            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    name: "DatasetCreationComponent",

    components: {
        PulseLoader,
    },

    data() {
        return {
            newDatasetName: null,
            selectedDatasetType: null,
            publicDataset: false,
            loading: false,
        };
    },

    mounted() {
        this.publicDataset = false
    },

    computed: {
        ...mapGetters([
            "getAvailableModelTypes",
            "getUserId",
            "getSelectedEnvId",
            "getSession",
            "getAvailableDatasets",
            "isWaitingForServerResponse"
        ]),

        createButtonIsEnabled() {

            if (this.isWaitingForServerResponse) {
                return false
            }

            var newDatasetNameIsSet = this.newDatasetName != null && this.newDatasetName.length > 0

            if (newDatasetNameIsSet) {
                for (var i = 0; i < this.getAvailableDatasets.length; i++) {
                    var currentDataset = this.getAvailableDatasets[i]
                    var currentName = currentDataset.value.name

                    if (this.newDatasetName == currentName) {
                        return false
                    }
                }
            } else {
                return false
            }

            var fieldsAreSet = this.selectedDatasetType != null && this.publicDataset != null

            return fieldsAreSet
        },
    },

    methods: {
        ...mapMutations([
            "setWaitingForServerResponse",
            "resetState",
        ]),
        ...mapActions([
            "pushAlertAction",
            "updateAvailableDatasetsAction",
        ]),

        createNewDataset() {

            if (this.isWaitingForServerResponse) {
                return
            }

            if (this.getUserId == null || this.getSelectedEnvId == null) {
                this.pushAlertAction("Lost your session data... try to login again.")
                this.resetState()
                this.$router.push("/")
                return
            }

            this.setWaitingForServerResponse(true)

            var url_to_create_dataset = process.env.VUE_APP_API_URL + "create_dataset"

            var payload = {
                "session": this.getSession,
                "dataset_name": this.newDatasetName,
                "dataset_type": this.selectedDatasetType,
            }

            this.loading = true

            var createdDatasetName = this.newDatasetName

            axios.post(url_to_create_dataset, payload).then(response => {

                var responseData = response.data

                switch (responseData.code) {
                    case 1:
                        this.pushAlertAction("New dataset created!")
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.pushAlertAction("Couldn't create the new dataset called '" + createdDatasetName + "'...")
                }

                this.updateAvailableDatasetsAction()

                this.loading = false
                this.setWaitingForServerResponse(false)
            }).catch(function (error) {
                console.log(error)
                this.$store.commit("setWaitingForServerResponse", false)
            })
        },
    },
}
</script>
