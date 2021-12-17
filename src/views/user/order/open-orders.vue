<template>
  <div>
    当前委托
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    /**
     * 当前委托
     */
    loadOpenOrders() {
      this.loading = true
      this.axios.get('/v1/user/openOrders').then(data => {
        this.openOrders = data
      }).catch(res => {
        this.$error(res.msg)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>