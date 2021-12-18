<template>
  <div>
    <div class="content-divide">
      谷歌验证器
    </div>
    <div
      v-if="$store.getters.getUserInfo.googleVerify && !resetGoggleVerify"
      style="text-align: center;margin-top: 20px;"
    >
      <span style="margin-right: 20px;">
        您以完成谷歌认证！
      </span>
      <el-button
        type="text"
        @click="getGoogleSecret"
      >
        重新认证
      </el-button>
    </div>

    <el-form
      v-else
      ref="form"
      :model="params"
      :rules="rules"
      label-width="110px"
    >
      <el-timeline>
        <el-timeline-item
          timestamp="1、在谷歌应用中搜索Google应用并下载和安装"
          placement="top"
        />
        <el-timeline-item
          timestamp="2、打开谷歌身份验证器，输入下面的密钥"
          placement="top"
          center
        >
          <el-card style="height: 180px;">
            <div
              style="height: 120px;width: 120px;display: inline-block"
              id="qrcode"
            />
            <div v-show="googleSecretKey">
              <span>
                {{ googleSecretKey }}
              </span>
              <el-icon
                style="cursor: pointer;color: var(--el-color-primary);font-size: 16px;margin-left: 10px;"
                @click="copy"
              >
                <document-copy />
              </el-icon>
              <input
                style="position: absolute;left: -99999px;top:0;"
                id="googleSecretKey"
                :value="googleSecretKey"
              >
            </div>
          </el-card>
        </el-timeline-item>
        <el-timeline-item
          timestamp="3、输入谷歌验证码"
          placement="top"
          center
        >
          <el-card>
            <el-form-item
              label="谷歌验证码"
              prop="googleCode"
            >
              <el-input
                v-model="params.googleCode"
                placeholder="请输入谷歌验证码"
                clearable
              />
            </el-form-item>

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
          </el-card>
        </el-timeline-item>
        <el-timeline-item
          placement="top"
          center
        >
          <el-button
            type="primary"
            @click="submit"
          >
            提交
          </el-button>
          <el-button @click="$refs.form.resetFields()">
            重置
          </el-button>
        </el-timeline-item>
      </el-timeline>
    </el-form>
  </div>
</template>

<script>
  import {qrcanvas} from "qrcanvas"
  import {DocumentCopy} from '@element-plus/icons'

  export default {
    components: {DocumentCopy},
    data() {
      return {
        loading: false,
        codeText: '获取验证码',
        second: 60,
        params: {
          emailCode: '',
          googleCode: '',
        },
        rules: {
          emailCode: [
            {required: true, message: '请输入邮箱验证码'}
          ],
          googleCode: [
            {required: true, message: '请输入谷歌验证码'},
          ],
        },
        googleSecretKey: '',
        resetGoggleVerify: false,
      }
    },
    methods: {
      /**
       * 复制
       */
      copy() {
        const target = document.getElementById('googleSecretKey')
        target.select()
        document.execCommand("copy")
        this.$success('复制成功')
      },
      sendCode() {
        if (this.second !== 60 || this.loading || this.codeText !== '获取验证码') {
          return
        }
        this.loading = true
        this.codeText = '发送中...'
        this.axios.post('/v1/email/sendCode', {
          type: 'GOOGLE_SECRET',
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
          this.axios.post('/v1/user/googleSecret', params).then(() => {
            this.$refs.form.resetFields()
            let user = this.$store.getters.getUserInfo
            user.googleVerify = true
            this.resetGoggleVerify = false
            this.$store.commit('setUserInfo', user)
            this.$success('谷歌验证器绑定成功')
          }).catch(res => {
            this.$error(res.msg)
          }).finally(() => {
            this.loading = false
          })
        })
      },
      getGoogleSecret() {
        this.resetGoggleVerify = true
        this.axios.get('/v1/user/googleSecret').then(data => {
          this.googleSecretKey = data
          let text = 'otpauth://totp/' + this.$store.getters.getUserInfo.email + '?secret=' + data + '&issuer=交易引擎'
          let qr = qrcanvas({
            data: text,
            size: 120,
            padding: 5
          })
          document.getElementById('qrcode').innerHTML = ''
          qr.style.padding = '6px'
          document.getElementById('qrcode').appendChild(qr)
        }).catch(res => {
          this.$error(res.msg)
        })
      }
    },
    activated() {
      if (!this.$store.getters.getUserInfo.googleVerify) {
        this.getGoogleSecret()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content-divide {
    color: var(--el-color-primary);
    line-height: 35px;
    font-size: 18px;
    margin-top: 10px;
    border-bottom: 1px solid var(--app-border-color);
  }
  .el-form {
    width: 700px;
    margin: 40px auto 0 auto;
  }
</style>
