<template>
  <div>
    <div class="login-bg">
      交易引擎
    </div>
    <div style="width: 40%;float: left">
      <el-card v-loading="loading">
        <template #header>
          <a
            :class="'register-type ' + (params.loginType === 'BY_PWD' ? 'active' : '')"
            @click="changeLoginType('BY_PWD')"
          >
            密码登录
          </a>
          |
          <a
            :class="'register-type ' + (params.loginType === 'BY_CODE' ? 'active' : '')"
            @click="changeLoginType('BY_CODE')"
          >
            验证码登录
          </a>
        </template>
        <el-form
          ref="form"
          :model="params"
          :rules="rules"
        >
          <el-form-item
            prop="email"
          >
            <el-input
              placeholder="请输入邮箱"
              v-model="params.email"
              @keyup.enter.native="submit"
              autocomplete="off"
            >
              <template #prepend>
                <el-icon>
                  <Iphone />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item
            class="form-item"
            prop="password"
            v-if="params.loginType === 'BY_PWD'"
          >
            <el-input
              placeholder="请输入密码"
              type="password"
              v-model="params.password"
              @keyup.enter.native="submit"
              autocomplete="off"
            >
              <template #prepend>
                <el-icon>
                  <Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item
            class="form-item"
            prop="verifyCode"
            v-else
          >
            <el-input
              placeholder="请输入验证码"
              v-model="params.verifyCode"
              @keyup.enter.native="submit"
              autocomplete="off"
            >
              <template #prepend>
                <el-icon>
                  <CircleCheck />
                </el-icon>
              </template>
              <template #append>
                <a
                  @click="sendCode"
                  style="color: var(--app-text-color);cursor: pointer"
                >
                  {{ codeText }}
                </a>
              </template>
            </el-input>
          </el-form-item>
          <div>
            <el-tooltip
              class="item"
              effect="dark"
              content="使用验证码登录即为注册"
              placement="left"
            >
              <span style="float: right; color: var(--el-color-primary); cursor: pointer;font-size: 13px;">
                没有账号？
              </span>
            </el-tooltip>
          </div>
          <el-button
            type="primary"
            size="medium"
            @click="submit"
            style="margin-bottom: 10px;margin-top: 15px;"
          >
            登 录
          </el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import Md5 from 'js-md5'
import {Iphone, Lock, CircleCheck} from '@element-plus/icons'

export default {
  components: {Iphone, Lock, CircleCheck},
  data() {
    return {
      loading: false,
      codeText: '获取验证码',
      second: 60,
      params: {
        loginType: localStorage.getItem('loginType') || 'BY_PWD',
        email: 'java@kangyonggan.com',
        password: '',
        verifyCode: ''
      },
      rules: {
        email: [
          {required: true, message: '邮箱为必填项'}
        ],
        password: [
          {required: true, message: '密码为必填项'}
        ],
        verifyCode: [
          {required: true, message: '验证码为必填项'}
        ]
      }
    }
  },
  methods: {
    changeLoginType(loginType) {
      this.params.loginType = loginType
      localStorage.setItem('loginType', loginType)
    },
    sendCode() {
      if (this.second !== 60 || this.loading || this.codeText !== '获取验证码') {
        return
      }
      let that = this;
      this.$refs.form.validateField('email', function (errMsg) {
        if (errMsg) {
          return
        }
        that.loading = true
        that.codeText = '发送中...'
        that.axios.post('/v1/email/sendCode', {
          type: 'LOGIN',
          email: that.params.email
        }).then(() => {
          that.startTimer()
          that.$success('发送成功')
        }).catch(res => {
          that.codeText = '获取验证码'
          that.$error(res.msg)
        }).finally(() => {
          that.loading = false
        })
      });
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
        if (this.params.loginType === 'BY_PWD') {
          params.verifyCode = undefined
          params.password = Md5(params.password)
        } else {
          params.password = undefined
        }
        this.axios.post('/v1/user/login', params).then(data => {
          this.$store.commit('setUserInfo', data)
          let redirectUrl = this.$route.query.redirectUrl || '/'
          let path = decodeURIComponent(redirectUrl)
          let query = {}
          if (path.includes('?')) {
            let index = path.indexOf('?')
            let queryStr = path.substring(index + 1)
            path = path.substring(0, index)
            let queryArr = queryStr.split('&')
            for (let i = 0; i < queryArr.length; i++) {
              let param = queryArr[i].split('=')
              query[param[0]] = param[1]
            }
          }
          this.params = {
            loginType: 'BY_CODE',
            email: '',
            password: '',
            verifyCode: ''
          }
          this.$router.push({
            path: path,
            query: query
          })
        }).catch(res => {
          this.$error(res.msg)
        }).finally(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login-bg {
  width: 60%;
  text-align: center;
  float: left;
  font-size: 135px;
  font-weight: bold;
  font-style: italic;
  color: var(--el-color-primary);
  padding-top: 240px;
}

.el-card {
  width: 360px;
  margin: 180px auto 0 auto;

  .register-type {
    font-size: 18px;
    margin: 0 10px;
    cursor: pointer;
  }

  .active {
    color: #fff;
  }

  .form-item {
    margin-top: 30px;
  }

  .el-button {
    margin-top: 5px;
    width: 100%;
    font-size: 16px;
    border-radius: 20px;

    span {
      color: var(--app-text-color-black);
    }
  }
}
</style>
