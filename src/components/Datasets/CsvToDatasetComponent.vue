<template>
    <div class="row">
        <div class="col-12 ml-2 mr-2 pl-2 pr-2">

            <div class="row mt-3">
                <div class="col-6 offset-3">
                    <small class="form-text text-muted">Select Dataset</small>
                    <b-form-select v-model="selectedDataset" :options="$store.getters.getAvailableDatasets" class="form-control" size="lg">
                        <option value="null" disabled hidden>Select a dataset for the import</option>
                    </b-form-select>
                </div>
            </div>

            <div class="row mt-3">

                <div v-if="selectedDataset != null && selectedDataset.type == 'SLCM'">
                    <div class="col-6 offset-3">
                        <small class="form-text text-muted">Text Column Name</small>
                        <input type="text" name="textColumnName" class="form-control" v-model="textColumnName">
                    </div>
                </div>

                <div v-if="selectedDataset != null && selectedDataset.type == 'TLCM'">
                    <div class="col-4 offset-2">
                        <small class="form-text text-muted">Sentence Index Column Name</small>
                        <input type="text" name="sentenceIdxColumnName" class="form-control"
                            v-model="sentenceIdxColumnName">
                    </div>

                    <div class="col-4">
                        <small class="form-text text-muted">Word Column Name</small>
                        <input type="text" name="wordColumnName" class="form-control" v-model="wordColumnName">
                    </div>
                </div>

            </div>

            <div class="row mt-3">
                <div class="col-6 offset-3">
                    <small class="form-text text-muted">Example Category</small>
                    <b-form-select v-model="selectedExampleCategory" :options="getAvailableExampleCategories"
                        class="form-control" size="lg">
                        <option value="null" disabled hidden>Select an example category</option>
                    </b-form-select>
                </div>
            </div>

            <div class="row mt-3 mb-2">
                <div class="col-12">
                    <small class="form-text text-muted">Upload csv</small>
                    <b-form-file v-model="datasetCsv" size="sm" accept=".csv,"
                        drop-placeholder="Drop file here..."></b-form-file>
                </div>
            </div>

            <div class="row mt-5">
                <b-button class="col-4 offset-4 mb-3" @click="importCsvToDataset()"
                    :disabled="!importButtonIsEnabled">Import</b-button>
            </div>

            <PulseLoader :loading="loading"></PulseLoader>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
//import store from "@/store";

export default {
    name: "CsvToDatasetComponent",

    components: {
        PulseLoader,
    },

    data() {
        return {
            selectedDataset: null,
            datasetCsv: null,
            textColumnName: "text",
            sentenceIdxColumnName: "sentence_idx",
            wordColumnName: "word",
            selectedExampleCategory: null,
            loading: false,
            file1: null
        };
    },

    mounted() {

    },

    computed: {
        ...mapGetters([
            "getAvailableExampleCategories",
            "getUserId",
            "getSelectedEnvId",
            "getSession",
            "getAvailableDatasets",
            "isWaitingForServerResponse",
        ]),

        importButtonIsEnabled() {

            var fieldsAreSet = this.selectedDataset != null && this.selectedExampleCategory != null && this.datasetCsv != null

            return fieldsAreSet && !this.isWaitingForServerResponse
        },

    },

    methods: {
        ...mapMutations([
            "resetState",
            "setWaitingForServerResponse",
        ]),
        ...mapActions([
            "updateAvailableDatasetsAction",
        ]),

        importCsvToDataset() {

            console.log(this.datasetCsv)

            if (this.isWaitingForServerResponse) {
                return
            }

            if (this.getUserId == null || this.getSelectedEnvId == null) {
                this.$store.commit("pushAlert", "Lost your session data... try to login again.")
                this.resetState()
                this.$router.push("/")
                return
            }

            this.loading = true
            this.setWaitingForServerResponse(true)

            var url_to_import_to_dataset = process.env.VUE_APP_API_URL + "import_csv_to_dataset"

            var formData = new FormData();
            formData.append("user_id", this.getSession.user_id)
            formData.append("env_id", this.getSession.env_id)
            formData.append("dataset_name", this.selectedDataset.name)
            formData.append("dataset_csv", this.datasetCsv, "blob")
            formData.append("text_column_name", this.textColumnName)
            formData.append("sentence_idx_column_name", this.sentenceIdxColumnName)
            formData.append("word_column_name", this.wordColumnName)
            formData.append("example_category", this.selectedExampleCategory)

            const customHeader = {
                headers: {
                    "Content-Type": 'multipart/form-data',
                },
            };

            axios.post(url_to_import_to_dataset, formData, customHeader).then(response => {

                var responseData = response.data

                switch (responseData.code) {
                    case 1:
                        this.$store.commit("pushAlert", "Examples imported to dataset!")
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.$store.commit("pushAlert", "Couldn't import the examples to the dataset...")
                }

                this.loading = false
                this.setWaitingForServerResponse(false)
            }).catch(function (error) {
                console.log(error)
                this.$store.commit("setWaitingForServerResponse", false)
            })
        }
    },

}

</script>
