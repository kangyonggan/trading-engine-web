<template>
  <div style="height: 100%">
    <div class="wrapper">
      <navbar />
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <div style="height: 60px;clear: both" />
    </div>
    <Footer />

    <el-backtop />
  </div>
</template>

<script>
import Navbar from "./navbar"
import Footer from "./footer"

export default {
  components: {Footer, Navbar}
}
</script>

<style scoped lang="scss">
.wrapper {
  min-height: 100%;
  margin-bottom: -61px;
  min-width: 1300px;
}
</style>
