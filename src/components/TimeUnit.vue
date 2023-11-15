<script>
import { inject, ref } from 'vue'
export default {
  setup() {
    const moment = inject('moment')
    const timeUnit = ref(null)
    return { moment, timeUnit }
  },
  props: {
    TimeInfo: Object,
    arrayTimeUnits: Array,
    daysToReach: Number,
    timeUnitChanged: Boolean,
    timeUnitChangedhandler: Function,
    updateTimeData: Function,
    updateUserReservableData: Function,
    timeUnitsDatahandler: Function
  },
  computed: {
    PrintTime() {
      let hours = new Date(this.TimeInfo.timeStanp).getHours()
      let minutes = new Date(this.TimeInfo.timeStanp).getMinutes()
      return `${hours}:${minutes || '00'}`
    },
    HoverDate() {
      let dateArray = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'full', timeStyle: 'long' })
        .format(new Date(this.TimeInfo.timeStanp))
        .split(' ')
      if (!this.updateUserReservableData) {
        let periodOfTime = `${new Date(this.TimeInfo.timeStanp + 1800000).getHours() || '24'}:${
          new Date(this.TimeInfo.timeStanp + 1800000).getMinutes() || '00'
        } - ${new Date(this.TimeInfo.timeStanp).getHours() || '24'}:${
          new Date(this.TimeInfo.timeStanp).getMinutes() || '00'
        }`
        return `${dateArray[3]} ${dateArray[2].replace(',', '')} ${dateArray[1]} , ${periodOfTime}`
      } else {
        let periodOfTowTime = `${new Date(this.TimeInfo.timeStanp + 3600000).getHours() || '24'}:${
          new Date(this.TimeInfo.timeStanp + 3600000).getMinutes() || '00'
        } - ${new Date(this.TimeInfo.timeStanp).getHours() || '24'}:${
          new Date(this.TimeInfo.timeStanp).getMinutes() || '00'
        }`
        return `${dateArray[3]} ${dateArray[2].replace(',', '')} ${
          dateArray[1]
        } , ${periodOfTowTime}`
      }
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
    },
    clickStatus(newVal) {
      this.updateTimeData({
        periodOfTimeStatus: newVal,
        timeStanp: this.TimeInfo.timeStanp,
        daysToReach: this.daysToReach
      })
    }
  },
  methods: {
    classTimeHandler() {
      if (!this.updateUserReservableData) {
        switch (this.clickStatus) {
          case 'clicked':
            return 'time-unit after-none time-unit-clicked'
          case 'reserved':
            return 'time-unit after-none time-unit-reserved'
          case 'unClicked':
            return 'time-unit after-none time-unit-unClicked'
        }
      } else {
        switch (this.TimeInfo.periodOfTimeStatus) {
          case 'clicked':
            return `time-unit time-unit-unClicked ${
              !this.TimeInfo.nextCubeClickable && 'after-none'
            }`
          case 'reserved':
            return `time-unit time-unit-disable ${!this.TimeInfo.nextCubeClickable && 'after-none'}`
          case 'unClicked':
            return `time-unit time-unit-none ${!this.TimeInfo.nextCubeClickable && 'after-none'}`
        }
      }
    },
    clickTimeHandler() {
      if (!this.updateUserReservableData) {
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
      } else {
        this.updateUserReservableData(this.TimeInfo)
      }
    }
  }
}
</script>

<template>
  <div
    ref="timeUnit"
    :class="this.TimeInfo?.selected ? 'time-unit time-unit-selected' : classTimeHandler()"
    @click="clickTimeHandler()"
  >
    <div class="time-unit-selectable"></div>
    <div class="hover-content IranSansMediumNum">{{ HoverDate }}</div>
    <span class="IranSansLightNum">{{ PrintTime }}</span>
  </div>
</template>
