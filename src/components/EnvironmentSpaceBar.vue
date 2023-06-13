<template>
    <div>
        <RouterLink to="/models">Models</RouterLink> | 
        <RouterLink to="">Datasets</RouterLink> | 
        <RouterLink to="">Training</RouterLink>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
    name: "EnvironmentSpaceBar",
    data() {
        return {};
    },
    components: { RouterLink }
}
