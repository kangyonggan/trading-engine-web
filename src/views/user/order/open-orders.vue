<template>
  <div>
    当前委托
  </div>
</template>

<script>
export default {
  data() {
    return {
      openOrders: [],
      total: 0
    }
  },
  methods: {
    /**
     * 当前委托
     */
    loadOpenOrders() {
      this.loading = true
      this.axios.get('/v1/user/openOrders').then(data => {
        this.openOrders = data.list
        this.total = data.total
      }).catch(res => {
        this.$error(res.msg)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
