<template>
    <div class="row">
        <div class="col-12 ml-2 mr-2 pl-2 pr-2">

            <div class="row mt-3 mb-3">
                <div class="col-6 offset-3">
                    <small class="form-text text-muted">Select Dataset</small>
                    <b-form-select v-model="selectedDataset" @change="loadDataset"
                        :options="$store.getters.getAvailableDatasets" class="form-control">
                        <option value="null" disabled hidden>Select a dataset for the import</option>
                    </b-form-select>
                </div>
            </div>

            <template v-if="selectedDataset != null">

                <div class="row mt-3">

                    <div class="col-4 offset-2">
                        <small class="form-text text-muted">Starting Index</small>
                        <input type="number" min="0" name="startingIndex" class="form-control mb-2" placeholder="Starting Index"
                            @change="loadDataset" v-model="startingIndex" />
                    </div>

                    <div class="col-4">
                        <small class="form-text text-muted">Number of examples</small>
                        <input type="number" min="1" name="numberOfExamples" class="form-control mb-2"
                            placeholder="Number of Examples" @change="loadDataset" max="20"
                            v-model="numberOfExamplesToFetch" />
                    </div>

                </div>

                <template v-if="selectedDatasetExamples.length > 0">
                    <div class="row mt-3">
                        <b-table striped hover :items="selectedDatasetExamples" :fields="fields">
                            <template #cell(modify)="{ item }">
                                <span><b-btn @click="addExampleModifyingForm(item)" class="mainColor">Edit</b-btn></span>
                            </template>
                            <template #cell(remove)="{ item }">
                                <span><b-btn @click="removeExampleFromDataset(item)" class="mainColor">Remove</b-btn></span>
                            </template>
                        </b-table>
                    </div>
                </template>

                <template v-if="!wantsToModifyExample">
                    <div class="row mt-3">
                        <b-button class="col-2 offset-5 mb-3 mainColor" @click="addExampleInsertionForm()"
                            :disabled="selectedDataset == null || wantsToAddExample || wantsToModifyExample">
                            +
                        </b-button>
                    </div>
                </template>

                <template v-if="wantsToModifyExample == true">
                    <div class="container-fluid mt-2 mb-2">
                        <div class="shadow rounded border-primary mt-2 mb-2">

                            <div class="row mt-3">
                                <h3 class="text-center font-weight-bold col-6 offset-3 mt-3" style="color:#000;">
                                    Modify example
                                </h3>
                            </div>

                            <div class="row mt-3">
                                <div class="col-10 offset-1">
                                    <small class="form-text text-muted">Example Text</small>
                                    <textarea type="text" name="modifiedExampleText" class="form-control mb-2"
                                        placeholder="Modified example text" maxlength="500" v-model="modifiedExampleText" />
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-4 offset-4">
                                    <small class="form-text text-muted">Example Category</small>
                                    <b-form-select :options="getAvailableExampleCategories" class="form-control"
                                        v-model="modifiedExampleCategory">
                                        <option value="null" disabled hidden>Change the example category</option>
                                    </b-form-select>
                                </div>
                            </div>

                            <div class="row mt-3">

                                <div class="col-8 offset-2">
                                    <div v-for="modifiedExampleTarget, index in modifiedExampleTargets" :key="index">

                                        <div class="row">

                                            <div class="col-5">
                                                <small class="form-text text-muted">New Target Name</small>
                                                <input type="text" name="modifiedTargetName" class="form-control"
                                                    placeholder="Modified target name"
                                                    v-model="modifiedExampleTarget.targetName" />
                                            </div>

                                            <div class="col-5">
                                                <small class="form-text text-muted">New Target Value</small>
                                                <input type="text" name="newTargetValue" class="form-control"
                                                    placeholder="Modified target value"
                                                    v-model="modifiedExampleTarget.targetValue" />
                                            </div>

                                            <div class="col-1">
                                                <small class="form-text text-muted">remove</small>
                                                <b-button class="form-control mainColor offset-6"
                                                    @click="removeTargetFromModifiedExample(index)"
                                                    :disabled="selectedDataset == null">-</b-button>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <b-button class="col-2 offset-5 mb-3 mainColor" @click="addTargetToModifiedExample()"
                                    :disabled="selectedDataset == null">Add new target</b-button>
                            </div>

                            <div class="row mt-3 mb-2">
                                <b-button class="col-4 offset-2 mb-3 mr-1 mainColor" @click="modifyExampleInDataset()"
                                    :disabled="selectedDataset == null || this.modifiedExampleText == null || this.modifiedExampleTargets.length == 0 || this.modifiedExampleCategory == null">
                                    Modify this example
                                </b-button>

                                <b-button class="col-4 mb-3 ml-1 mainColor" @click="clearExampleModifyingForm()"
                                    :disabled="selectedDataset == null">Discard Changes</b-button>
                            </div>

                        </div>
                    </div>
                </template>

                <template v-if="wantsToAddExample == true">
                    <div class="container-fluid mt-2 mb-2">
                        <div class="shadow rounded border-primary mt-2 mb-2">

                            <div class="row mt-3">
                                <h3 class="text-center font-weight-bold col-6 offset-3 mt-3" style="color:#000;">
                                    Insert new example
                                </h3>
                            </div>

                            <div class="row mt-3">

                                <div class="col-10 offset-1">
                                    <small class="form-text text-muted">Example Text</small>
                                    <textarea type="text" name="newExampleText" class="form-control mb-2"
                                        placeholder="New example text" maxlength="500" v-model="newExampleText" />
                                </div>

                            </div>

                            <div class="row mt-3">

                                <div class="col-4 offset-4">
                                    <small class="form-text text-muted">Example Category</small>
                                    <b-form-select :options="getAvailableExampleCategories" class="form-control"
                                        v-model="newExampleCategory">
                                        <option value="null" disabled hidden>Select an example category</option>
                                    </b-form-select>
                                </div>

                            </div>

                            <div class="row mt-3">

                                <div class="col-8 offset-2">
                                    <div v-for="newExampleTarget, index in newExampleTargets" :key="index">

                                        <div class="row">

                                            <div class="col-5">
                                                <small class="form-text text-muted">New Target Name</small>
                                                <input type="text" name="newTargetName" class="form-control"
                                                    placeholder="New target name" v-model="newExampleTarget.targetName" />
                                            </div>

                                            <div class="col-5">
                                                <small class="form-text text-muted">New Target Value</small>
                                                <input type="text" name="newTargetValue" class="form-control"
                                                    placeholder="New target value" v-model="newExampleTarget.targetValue" />
                                            </div>

                                            <div class="col-1">
                                                <small class="form-text text-muted">remove</small>
                                                <b-button class="form-control mainColor offset-6"
                                                    @click="removeTargetFromNewExample(index)"
                                                    :disabled="selectedDataset == null">-</b-button>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <b-button class="col-2 offset-5 mb-3 mainColor" @click="addTargetToNewExample()"
                                    :disabled="selectedDataset == null">Add new target</b-button>
                            </div>

                            <div class="row mt-3 mb-2">
                                <b-button class="col-4 offset-2 mb-3 mr-1 mainColor" @click="appendExampleToDataset()"
                                    :disabled="selectedDataset == null || this.newExampleText == null || this.newExampleTargets.length == 0 || this.newExampleCategory == null">Add
                                    this example
                                </b-button>

                                <b-button class="col-4 mb-3 ml-1 mainColor" @click="clearExampleInsertionForm()"
                                    :disabled="selectedDataset == null">Discard Changes</b-button>
                            </div>

                        </div>
                    </div>
                </template>

                <div class="row container-fluid mt-2 mb-2">
                    <div class="col-12 shadow rounded border-primary mt-2 mb-2">

                        <div class="row mt-3">
                            <h3 class="text-center font-weight-bold col-6 offset-3" style="color:#000;">
                                Import csv
                            </h3>
                        </div>

                        <div class="row mt-3">

                            <template v-if="selectedDataset != null && selectedDataset.type == 'SLCM'">
                                <div class="col-6 offset-3">
                                    <small class="form-text text-muted">Text Column Name</small>
                                    <input type="text" name="textColumnName" class="form-control" v-model="textColumnName">
                                </div>
                            </template>

                            <template v-if="selectedDataset != null && selectedDataset.type == 'TLCM'">
                                <div class="col-4 offset-2">
                                    <small class="form-text text-muted">Sentence Index Column Name</small>
                                    <input type="text" name="sentenceIdxColumnName" class="form-control"
                                        v-model="sentenceIdxColumnName">
                                </div>

                                <div class="col-4">
                                    <small class="form-text text-muted">Word Column Name</small>
                                    <input type="text" name="wordColumnName" class="form-control" v-model="wordColumnName">
                                </div>
                            </template>

                        </div>

                        <div class="row mt-3">
                            <div class="col-6 offset-3">
                                <small class="form-text text-muted">Example Category</small>
                                <b-form-select v-model="selectedExampleCategory" :options="getAvailableExampleCategories"
                                    class="form-control">
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
                            <b-button class="col-4 offset-4 mb-3 mainColor" @click="importCsvToDataset()"
                                :disabled="!importButtonIsEnabled">Import</b-button>
                        </div>

                        <div class="row mt-2 mb-2">
                            <div class="col-4 offset-4">
                                <PulseLoader :loading="loading" color="#8bd9b6"></PulseLoader>
                            </div>
                        </div>
                    </div>
                </div>

            </template>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
