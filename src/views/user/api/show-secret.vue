<template>
  <base-modal
    ref="modal"
    title="安全验证"
    :url="'/v1/user/api/' + id"
    method="GET"
    :params="params"
    :rules="rules"
    @success="$emit('success', $event)"
  >
    <div style="margin-bottom: 40px;">
      为了您的账户安全，请完成以下验证操作
    </div>
    <el-form-item
      prop="googleCode"
      label="谷歌验证码"
    >
      <el-input
        clearable
        v-model="params.googleCode"
        placeholder="请输入谷歌验证码"
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
      id: '',
      params: {
        googleCode: '',
      },
      rules: {
        googleCode: [
          {required: true, message: '请输入谷歌验证码'}
        ],
      },
    }
  },
  methods: {
    show(id) {
      this.id = id
      this.params.googleCode = ''
      this.$refs.modal.show()
    },
  }
}
</script>

