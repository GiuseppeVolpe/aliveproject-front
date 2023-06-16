<template>
    <div>
        <div>

            <div v-if="training">
                <rotate-loader :loading="training"></rotate-loader>

                Now training {{ currentSessionModelName }} on {{ currentSessionDatasetName }},
                epoch {{ currentSessionEpoch }} out of {{ currentSessionEpochsLeft }}.
            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

import RotateLoader from 'vue-spinner/src/RotateLoader.vue'

export default {
    name: "StartTrainComponent",

    components: {
        RotateLoader,
    },

    data() {
        return {
            currentSessionIndex: 0,
            currentSessionModelName: null,
            currentSessionDatasetName: null,
            currentSessionEpoch: 0,
            currentSessionEpochsLeft: 0,
            training: false,
            timer: null,
        };
    },

    mounted() {
        this.timer = setInterval(() => {
            this.updateTrainQueueProgressInfos()
        }, 4000)
    },

    computed: {
        ...mapGetters([
            "getUserId",
            "getSelectedEnvId",
            "getSession",
            "getTrainQueue",
            "isWaitingForServerResponse",
        ]),

        startButtonIsEnabled() {
            return this.getTrainQueue != null && this.getTrainQueue.length > 0 && !this.isWaitingForServerResponse
        },
    },

    methods: {
        ...mapMutations([
            "resetState",
            "setWaitingForServerResponse",
        ]),
        ...mapActions([
            "pushAlertAction",
            "updateTrainQueueAction",
            "waitForTrainingToFinishAction",
        ]),

        updateTrainQueueProgressInfos() {

            console.log("Updating")

            if (this.currentSessionIndex >= 0) {
                return
            }

            var url_to_infos = process.env.VUE_APP_API_URL + "get_train_queue_progress_info"

            var payload = {
                "session": this.getSession,
            }

            axios.post(url_to_infos, payload).then(response => {

                var responseData = response.data

                switch (responseData.code) {
                    case 1:
                        var data = responseData.data

                        if (data == null) {
                            this.training = false
                        } else {
                            this.currentSessionIndex = data.current_session_index
                            this.currentSessionModelName = data.current_session_model_name
                            this.currentSessionDatasetName = data.current_session_dataset_name
                            this.currentSessionEpoch = data.current_session_epoch
                            this.currentSessionEpochsLeft = data.current_session_epochs_left
                            this.training = true
                        }
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        break
                }

                this.setWaitingForServerResponse(false)
            })
            .catch(function (error) {
                this.pushAlertAction(error.toJSON())

                this.training = false
                this.setWaitingForServerResponse(false)
            })
        }
    },

    beforeDestroy() {
        clearInterval(this.timer)
    },

}

</script>
