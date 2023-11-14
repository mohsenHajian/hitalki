<script>
import { inject, ref } from 'vue'
export default {
  setup() {
    const moment = inject('moment')
    const timeUnit = ref(null)
    return { moment, timeUnit }
  },
  props: {
    timeStanp: Number,
    timeUnitChanged: Boolean,
    timeUnitChangedhandler: Function
  },
  computed: {
    PrintTime() {
      let hours = new Date(this.timeStanp).getHours()
      let minutes = new Date(this.timeStanp).getMinutes()
      return `${hours}:${minutes || '00'}`
    },
    HoverDate() {
      let dateArray = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'full', timeStyle: 'long' })
        .format(new Date(this.timeStanp))
        .split(' ')
      console.log(dateArray)
      console.log(new Date(this.timeStanp + 1800000).getHours())
      console.log(new Date(this.timeStanp).getMinutes())
      let periodOfTime = `${new Date(this.timeStanp + 1800000).getHours() || '24'}:${
        new Date(this.timeStanp + 1800000).getMinutes() || '00'
      } - ${new Date(this.timeStanp).getHours() || '24'}:${
        new Date(this.timeStanp).getMinutes() || '00'
      }`
      return `${dateArray[3]} ${dateArray[2].replace(',', '')} ${dateArray[1]} , ${periodOfTime}`
    }
  },
  data() {
    return {
      clickStatus: 'unClicked'
    }
  },
  mounted() {
    this.timeClassList = this.timeUnit.classList
  },
  watch: {
    timeUnitChanged(newVal) {
      if (newVal) {
        if (this.timeClassList?.value.includes('time-unit-reserved')) {
          this.clickStatus = 'reserved'
        } else if (this.timeClassList?.value?.includes('time-unit-clicked')) {
          this.clickStatus = 'clicked'
        } else {
          this.clickStatus = 'unClicked'
        }
        this.timeUnitChangedhandler()
      }
    }
  },
  methods: {
    classTimeHandler() {
      switch (this.clickStatus) {
        case 'clicked':
          return 'time-unit time-unit-clicked'
        case 'reserved':
          return 'time-unit time-unit-reserved'
        case 'unClicked':
          return 'time-unit time-unit-unClicked'
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
  <div ref="timeUnit" :class="classTimeHandler()" @click="clickTimeHandler()">
    <div class="hover-content">{{ HoverDate }}</div>
    <span>{{ PrintTime }}</span>
  </div>
</template>
