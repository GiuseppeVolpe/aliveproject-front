<template>
    <div>
        <input type="text" name="datasetName" class="form-control mb-2" placeholder="New dataset name" minlength="8"
            maxlength="50" v-model="newDatasetName" />

        <b-form-select v-model="selectedDatasetType" :options="getAvailableModelTypes" class="form-control" size="lg">
            <option value="null" disabled hidden>Select dataset type</option>
        </b-form-select>

        <input type="checkbox" name="public" v-model="publicDataset" />
        <div>Public: {{ publicDataset }}</div>

        <b-button class="col-12 mb-3" @click="createNewDataset(newDatasetName)" :disabled="!createButtonIsEnabled">
            Create new dataset
        </b-button>

        {{ isWaitingForServerResponse }}
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

export default {
    name: "StartTrainComponent",

    data() {
        return {
            newDatasetName: null,
            selectedDatasetType: null,
            publicDataset: false,
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
                this.setWaitingForServerResponse(false)
            })
        },
    },
}
</script>
