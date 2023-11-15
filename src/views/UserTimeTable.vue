<script>
import { inject } from 'vue'
import { useCounterStore } from '@/stores/reservableData'
import DayColumn from '../components/DayColumn.vue'

export default {
  setup() {
    const moment = inject('moment')
    const reservableStore = useCounterStore()
    return { moment, reservableStore }
  },
  name: 'userTimeTablePage',
  head() {
    return {
      title: 'زمانبندی زبان آموز'
    }
  },
  components: {
    DayColumn
  },
  computed: {
    weekDate() {
      let weekDateArray = []
      for (let i = 0; i < 7; i++) {
        let exteraTimeStanp = 86400000 * i
        let dayObject = {
          daysToReach: i,
          dayTimeStanp: Date.now() + exteraTimeStanp,
          timeUnits: []
        }
        weekDateArray.push(dayObject)
      }
      return weekDateArray
    }
  },
  data() {
    return {
      pageRenderd: false,
      userReservableData: undefined,
      userReservableDataRender: undefined,
      lastSelectStanp: undefined
    }
  },
  mounted() {
    this.pageRenderd = true
    if (this.reservableStore.reservableData) {
      this.makeUserReservableData()
    }
  },
  methods: {
    makeUserReservableData() {
      let reservableDataCopy = this.reservableStore.reservableData
      let updatedReservableData = reservableDataCopy.map((dayObject) => {
        let updatedTimeUnits = dayObject.timeUnits.map((timeObj, index) => {
          return {
            ...timeObj,
            selected: false,
            nextCubeClickable:
              dayObject.timeUnits[index + 1]?.periodOfTimeStatus === 'clicked' ? true : false
          }
        })
        return { ...dayObject, timeUnits: updatedTimeUnits }
      })
      this.userReservableDataRender = updatedReservableData
      this.userReservableData = updatedReservableData
    },
    updateUserReservableData(selectedUnits) {
      this.resetData()
      this.userReservableData.map((dayObject) => {
        if (dayObject.daysToReach === selectedUnits.daysToReach) {
          dayObject.timeUnits.map((timeObj, index) => {
            if (
              selectedUnits.timeStanp === timeObj.timeStanp &&
              dayObject.timeUnits[index + 1]?.periodOfTimeStatus === 'clicked' &&
              this.lastSelectStanp !== selectedUnits.timeStanp
            ) {
              dayObject.timeUnits[index + 1].selected = true
              dayObject.timeUnits[index].selected = true
            }
          })
        }
      })
      this.lastSelectStanp =
        this.lastSelectStanp === selectedUnits.timeStanp ? undefined : selectedUnits.timeStanp
    },
    resetData() {
      this.userReservableData.map((dayObject) => {
        dayObject.timeUnits.map((timeObj, index) => {
          dayObject.timeUnits[index].selected = false
        })
      })
    }
  }
}
</script>

<template>
  <div class="user-time-table-page">
    <button class="goTo-time-table-page IranSansLight" @click="$router.push('/')">
      جدول زمان بندی مدزس
    </button>
    <DayColumn
      v-for="(Date, index) in userReservableDataRender || weekDate"
      :key="Date"
      :DateInfo="Date"
      :daysToReach="index"
      :Today="index === 0 ? true : false"
      :updateUserReservableData="updateUserReservableData"
    />
  </div>
</template>
