<template>
    <div v-if="errors.length > 0">
        <b-alert show>
            <li v-for="(err, index) in errors" :key="index">
                {{ err }}
            </li>
        </b-alert>
    </div>
</template>

<script>

export default {
  name: "AlertComponent",

  data() {
    return {
        
    }
  },

  computed: {
    
  },

  methods: {
  },
  
  props: {
    errors: [],
  },

}

</script>
