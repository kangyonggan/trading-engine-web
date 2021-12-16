<template>
  <base-modal
    ref="modal"
    title="安全验证"
    url="/v1/user/permission"
    label-position="right"
    :params="params"
    :rules="rules"
    @success="$emit('success', $event)"
  >
    <div style="margin-bottom: 40px;">
      为了您的账户安全，请完成以下验证操作
    </div>
    <el-form-item
      prop="emailCode"
      label="邮箱验证码"
    >
      <el-input
        v-model="params.emailCode"
        :placeholder="'请输入邮箱' + getEmailDisp() + '的验证码'"
      >
        <template #append>
          <span style="cursor: pointer">
            获取验证码
          </span>
        </template>
      </el-input>
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
        emailCode: '',
        remark: ''
      },
      rules: {
        emailCode: [
          {required: true, message: '请输入邮箱验证码'}
        ],
      },
    }
  },
  methods: {
    getEmailDisp() {
      let email = this.$store.getters.getUserInfo.email
      let emailName = email.substring(0, email.indexOf('@'))
      email = (emailName.length >= 2 ? emailName.substring(0, 2) : emailName) + '**@****' + email.substring(email.lastIndexOf('.'))
      return email
    },
    show(remark) {
      this.params.remark = remark
      this.params.emailCode = ''
      this.$refs.modal.show()
    },
  }
}
</script>

