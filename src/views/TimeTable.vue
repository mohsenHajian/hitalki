<script>
import { inject } from 'vue'
import { VueSelecto } from 'vue3-selecto'
import DayColumn from '../components/DayColumn.vue'

export default {
  setup() {
    const moment = inject('moment')
    // const d = new Date(2022, 2, 21)
    // const de = new Date(Date.now() + 86400000).toLocaleString()
    // console.log(Date.now())
    // console.log(new Date())
    // console.log(d)
    // console.log(de)
    // console.log(
    //   new Intl.DateTimeFormat('fa-IR', { dateStyle: 'full', timeStyle: 'long' }).format(d)
    // )
    return { moment }
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
        weekDateArray.push(Date.now() + exteraTimeStanp)
      }
      return weekDateArray
    }
  },
  data() {
    return {
      pageRenderd: false,
      timeUnitChanged: false
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
    }
  }
}
</script>

<template>
  <div class="time-table-page" ref="timeTablePage">
    <VueSelecto
      v-if="pageRenderd"
      :container="containerSelecto"
      :dragContainer="window"
      :selectableTargets="['.time-unit']"
      :selectByClick="false"
      :selectFromInside="true"
      :continueSelect="false"
      :toggleContinueSelect="'shift'"
      :keyContainer="window"
      :hitRate="100"
      @select="onSelect"
      @dragEnd="timeUnitChanged = true"
    />
    <DayColumn
      v-for="(Date, index) in weekDate"
      :key="Date"
      :DateInfo="Date"
      :Today="index === 0 ? true : false"
      :timeUnitChanged="timeUnitChanged"
      :timeUnitChangedhandler="timeUnitChangedhandler"
    />
  </div>
</template>
