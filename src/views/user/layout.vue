<template>
  <div class="user-layout">
    <side-bar class="side-bar" />
    <div class="main-content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script>
import SideBar from "./side-bar"

export default {
  components: {SideBar}
}
</script>

<style lang="scss" scoped>
.user-layout {
  .side-bar {
    width: 220px;
    float: left;
  }

  .main-content {
    width: calc(100% - 221px);
    float: left;
    min-height: calc(100vh - 122px);
    border-left: 1px solid var(--app-border-color);
  }
}
</style>