<template>
    <div class="row">
        <div class="col-12 ml-2 mr-2 pl-2 pr-2">

            <div class="row mt-3">

                <div class="col-4">
                    <small class="form-text text-muted">Select Model</small>
                    <b-form-select v-model="selectedModel" :options="getAvailableModels" class="form-control">
                        <option value="null" disabled hidden>Select model</option>
                    </b-form-select>

                </div>

                <div class="col-4">
                    <small class="form-text text-muted">Select Dataset</small>
                    <b-form-select v-model="selectedDataset" :options="getLegalDatasets" class="form-control">
                        <option value="null" disabled hidden>Select dataset</option>
                    </b-form-select>
                </div>

                <div class="col-4">
                    <small class="form-text text-muted">Target</small>
                    <input type="text" name="target" class="form-control mb-2" placeholder="Target" maxlength="100"
                        v-model="target" />
                </div>

            </div>

            <div class="row mt-3">

                <div class="col-6">
                    <small class="form-text text-muted">Number of epochs</small>
                    <input type="number" name="numOfEpochs" min="1" class="form-control mb-2" placeholder="Number of epochs"
                        v-model="numOfEpochs" />
                </div>

                <div class="col-6">
                    <small class="form-text text-muted">Batch size</small>
                    <input type="number" name="batchSize" min="1" class="form-control mb-2" placeholder="Batch size"
                        v-model="batchSize" />
                </div>

            </div>

            <div class="row mt-3">
                <b-button class="col-4 mb-3 offset-4" @click="addToTrainQueue()" :disabled="!addButtonIsEnabled">
                    Add to training queue
                </b-button>
            </div>

        </div>
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
            "updateTrainQueueAction",
        ]),

        addToTrainQueue() {

            if (this.isWaitingForServerResponse) {
                return
            }

            if (this.getUserId == null || this.getSelectedEnvId == null) {
                this.$root.$emit("pushAlert", "Lost your session data... try to login again.")
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
                        this.$root.$emit("pushAlert", "Added to train queue!")
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.$root.$emit("pushAlert", "Couldn't add this model to train queue...")
                }

                this.updateTrainQueueAction()
                this.setWaitingForServerResponse(false)
            })
                .catch(function (error) {
                    this.$root.$emit("pushAlert", error.toJSON())

                    this.setWaitingForServerResponse(false)
                })
        },
    },
}
</script>
