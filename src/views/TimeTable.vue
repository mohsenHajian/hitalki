<script>
import { inject } from 'vue'
import { VueSelecto } from 'vue3-selecto'
import { useCounterStore } from '@/stores/reservableData'
import DayColumn from '../components/DayColumn.vue'

export default {
  setup() {
    const moment = inject('moment')
    const reservableStore = useCounterStore()
    return { moment, reservableStore }
  },
  name: 'timeTablePage',
  head() {
    return {
      title: 'زمانبندی مدرس'
    }
  },
  components: {
    DayColumn,
    VueSelecto
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
      timeUnitChanged: false,
      timeData: []
    }
  },
  mounted() {
    this.pageRenderd = true
  },
  methods: {
    onSelect(e) {
      e.added.forEach((el) => {
        this.classTimeHandler(el)
      })
    },
    classTimeHandler(el) {
      if (el?.classList?.value.includes('time-unit-unClicked')) {
        el.classList.add('time-unit-clicked')
        el.classList.remove('time-unit-unClicked')
      } else if (el?.classList?.value?.includes('time-unit-clicked')) {
        el.classList.add('time-unit-reserved')
        el.classList.remove('time-unit-clicked')
      } else if (el?.classList?.value.includes('time-unit-reserved')) {
        el.classList.add('time-unit-unClicked')
        el.classList.remove('time-unit-reserved')
      }
    },
    timeUnitChangedhandler() {
      this.timeUnitChanged = false
    },
    timeDataMaker(objectOfDays) {
      this.timeData = [...this.timeData, objectOfDays]
    },
    updateTimeData(objectOfTime) {
      let timeDataCopy = [...this.timeData]
      let updatedTimeData = timeDataCopy.map((dayObject) => {
        if (objectOfTime.daysToReach === dayObject.daysToReach) {
          let updatedTimeUnits = dayObject.timeUnits.map((timeObj) => {
            if (objectOfTime.timeStanp === timeObj.timeStanp) {
              return {
                periodOfTimeStatus: objectOfTime.periodOfTimeStatus,
                timeStanp: objectOfTime.timeStanp,
                daysToReach: objectOfTime.daysToReach
              }
            } else {
              return timeObj
            }
          })
          return {
            daysToReach: dayObject.daysToReach,
            dayTimeStanp: objectOfTime.timeStanp,
            timeUnits: updatedTimeUnits
          }
        } else {
          return dayObject
        }
      })
      this.timeData = updatedTimeData
      this.reservableStore.reservableDataHandler(this.timeData)
    }
  }
}
</script>

<template>
  <div class="time-table-page" ref="containerSelecto">
    <button class="goTo-user-time-table-page IranSansLight" @click="$router.push('/UserTimeTable')">
      جدول زمان بندی کاربر
    </button>
    <VueSelecto
      v-if="pageRenderd"
      :container="$refs.containerSelecto"
      :dragContainer="$refs.containerSelecto"
      :selectableTargets="['.time-unit']"
      :selectByClick="false"
      :selectFromInside="true"
      :continueSelect="false"
      :toggleContinueSelect="'shift'"
      :keyContainer="$refs.containerSelecto"
      :hitRate="1"
      @select="onSelect"
      @dragEnd="timeUnitChanged = true"
    />
    <DayColumn
      v-for="(Date, index) in weekDate"
      :key="Date"
      :DateInfo="Date"
      :daysToReach="index"
      :Today="index === 0 ? true : false"
      :timeUnitChanged="timeUnitChanged"
      :timeUnitChangedhandler="timeUnitChangedhandler"
      :timeDataMaker="timeDataMaker"
      :updateTimeData="updateTimeData"
    />
  </div>
</template>
