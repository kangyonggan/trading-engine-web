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
          <span
            style="cursor: pointer"
            @click="sendCode"
          >
            {{ codeText }}
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
      loading: false,
      codeText: '获取验证码',
      second: 60,
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
    sendCode() {
      if (this.second !== 60 || this.loading || this.codeText !== '获取验证码') {
        return
      }
      this.loading = true
      this.codeText = '发送中...'
      this.axios.post('/v1/email/sendCode', {
        type: 'API',
        email: this.$store.getters.getUserInfo.email
      }).then(() => {
        this.startTimer(60)
        this.$success('发送成功')
      }).catch(res => {
        this.codeText = '获取验证码'
        this.$error(res.msg)
      }).finally(() => {
        this.loading = false
      })
    },
    startTimer(sec) {
      if (sec) {
        this.second = sec
      }
      const timer = setInterval(() => {
        this.codeText = this.second + 's'
        this.second--
        if (this.second === 0) {
          this.second = 60
          this.codeText = '获取验证码'
          clearInterval(timer)
        }
      }, 1000)
    },
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

