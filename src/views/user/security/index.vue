<template>
  <div>
    <div class="page-header">
      <el-icon>
        <lock />
      </el-icon>
      账户安全
    </div>

    <google-secret />
    <set-password />
  </div>
</template>

<script>
  import GoogleSecret from './google-secret'
  import SetPassword from './set-password'
  import {Lock} from "@element-plus/icons";

  export default {
    components: {SetPassword, GoogleSecret, Lock},
  }
</script>

<style lang="scss" scoped>
  @import "../user.scss";
</style>
