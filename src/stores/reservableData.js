import { defineStore } from 'pinia'

export const useCounterStore = defineStore('reservableStore', {
  state: () => {
    return { reservableData: undefined }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    reservableDataHandler(value) {
      this.reservableData = value
    }
  }
})
