<template>
    <div>

        <b-form-select v-model="selectedDataset" :options="getAvailableDatasets" class="form-control" size="lg">
            <option value="null" disabled hidden>Select a dataset for the import</option>
        </b-form-select>

        <div v-if="selectedDataset != null && selectedDataset.type == 'SLCM'">
            <input type="text" name="textColumnName" v-model="textColumnName">
        </div>
        <div v-if="selectedDataset != null && selectedDataset.type == 'TLCM'">
            <input type="text" name="sentenceIdxColumnName" v-model="sentenceIdxColumnName">
            <input type="text" name="wordColumnName" v-model="wordColumnName">
        </div>

        <b-form-select v-model="selectedExampleCategory" :options="getAvailableExampleCategories" class="form-control"
            size="lg">
            <option value="null" disabled hidden>Select an example category</option>
        </b-form-select>

        <input type="file" @change="uploadFile()">

        <b-button class="col-12 mb-3" @click="importCsvToDataset()" :disabled="!importButtonIsEnabled">
            Import
        </b-button>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

export default {
    name: "CsvToDatasetComponent",

    components: {

    },

    data() {
        return {
            selectedDataset: null,
            datasetCsv: null,
            textColumnName: "text",
            sentenceIdxColumnName: "sentence_idx",
            wordColumnName: "word",
            selectedExampleCategory: null,
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
        }
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

        uploadFile() {
            this.datasetCsv = event.target.files
        },

        importCsvToDataset() {

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

            var url_to_import_to_dataset = process.env.VUE_APP_API_URL + "import_csv_to_dataset"

            var formData = new FormData();
            formData.append("user_id", this.getSession.user_id)
            formData.append("env_id", this.getSession.env_id)
            formData.append("dataset_name",  this.selectedDataset.name)
            formData.append("dataset_csv", new Blob(this.datasetCsv), "blob")
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
                        this.pushAlertAction("Examples imported to dataset!")
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.pushAlertAction("Couldn't import the examples to the dataset...")
                }

                this.setWaitingForServerResponse(false)
            })
        }
    },

}

</script>
