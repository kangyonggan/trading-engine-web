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
        <open-orders />
      </el-tab-pane>
      <el-tab-pane
        label="历史委托"
        name="1"
      >
        <history-orders />
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
      activeTab: '0',
    }
  },
  methods: {
    changeActiveTab(activeTab) {
      console.log(activeTab)
    }
  },
  activated() {

  }
}
</script>

<style lang="scss" scoped>
@import "../user.scss";
</style>