<template>
  <base-modal
    ref="modal"
    title="安全验证"
    url="/v1/user/api"
    :params="params"
    :rules="rules"
    @success="$emit('success', $event)"
  >
    <div style="margin-bottom: 40px;">
      为了您的账户安全，请完成以下验证操作
    </div>
    <el-form-item
      prop="googleCode"
      label="邮箱验证码"
    >
      <el-input
        v-model="params.googleCode"
        placeholder="请输入谷歌验证码"
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
      loading: false,
      params: {
        googleCode: '',
        remark: ''
      },
      rules: {
        googleCode: [
          {required: true, message: '请输入谷歌验证码'}
        ],
      },
    }
  },
  methods: {
    show(remark) {
      this.params.remark = remark
      this.params.googleCode = ''
      this.$refs.modal.show()
    },
  }
}
</script>

