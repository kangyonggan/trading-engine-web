<template>
  <el-menu
    ref="menu"
    class="side-bar"
    router
    :default-active="defaultActive"
  >
    <el-sub-menu index="1">
      <template #title>
        <span>基本信息</span>
      </template>
      <el-menu-item index="#1-1">
        Rest基本信息
      </el-menu-item>
      <el-menu-item index="#1-2">
        接口鉴权类型
      </el-menu-item>
      <el-menu-item index="#1-3">
        数据签名
      </el-menu-item>
      <el-menu-item index="#1-4">
        枚举和错误码
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <span>公共行情接口</span>
      </template>
      <el-menu-item index="#2-1">
        测试服务器连通性
      </el-menu-item>
      <el-menu-item index="#2-2">
        获取服务器时间
      </el-menu-item>
      <el-menu-item index="#2-3">
        获取交易对
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <span>账户和交易接口</span>
      </template>
      <el-menu-item index="#3-1">
        账户信息
      </el-menu-item>
      <el-menu-item index="#3-2">
        下单
      </el-menu-item>
      <el-menu-item index="#3-3">
        订单查询
      </el-menu-item>
      <el-menu-item index="#3-4">
        撤销订单
      </el-menu-item>
      <el-menu-item index="#3-5">
        查询当前挂单
      </el-menu-item>
      <el-menu-item index="#3-6">
        查询所有订单
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <span>Websocket推送</span>
      </template>
      <el-menu-item index="#4-1">
        实时订阅/取消数据流
      </el-menu-item>
      <el-menu-item index="#4-2">
        最新价格
      </el-menu-item>
      <el-menu-item index="#4-3">
        K线
      </el-menu-item>
      <el-menu-item index="#4-4">
        有限档深度信息
      </el-menu-item>
      <el-menu-item index="#4-5">
        增量深度信息
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: '',
    }
  },
  methods: {
    jump(id) {
      let section = document.getElementById(id)
      if (section) {
        section.scrollIntoView()
      }
    }
  },
  mounted() {
    this.defaultActive = this.$route.hash
    let defaultOpen = this.$route.hash.split('-')[0].replace('#', '')
    if (!defaultOpen) {
      defaultOpen = '1'
    }
    this.$refs.menu.open([defaultOpen])
    this.jump(this.$route.hash.replace('#', ''))
  },
  watch: {
    '$route'(newRoute) {
      this.jump(newRoute.hash.replace('#', ''))
    }
  }
}
</script>