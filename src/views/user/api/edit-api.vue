<template>
  <base-modal
    ref="modal"
    title="编辑API"
    url="/v1/user/api"
    method="PUT"
    :params="params"
    :rules="rules"
    @success="$emit('success', $event)"
  >
    <el-form-item
      prop="remark"
      label="标签"
      label-width="70px"
    >
      <el-input
        v-model="params.remark"
        placeholder="请输入标签"
        clearable
      />
    </el-form-item>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/base-modal.vue'

export default {
  emits: ['success'],
  components: {BaseModal},
  data() {
    return {
      params: {
        id: '',
        remark: '',
      },
      rules: {
        remark: [
          {required: true, message: '请输入标签'}
        ]
      },
    }
  },
  methods: {
    show(row) {
      this.params.id = row.id
      this.params.remark = row.remark
      this.$refs.modal.show()
    },
  }
}
</script>

