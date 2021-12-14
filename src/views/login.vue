<template>
  <el-row>
    <el-col
      :xl="17"
      :lg="16"
      class="hidden-md-and-down"
    >
      <div class="login-bg">
        金币研究所
      </div>
    </el-col>
    <el-col
      :xl="5"
      :lg="6"
      :md="24"
      :sm="24"
      :xs="24"
    >
      <div class="register-container">
        <el-card v-loading="loading">
          <template #header>
            <a
              :class="'register-type ' + (params.loginType === 'BY_CODE' ? 'active' : '')"
              @click="changeLoginType('BY_CODE')"
            >
              验证码登录
            </a>
            |
            <a
              :class="'register-type ' + (params.loginType === 'BY_PWD' ? 'active' : '')"
              style="cursor: not-allowed"
            >
              密码登录
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
                  <i class="el-icon-message" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              class="form-item"
              prop="loginPwd"
              v-if="params.loginType === 'BY_PWD'"
            >
              <el-input
                placeholder="请输入密码"
                type="password"
                v-model="params.loginPwd"
                @keyup.enter.native="submit"
                autocomplete="off"
              >
                <template #prepend>
                  <i class="el-icon-lock" />
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
                  <i class="el-icon-circle-check" />
                </template>
                <template #append>
                  <a
                    @click="sendCode"
                    style="color: #a6afc6"
                  >
                    {{ codeText }}
                  </a>
                </template>
              </el-input>
            </el-form-item>
            <el-button
              type="primary"
              size="medium"
              @click="submit"
              style="margin-bottom: 10px;"
            >
              登 录
            </el-button>
          </el-form>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        codeText: '获取验证码',
        second: 60,
        params: {
          loginType: 'BY_CODE',
          email: 'java@kangyonggan.com',
          loginPwd: '',
          verifyCode: '123456'
        },
        rules: {
          email: [
            {required: true, message: '邮箱为必填项'}
          ],
          loginPwd: [
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
                loginPwd: '',
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
  $--color-primary: #D8BE33;

  .login-bg {
    font-size: 150px;
    font-weight: bold;
    font-style: italic;
    color: $--color-primary;
    text-align: center;
    padding-top: 200px;
  }

  .register-container {
    height: 100%;
    background-size: cover;
    margin-top: 150px;

    ::v-deep(.el-card) {
      max-width: 360px;
      margin: 0 auto;

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
          color: #171a21;
        }
      }
    }
  }
</style>
