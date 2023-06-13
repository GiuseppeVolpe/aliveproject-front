<template>
    <div>
        <EnvironmentSpaceBar></EnvironmentSpaceBar>
    </div>
</template>

<script>
import EnvironmentSpaceBar from '@/components/EnvironmentSpaceBar'
import { mapGetters, mapMutations } from "vuex";
//import axios from 'axios';

export default {
    name: "EnvironmentSpace",
    data() {
        return {};
    },
    computed: {
        ...mapGetters([]),
    },
    methods: {
        ...mapMutations([]),
    },
    components: { EnvironmentSpaceBar }
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
}</style>
  