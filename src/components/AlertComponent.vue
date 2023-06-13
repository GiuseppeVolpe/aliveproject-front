<template>
    <div v-if="alerts.length > 0">
        <b-alert show>
            <li v-for="(err, index) in alerts" :key="index">
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
    alerts: [],
  },

}

</script>
