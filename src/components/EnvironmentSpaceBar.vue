<template>
    <div>
        <RouterLink to="/models">Models</RouterLink> |
        <RouterLink to="">Datasets</RouterLink> |
        <RouterLink to="">Training</RouterLink>

        <button @click="closeEnvironment()">Close Environment</button>
        <button @click="deleteEnvironment()">Delete Environment</button>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { mapActions, mapGetters, mapMutations } from "vuex";
import axios from 'axios';

export default {
    name: "EnvironmentSpaceBar",

    components: { RouterLink },

    data() {
        return {};
    },

    mounted() {

    },

    computed: {
        ...mapGetters([
            "getSession",
            "getSelectedEnvName",
        ]),
    },

    methods: {
        ...mapMutations([
            "setSelectedEnvId",
            "setSelectedEnvName",
        ]),
        ...mapActions([
            "pushAlertAction",
        ]),

        deleteEnvironment() {

            var url_to_delete_env = process.env.VUE_APP_API_URL + "delete_env"

            var payload = {
                "session": this.getSession,
                "env_name": this.getSelectedEnvName,
            }

            axios.post(url_to_delete_env, payload).then(response => {

                var responseData = response.data
                
                switch (responseData.code) {
                    case 1:
                        this.pushAlertAction("Environment deleted succesfully!")
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.pushAlertAction("Couldn't delete the environment...")
                }
                
                this.setSelectedEnvId(null)
                this.setSelectedEnvName(null)
                this.$router.push("/env_selection")
            })
        },

        closeEnvironment() {
            this.setSelectedEnvId(null)
            this.setSelectedEnvName(null)
            this.$router.push("/env_selection")
        }
    },
}
</script>