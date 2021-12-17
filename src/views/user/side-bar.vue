<template>
  <div class="side-bar">
    <ul>
      <li
        :class="{active: isActive('/user')}"
        @click="$router.push('/user')"
      >
        <el-icon><coin /></el-icon>
        账户总览
      </li>
      <li
        :class="{active: isActive('/user/security')}"
        @click="$router.push('/user/security')"
      >
        <el-icon><lock /></el-icon>
        安全设置
      </li>
      <li
        :class="{active: isActive('/user/api')}"
        @click="$router.push('/user/api')"
      >
        <el-icon><set-up /></el-icon>
        API管理
      </li>
    </ul>
  </div>
</template>

<script>
import { Lock, SetUp, Coin } from '@element-plus/icons'

export default {
  components: {Lock, SetUp, Coin},
  data() {
    return {
      currentUrl: ''
    }
  },
  methods: {
    isActive: function (url) {
      if (url === '/user') {
        return this.currentUrl === '/user';
      }
      return this.currentUrl.startsWith(url);
    },
  },
  mounted() {
    this.currentUrl = this.$route.path
  },
  watch: {
    '$route'(newRoute) {
      this.currentUrl = newRoute.path
    }
  }
}
</script>

<style lang="scss" scoped>
.side-bar {
  ul {
    list-style: none;
    padding-left: 0;
    margin-top: 0;

    li {
      height: 48px;
      line-height: 48px;
      padding-left: 25px;
      cursor: pointer;
      border-left: 4px solid var(--app-bg-color);
    }

    li.active {
      background: var(--app-bg-color-light);
      border-left-color: var(--el-color-primary);
      color: var(--app-text-color-light);
    }

    li:hover {
      background: var(--app-bg-color-light);
    }
  }
}
</style>