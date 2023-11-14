<script>
import { inject } from 'vue'
import TimeUnit from './TimeUnit.vue'
export default {
  setup() {
    const moment = inject('moment')
    return { moment }
  },
  props: {
    DateInfo: Number,
    Today: Boolean
  },
  computed: {
    dayTime() {
      let arrayOfCurrentTime = new Intl.DateTimeFormat('fa-IR', {
        dateStyle: 'full',
        timeStyle: 'long'
      })
        .format(new Date(this.DateInfo))
        .split('ساعت')[0]
        .split(' ')
      return arrayOfCurrentTime
    },
    timeUnitArray() {
      let timeOfDayArray = []
      let DayColumnDate = new Date(this.DateInfo).toLocaleDateString().split('/')
      let startDateTimeStanp = new Date(
        `${DayColumnDate[2]}-${DayColumnDate[0]}-${DayColumnDate[1]} 06:00:00 GMT+03:30`
      ).getTime()
      for (let i = 0; i < 36; i++) {
        let exteraTimeStanp = 1800000 * i
        timeOfDayArray.push(startDateTimeStanp + exteraTimeStanp)
      }
      return timeOfDayArray
    }
  },
  components: { TimeUnit }
}
</script>

<template>
  <div class="day-column" :class="Today && 'today-day-column'">
    <div class="day-column-header">
      <!-- <span>{{ moment().format('jYYYY/jM/jD') }}</span> -->
      <span>{{ dayTime[3] }}</span>
      <span>{{ dayTime[2].replace(',', ' ') + ' ' + dayTime[1] }}</span>
    </div>

    <TimeUnit v-for="time in timeUnitArray" :key="time" :timeStanp="time" />
  </div>
</template>
