<template>
  <div class="footer">
    Copyright © {{ DateTimeUtil.format(new Date().getTime(), 'yyyy') }} Trading engine . All rights reserved
  </div>
</template>

<script>
    export default {
    }
</script>

<style scoped lang="scss">
  .footer {
    height: 60px;
    line-height: 60px;
    background: var(--app-bg-color);
    border-top: 1px solid var(--app-border-color);
    color: var(--app-text-color-dark);
    text-align: center;
    min-width: 1300px;
  }
</style>
