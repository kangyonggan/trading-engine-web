<template>
  <div>
    index
    <el-button type="primary">
      Primary
    </el-button>
    <el-checkbox
      v-model="checked1"
      label="Option 2"
    />
  </div>
</template>

<script>
export default  {
  data() {
    return {
      checked1: true
    }
  }
}
</script>