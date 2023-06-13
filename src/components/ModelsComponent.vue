<template>
    <div>
        <EnvironmentSpaceNavigator></EnvironmentSpaceNavigator>
        <h3>MODELS!!</h3>
    </div>
</template>

<script>
import EnvironmentSpaceNavigator from '@/components/EnvironmentSpaceNavigator'
import { mapGetters, mapMutations } from "vuex";
import axios from 'axios';

export default {
    name: "EnvironmentSpace",
    data() {
        return {};
    },
    mounted() {
        var url_to_available_envs = process.env.VUE_APP_API_URL + "get_env_models"

        var envs_payload = {
            "session": this.getSession
        }

        axios.post(url_to_available_envs, envs_payload).then(env_response => {
            var envResponseData = env_response.data

            if (envResponseData.code == 1) {
                this.setAvailableModels(envResponseData.data)
            }
        })
    },
    computed: {
        ...mapGetters([]),
    },
    methods: {
        ...mapMutations([
            "setAvailableModels"
        ]),
    },
    components: { EnvironmentSpaceNavigator }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

div.loginColor {
    background-color: #fff;
}

button.buttonColor {
    background-color: #8bd9b6;
    border-color: #8bd9b6;
}
</style>
  