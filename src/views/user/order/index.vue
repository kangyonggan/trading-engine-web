<template>
  <div>
    <div class="page-header">
      <el-icon>
        <calendar />
      </el-icon>
      现货订单
    </div>

    <el-tabs
      v-model="activeTab"
      @tab-click="changeActiveTab"
    >
      <el-tab-pane
        label="当前委托"
        name="0"
      >
        <open-orders ref="open-orders" />
      </el-tab-pane>
      <el-tab-pane
        label="历史委托"
        name="1"
      >
        <history-orders ref="history-orders" />
      </el-tab-pane>
      <el-tab-pane
        label="历史成交"
        name="2"
      >
        历史成交
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {Calendar} from '@element-plus/icons'
import OpenOrders from './open-orders'
import HistoryOrders from './history-orders'

export default {
  components: {Calendar, OpenOrders, HistoryOrders},
  data() {
    return {
      activeTab: localStorage.getItem('activeOrderTab') || '0',
    }
  },
  methods: {
    changeActiveTab(activeTab) {
      localStorage.setItem('activeOrderTab', activeTab)
      if (activeTab === '0') {
        this.$refs['open-orders'].loadOpenOrders()
      } else if (activeTab === '1') {
        this.$refs['history-orders'].loadHistoryOrders()
      } else if (activeTab === '2') {
        this.$refs['history-trades'].loadHistoryTrades()
      }
    }
  },
  activated() {
    this.changeActiveTab(this.activeTab)
  }
}
</script>

<style lang="scss" scoped>
@import "../user.scss";
</style>
