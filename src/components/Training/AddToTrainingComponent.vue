<template>
    <div>

        <b-form-select v-model="selectedModel" :options="getAvailableModels" class="form-control" size="lg">
            <option value="null" disabled hidden>Select model</option>
        </b-form-select>

        <b-form-select v-model="selectedDataset" :options="getLegalDatasets" class="form-control" size="lg">
            <option value="null" disabled hidden>Select dataset</option>
        </b-form-select>

        <input type="text" name="target" class="form-control mb-2" placeholder="Target" maxlength="50" v-model="target" />

        <input type="number" name="numOfEpochs" min="1" class="form-control mb-2" placeholder="Number of epochs"
            v-model="numOfEpochs" />

        <input type="number" name="batchSize" min="1" class="form-control mb-2" placeholder="Batch size"
            v-model="batchSize" />

        <b-button class="col-12 mb-3" @click="addToTrainQueue()" :disabled="!addButtonIsEnabled">
            Add to training queue
        </b-button>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

export default {
    name: "AddToTrainingComponent",

    data() {
        return {
            selectedModel: null,
            selectedDataset: null,
            target: null,
            numOfEpochs: 5,
            batchSize: 32,
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
            "getAvailableDatasets",
            "isWaitingForServerResponse"
        ]),

        getLegalDatasets() {

            var legalDatasets = []

            if (this.selectedModel != null) {

                var availableDatasets = this.getAvailableDatasets

                for (var i = 0; i < availableDatasets.length; i++) {

                    var currentDataset = availableDatasets[i]

                    if (this.selectedModel.type == currentDataset.value.type) {
                        legalDatasets.push(currentDataset)
                    }
                }
            }

            return legalDatasets
        },

        addButtonIsEnabled() {
            var targetIsSet = this.target != null && this.target.length > 0

            return this.selectedModel != null && this.selectedDataset != null && targetIsSet &&
                this.numOfEpochs != null && this.batchSize != null &&
                !this.isWaitingForServerResponse
        },
    },

    methods: {
        ...mapMutations([
            "setWaitingForServerResponse",
            "resetState",
        ]),
        ...mapActions([
            "pushAlertAction",
            "updateTrainingQueueAction",
        ]),

        addToTrainQueue() {

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

            var url_to_add_to_train_queue = process.env.VUE_APP_API_URL + "add_to_train_queue"

            var payload = {
                "session": this.getSession,
                "model_name": this.selectedModel.name,
                "dataset_name": this.selectedDataset.name,
                "targets": this.target,
                "num_of_epochs": this.numOfEpochs,
                "batch_size": this.batchSize,
            }

            axios.post(url_to_add_to_train_queue, payload).then(response => {

                var responseData = response.data

                switch (responseData.code) {
                    case 1:
                        this.pushAlertAction("Added to train queue!")
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.pushAlertAction("Couldn't add this model to train queue...")
                }

                this.updateTrainingQueueAction()
                this.setWaitingForServerResponse(false)
            })
            .catch(function (error) {
                this.pushAlertAction(error.toJSON())
                
                this.setWaitingForServerResponse(false)
            })
        },
    },
}
</script>
