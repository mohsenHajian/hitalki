<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<!-- <template>
  <VueSelecto
    v-if="render"
    :container="a"
    :dragContainer="window"
    :selectableTargets="['.target', b]"
    :selectByClick="true"
    :selectFromInside="true"
    :continueSelect="false"
    :toggleContinueSelect="'shift'"
    :keyContainer="window"
    :hitRate="100"
    @select="onSelect"
  />
  <p>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat neque culpa quos aliquid
    perspiciatis. Iste dolores error a doloribus quas inventore eius, quidem exercitationem quod
    autem ea, ratione maiores ipsum. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    Placeat neque culpa quos aliquid perspiciatis. Iste dolores error a doloribus quas inventore
    eius, quidem exercitationem quod autem ea, ratione maiores ipsum. Lorem ipsum dolor, sit amet
    consectetur adipisicing elit. Placeat neque culpa quos aliquid perspiciatis. Iste dolores error
    a doloribus quas inventore eius, quidem exercitationem quod autem ea, ratione maiores ipsum.
  </p>
</template>
<script>
import { VueSelecto } from 'vue3-selecto'

export default {
  components: {
    VueSelecto
  },
  data() {
    return {
      render: false,
      a: null,
      b: null
    }
  },
  mounted() {
    this.a = this.$refs.timeTablePage
    this.b = this.$refs.dayColumn
  },
  methods: {
    onSelect(e) {
      e.added.forEach((el) => {
        el.classList.add('selected')
      })
      e.removed.forEach((el) => {
        el.classList.remove('selected')
      })
    }
  }
}
</script> -->
