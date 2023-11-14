<script>
import { inject } from 'vue'
export default {
  setup() {
    const moment = inject('moment')
    return { moment }
  },
  props: {
    timeStanp: Number
  },
  computed: {
    PrintTime() {
      let hours = new Date(this.timeStanp).getHours()
      let minutes = new Date(this.timeStanp).getMinutes()
      return `${hours}:${minutes || '00'}`
    }
  },
  data() {
    return {
      clickStatus: 'unClicked'
    }
  },
  methods: {
    classTimeHandler() {
      switch (this.clickStatus) {
        case 'clicked':
          return 'time-unit-clicked'
        case 'reserved':
          return 'time-unit-reserved'
        default:
          ''
      }
    },
    clickTimeHandler() {
      switch (this.clickStatus) {
        case 'unClicked':
          this.clickStatus = 'clicked'
          break
        case 'clicked':
          this.clickStatus = 'reserved'
          break
        case 'reserved':
          this.clickStatus = 'unClicked'
          break
      }
    }
  }
}
</script>

<template>
  <div class="time-unit" :class="classTimeHandler()" @click="clickTimeHandler()">
    <span>{{ PrintTime }}</span>
  </div>
</template>
