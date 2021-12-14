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
              class="register-type"
            >
              注册
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
              prop="verifyCode"
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
            >
              注册
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
      params: {
        email: '',
        verifyCode: ''
      },
      codeText: '获取验证码',
      second: 60,
      rules: {
        email: [
          {required: true, message: '邮箱为必填项'}
        ],
        verifyCode: [
          {required: true, message: '验证码为必填项'}
        ]
      }
    }
  },
  methods: {
    sendCode() {
      if (this.second !== 60 || this.loading || this.codeText !== '获取验证码') {
        return
      }
      let that = this;
      this.$refs.form.validateField("email", function (errMsg) {
        if (errMsg) {
          return
        }
        that.loading = true
        that.codeText = '发送中...'
        that.axios.post('/v1/email/sendRegister', {
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
        let data = Object.assign({}, this.params)
        this.axios.post('/v1/user/register', data).then(() => {
          this.params = {
              email: '',
              verifyCode: ''
          }
          this.$router.push({
            path: '/'
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
