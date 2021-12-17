<template>
  <div>
    历史委托
  </div>
</template>

<script>
export default {
  data() {
    return {
      historyTrades: [],
      total: 0
    }
  },
  methods: {
    /**
     * 历史成交
     */
    loadHistoryTrades() {
      this.loading = true
      this.axios.get('/v1/user/historyTrades').then(data => {
        this.historyTrades = data.list
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
