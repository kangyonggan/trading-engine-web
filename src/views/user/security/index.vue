<template>
  <div>
    <div class="page-header">
      <el-icon>
        <lock />
      </el-icon>
      登录密码
    </div>

    <el-form
      ref="form"
      :model="params"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item
        label="邮箱验证码"
        prop="emailCode"
      >
        <el-input
          v-model="params.emailCode"
          :placeholder="'请输入邮箱' + getEmailDisp() + '的验证码'"
          clearable
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
      <el-form-item
        label="新密码"
        prop="password"
      >
        <el-input
          type="password"
          v-model="params.password"
          placeholder="请输入新密码"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="确认密码密码"
        prop="rePassword"
      >
        <el-input
          type="password"
          v-model="params.rePassword"
          placeholder="请再次输入新密码"
          clearable
        />
      </el-form-item>
      <el-form-item style="clear: both;margin-top: 50px;">
        <el-button
          type="primary"
          @click="submit"
        >
          提交
        </el-button>
        <el-button @click="$refs.form.resetFields()">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {Lock} from '@element-plus/icons'
import Md5 from "js-md5"

export default {
  components: {Lock},
  data() {
    return {
      loading: false,
      codeText: '获取验证码',
      second: 60,
      params: {
        emailCode: '',
        password: '',
        rePassword: '',
      },
      rules: {
        password: [
          {required: true, message: '请输入新密码'}
        ],
        rePassword: [
          {required: true, message: '请再次输入新密码'},
          {validator: this.validateRePassword}
        ],
        emailCode: [
          {required: true, message: '请输入邮箱验证码'}
        ],
      }
    }
  },
  methods: {
    submit: function () {
      if (this.loading) {
        return
      }
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        this.loading = true;
        let params = Object.assign({}, this.params)
        params.password = Md5(params.password)
        params.rePassword = undefined
        this.axios.post('/v1/user/setPassword', params).then(() => {
          this.$refs.form.resetFields()
          this.$success('密码修改成功')
        }).catch(res => {
          this.$error(res.msg)
        }).finally(() => {
          this.loading = false
        })
      })
    },
    validateRePassword(rule, value, callback) {
      if (value !== this.params.password) {
        callback(new Error('两次输入的密码不一致'))
        return
      }
      callback()
    },
    sendCode() {
      if (this.second !== 60 || this.loading || this.codeText !== '获取验证码') {
        return
      }
      this.loading = true
      this.codeText = '发送中...'
      this.axios.post('/v1/email/sendCode', {
        type: 'SET_PASSWORD',
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
  }
}
</script>

<style lang="scss" scoped>
@import "../user.scss";

.el-form {
  width: 800px;
  margin: 0 auto;
}
</style>