<template>
    <div>
        <div class="row">
            <div class="col-8 offset-2 mt-3">
                <small class="form-text text-muted">Training session to remove</small>
                <b-form-select v-model="trainingSessionToRemove" :options="getTrainQueue" class="form-control">
                    <option value="null" disabled hidden>Select training session to remove</option>
                </b-form-select>
            </div>
        </div>

        <div class="row">
            <div class="col-4 offset-4 mt-3">
                <b-button class="col-12 mb-3 mainColor" @click="removeTrainingSession()" :disabled="!removeButtonIsEnabled">Remove
                    session</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

export default {
    name: "RemoveFromTrainingComponent",

    data() {
        return {
            trainingSessionToRemove: null,
        };
    },

    mounted() {

    },

    computed: {
        ...mapGetters([
            "getUserId",
            "getSelectedEnvId",
            "getSession",
            "getTrainQueue",
            "isWaitingForServerResponse",
        ]),

        removeButtonIsEnabled() {
            return this.trainingSessionToRemove != null && !this.isWaitingForServerResponse
        },
    },

    methods: {
        ...mapMutations([
            "resetState",
            "setWaitingForServerResponse",
        ]),
        ...mapActions([
            "updateTrainQueueAction",
        ]),

        removeTrainingSession() {

            if (this.isWaitingForServerResponse) {
                return
            }

            if (this.getUserId == null || this.getSelectedEnvId == null) {
                this.$root.$emit("pushAlert", "Lost your session data... try to login again.")
                this.resetState()
                this.$router.push("/")
                return
            }

            if (this.trainingSessionToRemove == null) {
                return
            }

            this.setWaitingForServerResponse(true)

            var url_to_remove_training_session = process.env.VUE_APP_API_URL + "remove_from_train_queue"

            var payload = {
                "session": this.getSession,
                "queue_index": this.trainingSessionToRemove.id,
            }

            axios.post(url_to_remove_training_session, payload).then(response => {

                var responseData = response.data

                switch (responseData.code) {
                    case 1:
                        this.$root.$emit("pushAlert", "Removed training session from queue!")
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.$root.$emit("pushAlert", "Couldn't remove the training session from queue...")
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
