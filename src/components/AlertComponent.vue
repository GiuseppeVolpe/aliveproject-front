<template>
    <div v-if="alerts.length > 0">
        <b-alert show :style="customStyle">
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
        customStyle: {
          backgroundColor: this.backgroundColor,
          color: this.textColor,
        }
    }
  },

  computed: {
    
  },

  methods: {
  },
  
  props: {
    alerts: [],
    backgroundColor: String,
    textColor: String,
  },

}

</script>