//import store from "@/store";

export default {
    name: "HandlingDatasetComponent",

    components: {
        PulseLoader,
    },

    data() {
        return {
            selectedDataset: null,

            startingIndex: 0,
            numberOfExamplesToFetch: 10,
            fields: [],
            selectedDatasetExamples: [],

            wantsToModifyExample: false,
            modifiedExampleIndex: null,
            modifiedExampleText: null,
            modifiedExampleCategory: null,
            modifiedExampleTargets: [],

            wantsToAddExample: false,
            newExampleText: null,
            newExampleCategory: null,
            newExampleTargets: [],

            datasetCsv: null,
            textColumnName: "text",
            sentenceIdxColumnName: "sentence_idx",
            wordColumnName: "word",
            selectedExampleCategory: null,
            loading: false,
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

        addExampleInsertionForm() {
            if (!this.wantsToAddExample) {
                this.wantsToAddExample = true
                this.newExampleTargets.push({ "targetName": "", "targetValue": "" })
            }
        },

        addTargetToNewExample() {
            this.newExampleTargets.push({ "targetName": "", "targetValue": "" })
        },

        removeTargetFromNewExample(index) {
            this.newExampleTargets.splice(1, index)
        },

        addExampleModifyingForm(item) {

            if (!this.wantsToModifyExample) {
                this.wantsToModifyExample = true

                this.modifiedExampleIndex = item.index
                this.modifiedExampleText = item.text
                this.modifiedExampleCategory = item.example_category

                for (var prop in item) {
                    if (prop != "text" && prop != "example_category" && prop != "index") {
                        if (Object.prototype.hasOwnProperty.call(item, prop)) {
                            this.modifiedExampleTargets.push({ "targetName": prop, "targetValue": item[prop] })
                        }
                    }
                }
            }
        },

        addTargetToModifiedExample() {
            this.modifiedExampleTargets.push({ "targetName": "", "targetValue": "" })
        },

        removeTargetFromModifiedExample(index) {
            this.modifiedExampleTargets.splice(1, index)
        },

        modifyExampleInDataset() {

            if (this.isWaitingForServerResponse) {
                return
            }

            if (this.modifiedExampleIndex == null || this.modifiedExampleText == null || 
                this.modifiedExampleTargets.length == 0 || this.modifiedExampleCategory == null) {
                return
            }

            if (this.getUserId == null || this.getSelectedEnvId == null) {
                this.$root.$emit("pushAlert", "Lost your session data... try to login again.")
                this.resetState()
                this.$router.push("/")
                return
            }

            this.loading = true
            this.setWaitingForServerResponse(true)

            var url_to_modify_example_in_dataset = process.env.VUE_APP_API_URL + "modify_example_in_dataset"

            var payload = {
                "session": this.getSession,
                "dataset_name": this.selectedDataset.name,
                "example_index": this.modifiedExampleIndex,
                "example_text": this.modifiedExampleText,
                "example_targets": this.modifiedExampleTargets,
                "example_category": this.modifiedExampleCategory,
            }

            axios.post(url_to_modify_example_in_dataset, payload).then(response => {

                var responseData = response.data

                switch (responseData.code) {
                    case 1:
                        this.$root.$emit("pushAlert", "Example modified!")
                        this.setWaitingForServerResponse(false)
                        this.loadDataset()
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.$root.$emit("pushAlert", "Couldn't modify the example...")
                }

                this.clearExampleModifyingForm()
                this.loading = false
                this.setWaitingForServerResponse(false)
            }).catch(function (error) {
                console.log(error)
            })
        },

        appendExampleToDataset() {

            if (this.isWaitingForServerResponse) {
                return
            }

            if (this.newExampleText == null || this.newExampleTargets.length == 0 || this.newExampleCategory == null) {
                return
            }

            if (this.getUserId == null || this.getSelectedEnvId == null) {
                this.$root.$emit("pushAlert", "Lost your session data... try to login again.")
                this.resetState()
                this.$router.push("/")
                return
            }

            this.loading = true
            this.setWaitingForServerResponse(true)

            var url_to_append_example_to_dataset = process.env.VUE_APP_API_URL + "append_example_to_dataset"

            var payload = {
                "session": this.getSession,
                "dataset_name": this.selectedDataset.name,
                "example_text": this.newExampleText,
                "example_targets": this.newExampleTargets,
                "example_category": this.newExampleCategory,
            }

            axios.post(url_to_append_example_to_dataset, payload).then(response => {

                var responseData = response.data

                switch (responseData.code) {
                    case 1:
                        this.$root.$emit("pushAlert", "Example added!")
                        this.setWaitingForServerResponse(false)
                        this.loadDataset()
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.$root.$emit("pushAlert", "Couldn't add the example...")
                }

                this.clearExampleInsertionForm()
                this.loading = false
                this.setWaitingForServerResponse(false)
            }).catch(function (error) {
                console.log(error)
            })
        },

        removeExampleFromDataset(example) {

            if (example == null) {
                return
            }

            if (this.isWaitingForServerResponse) {
                return
            }

            if (this.getUserId == null || this.getSelectedEnvId == null) {
                this.$root.$emit("pushAlert", "Lost your session data... try to login again.")
                this.resetState()
                this.$router.push("/")
                return
            }

            this.loading = true
            this.setWaitingForServerResponse(true)

            var url_to_remove_examples_from_dataset = process.env.VUE_APP_API_URL + "remove_example_from_dataset"

            var payload = {
                "session": this.getSession,
                "dataset_name": this.selectedDataset.name,
                "example_index": example.index,
            }

            axios.post(url_to_remove_examples_from_dataset, payload).then(response => {

                var responseData = response.data

                switch (responseData.code) {
                    case 1:
                        this.$root.$emit("pushAlert", "Example removed!")
                        this.setWaitingForServerResponse(false)
                        this.loadDataset()
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.$root.$emit("pushAlert", "Couldn't remove the example...")
                }

                this.loading = false
                this.setWaitingForServerResponse(false)
            }).catch(function (error) {
                console.log(error)
            })
        },

        clearExampleModifyingForm() {
            this.wantsToModifyExample = false

            this.modifiedExampleIndex = null
            this.modifiedExampleText = null
            this.modifiedExampleCategory = null
            this.modifiedExampleTargets = []
        },

        clearExampleInsertionForm() {
            this.wantsToAddExample = false

            this.newExampleText = null
            this.newExampleCategory = null
            this.newExampleTargets = []
        },

        loadDataset() {

            if (this.isWaitingForServerResponse) {
                return
            }

            if (this.getUserId == null || this.getSelectedEnvId == null) {
                this.$root.$emit("pushAlert", "Lost your session data... try to login again.")
                this.resetState()
                this.$router.push("/")
                return
            }

            this.loading = true
            this.setWaitingForServerResponse(true)

            var url_to_get_dataset_examples = process.env.VUE_APP_API_URL + "get_dataset_examples"

            var payload = {
                "session": this.getSession,
                "dataset_name": this.selectedDataset.name,
                "starting_index": this.startingIndex,
                "number_of_examples": this.numberOfExamplesToFetch,
            }

            axios.post(url_to_get_dataset_examples, payload).then(response => {

                var responseData = response.data

                switch (responseData.code) {
                    case 1:
                        this.fields = responseData.data.fields
                        this.fields.push("modify")
                        this.fields.push("remove")
                        this.selectedDatasetExamples = responseData.data.examples
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.fields = []
                        this.selectedDatasetExamples = []
                }

                this.loading = false
                this.setWaitingForServerResponse(false)
            }).catch(function (error) {
                console.log(error)
            })
        },

        importCsvToDataset() {

            if (this.isWaitingForServerResponse) {
                return
            }

            if (this.getUserId == null || this.getSelectedEnvId == null) {
                this.$root.$emit("pushAlert", "Lost your session data... try to login again.")
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
                        this.$root.$emit("pushAlert", "Examples imported to dataset!")
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.$root.$emit("pushAlert", "Couldn't import the examples to the dataset...")
                }

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
