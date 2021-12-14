<template>
  <div class="footer">
    Gold coin © {{ DateTimeUtil.format(new Date().getTime(), 'yyyy') }}
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
    background: #171a21;
    border-top: 1px solid #293448;
    text-align: center;
  }
</style>
