<template>
  <v-snackbar
    v-model="$globalStates.notification.init_notifications"
    :bottom="y === 'bottom'"
    :color="$globalStates.notification.type"
    :left="x === 'left'"
    :multi-line="mode === 'multi-line'"
    :right="x === 'right'"
    :timeout="timeout"
    :top="y === 'top'"
    :vertical="mode === 'vertical'"
    class="font-weight-bold"
  >
    {{ $globalStates.notification.text }}
    <v-btn
      dark
      text
      @click="$globalStates.notification.init_notifications = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>
<script>

export default {
  name: 'AdminSnackbar',
  data () {
    return {
      mode: '',
      timeout: 8000,
      x: null,
      y: 'top'
    }
  },
  computed: {
    isShowingSnackbar () {
      return this.$globalStates.notification.init_notifications
    }
  },
  watch: {
    isShowingSnackbar (newVal, oldVal) {
      if (oldVal === true && newVal === false) {
        this.$globalStates.notification.type = ''
        this.$globalStates.notification.text = ''
      }
    }
  }
}
</script>
