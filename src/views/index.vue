<template>
  <div>
    <api-menu class="side-bar" />

    <div class="main-content">
      <base-info />

      <common-market />

      <user-trade />
    </div>
  </div>
</template>

<script>
import ApiMenu from './api/api-menu'
import BaseInfo from "./api/base-info"
import CommonMarket from "./api/common-market"
import UserTrade from "./api/user-trade"

export default {
  components: {UserTrade, CommonMarket, BaseInfo, ApiMenu}
}
</script>

<style scoped lang="scss">
.side-bar {
  width: 220px;
  float: left;
}

.main-content {
  width: calc(100% - 261px);
  float: left;
  min-height: calc(100vh - 142px);
  padding: 10px 20px;
  border-left: 1px solid var(--app-border-color);
}
</style>
