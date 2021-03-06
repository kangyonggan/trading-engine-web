<template>
  <div>
    <div class="page-header">
      <el-icon><set-up /></el-icon>
      API管理
    </div>

    <el-form
      ref="form"
      :model="params"
      :rules="rules"
      inline
      label-position="top"
    >
      <div>
        <el-form-item
          style="width: 400px;float: left"
          prop="remark"
          label="给API密钥一个标签"
        >
          <el-input
            v-model="params.remark"
            placeholder="API标签"
            clearable
          />
        </el-form-item>
        <el-form-item style="float: left;margin-top: 40px;margin-left: 10px;">
          <el-button
            type="primary"
            @click="createApi"
          >
            创建API
          </el-button>
        </el-form-item>
      </div>
      <div style="width: 100%;color: var(--app-text-color-dark);font-size: 14px;">
        <div>1. 每个账户最多可以创建 30 个 API Key。</div>
        <div>2. 请勿将您的 API Key 透露给任何人，以免造成资产损失。建议为API Key绑定IP，以提高您的账户安全性。</div>
        <div>3. 请注意，将API Key绑定在第三方平台，可能有安全隐患，请您谨慎操作。</div>
        <div>
          4. 需要提前完成
          <router-link to="/user/security">
            谷歌认证
          </router-link>。
        </div>
      </div>
    </el-form>

    <el-alert
      v-show="secretKey"
      style="margin-top: 20px;width: calc(100% - 10px)"
      type="success"
      :title="'ApiKey：' + apiKey"
      :description="'SecretKey：' + secretKey"
      show-icon
      effect="dark"
      @close="secretKey = ''"
    />

    <div
      class="page-header"
      style="margin-top: 30px;"
    >
      API列表
    </div>
    <el-table
      v-loading="loading"
      :data="apis"
    >
      <el-table-column
        label="Api Key"
        prop="apiKey"
      >
        <template #default="scope">
          {{ scope.row.pubKey.substring(0, 4) }}****{{ scope.row.pubKey.substring(59, 63) }}
          <el-icon
            style="cursor: pointer;color: var(--el-color-primary);font-size: 16px;"
            @click="copy('copy-apiKey-' + scope.row.id)"
          >
            <document-copy />
          </el-icon>
          <input
            style="position: absolute;left: -99999px;top:0;"
            :id="'copy-apiKey-' + scope.row.id"
            :value="scope.row.pubKey"
          >
        </template>
      </el-table-column>
      <el-table-column
        label="Secret Key"
        prop="secretKey"
      >
        <template #default="scope">
          <div v-if="!secretKeyMap[scope.row.id]">
            {{ scope.row.priKey }}
            <el-icon
              style="cursor: pointer;color: var(--el-color-primary);font-size: 16px;"
              @click="showSecretKey(scope.row.id)"
            >
              <unlock />
            </el-icon>
          </div>
          <div v-else>
            {{ secretKeyMap[scope.row.id].substring(0, 4) }}****{{ secretKeyMap[scope.row.id].substring(59, 63) }}
            <el-icon
              style="cursor: pointer;color: var(--el-color-primary);font-size: 16px;"
              @click="copy('copy-secretKey-' + scope.row.id)"
            >
              <document-copy />
            </el-icon>
            <input
              style="position: absolute;left: -99999px;top:0;"
              :id="'copy-secretKey-' + scope.row.id"
              :value="secretKeyMap[scope.row.id]"
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="标签"
        prop="remark"
      />
      <el-table-column
        label="创建时间"
        prop="createTime"
      >
        <template #default="scope">
          {{ DateTimeUtil.format(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template #default="scope">
          <span
            style="cursor: pointer;color: var(--el-color-primary);font-size: 16px;"
            @click="editApi(scope.row)"
          >
            <el-icon><edit /></el-icon>
          </span>
          <span
            style="cursor: pointer;color: var(--el-color-danger);margin-left: 10px;font-size: 16px;"
            @click="deleteApi(scope.row)"
          >
            <el-icon><delete /></el-icon>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <create-api
      ref="create-api"
      @success="success"
    />

    <edit-api
      ref="edit-api"
      @success="loadApis"
    />

    <show-secret
      ref="show-secret"
      @success="showSecretKeySuccess"
    />
  </div>
</template>

<script>
import {DocumentCopy, Delete, Edit, Unlock, SetUp} from '@element-plus/icons'
import CreateApi from './create-api'
import EditApi from './edit-api'
import ShowSecret from './show-secret'

export default {
  components: {DocumentCopy, Delete, Edit, Unlock, SetUp, CreateApi, EditApi, ShowSecret},
  data() {
    return {
      loading: false,
      params: {
        remark: ''
      },
      rules: {
        remark: [
          {required: true, message: '请输入标签'}
        ],
      },
      apis: [],
      apiKey: '',
      secretKey: '',
      secretKeyMap: {}
    }
  },
  methods: {
    /**
     * 复制
     */
    copy(key) {
      const target = document.getElementById(key)
      target.select()
      document.execCommand("copy")
      this.$success('复制成功')
    },
    /**
     * 查看SecretKey
     */
    showSecretKey(id) {
      this.$refs['show-secret'].show(id)
    },
    showSecretKeySuccess(data) {
      this.secretKeyMap[data.id] = data.priKey
    },
    /**
     * 创建Api成功
     */
    success(data) {
      this.apiKey = data.pubKey
      this.secretKey = data.priKey
      this.loadApis()
      this.$success('API创建成功')
      this.$refs.form.resetFields()
    },
    /**
     * 删除API
     */
    deleteApi(row) {
      this.$confirm('确定删除API吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.axios.delete('/v1/user/api?id=' + row.id).finally(() => {
          this.loadApis()
        }).catch(res => {
          this.$error(res.msg)
        }).finally(() => {
          this.loading = false
        })
      })
    },
    /**
     * 编辑API
     */
    editApi(row) {
      this.$refs['edit-api'].show(row)
    },
    /**
     * 创建Api
     */
    createApi() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        this.$refs['create-api'].show(this.params.remark)
      })
    },
    /**
     * 加载Api列表
     */
    loadApis() {
      this.loading = true
      this.axios.get('/v1/user/api').then(data => {
        this.apis = data
      }).catch(res => {
        this.$error(res.msg)
      }).finally(() => {
        this.loading = false
      })
    }
  },
  activated() {
    this.loadApis()
  }
}
</script>

<style scoped lang="scss">
@import "../user.scss";
</style>
