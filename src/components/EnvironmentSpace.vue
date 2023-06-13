<template>
    <div>
        <EnvironmentSpaceBar></EnvironmentSpaceBar>
    </div>
</template>

<script>
import EnvironmentSpaceBar from '@/components/EnvironmentSpaceBar'
import { mapGetters, mapMutations } from "vuex";

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
