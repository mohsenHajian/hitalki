<script>
import { inject } from 'vue'
import TimeUnit from './TimeUnit.vue'

export default {
  setup() {
    const moment = inject('moment')
    return { moment }
  },
  props: {
    DateInfo: Object,
    daysToReach: Number,
    Today: Boolean,
    timeUnitChanged: Boolean,
    timeUnitChangedhandler: Function,
    timeDataMaker: Function,
    updateTimeData: Function,
    updateUserReservableData: Function
  },
  computed: {
    dayTime() {
      let arrayOfCurrentTime = new Intl.DateTimeFormat('fa-IR', {
        dateStyle: 'full',
        timeStyle: 'long'
      })
        .format(new Date(this.DateInfo.dayTimeStanp))
        .split('ساعت')[0]
        .split(' ')
      return arrayOfCurrentTime
    },
    timeUnitArray() {
      let timeOfDayArray = []
      let DayColumnDate = new Date(this.DateInfo.dayTimeStanp).toLocaleDateString().split('/')
      let startDateTimeStanp = new Date(
        `${DayColumnDate[2]}-${DayColumnDate[0]}-${DayColumnDate[1]} 06:00:00 GMT+03:30`
      ).getTime()
      for (let i = 0; i < 36; i++) {
        let exteraTimeStanp = 1800000 * i
        timeOfDayArray.push({
          periodOfTimeStatus: 'unClicked',
          timeStanp: startDateTimeStanp + exteraTimeStanp,
          daysToReach: this.daysToReach
        })
      }
      return timeOfDayArray
    }
  },
  components: { TimeUnit },

  mounted() {
    let timePeriodsArray = this.timeUnitArray.map((time) => {
      return {
        periodOfTimeStatus: 'unClicked',
        timeStanp: time.timeStanp,
        daysToReach: this.daysToReach
      }
    })
    this.timeDataMaker &&
      this.timeDataMaker({
        daysToReach: this.daysToReach,
        dayTimeStanp: this.DateInfo.dayTimeStanp,
        timeUnits: timePeriodsArray
      })
  }
}
</script>

<template>
  <div class="day-column" :class="Today && 'today-day-column'" ref="dayColumn">
    <div class="day-column-header">
      <!-- <span>{{ moment().format('jYYYY/jM/jD') }}</span> -->
      <span class="IranSansLight">{{ dayTime[3] }}</span>
      <span class="IranSansLight">{{ dayTime[2].replace(',', ' ') + ' ' + dayTime[1] }}</span>
    </div>
    <TimeUnit
      :ref="`timeUnit`"
      v-for="time in DateInfo.timeUnits.length ? DateInfo.timeUnits : timeUnitArray"
      :key="time"
      :TimeInfo="time"
      :arrayTimeUnits="DateInfo.timeUnits.length ? DateInfo.timeUnits : timeUnitArray"
      :daysToReach="daysToReach"
      :timeUnitChanged="timeUnitChanged"
      :timeUnitChangedhandler="timeUnitChangedhandler"
      :updateTimeData="updateTimeData"
      :updateUserReservableData="updateUserReservableData"
    />
  </div>
</template>
