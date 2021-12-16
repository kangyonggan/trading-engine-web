<template>
  <div>
    <div class="page-header">
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
      :data="permissions"
    >
      <el-table-column
        label="Api Key"
        prop="apiKey"
      >
        <template #default="scope">
          {{ scope.row.apiKey.substring(0, 4) }}****{{ scope.row.apiKey.substring(59, 63) }}
          <el-icon
            style="cursor: pointer;color: var(--el-color-primary);font-size: 16px;"
            @click="copy('copy-apiKey-' + scope.row.id)"
          >
            <document-copy />
          </el-icon>
          <input
            style="position: absolute;left: -99999px;top:0;"
            :id="'copy-apiKey-' + scope.row.id"
            :value="scope.row.apiKey"
          >
        </template>
      </el-table-column>
      <el-table-column
        label="Secret Key"
        prop="secretKey"
      >
        <template #default="scope">
          <div v-if="!secretKeyMap[scope.row.id]">
            {{ scope.row.secretKey }}
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
        label="IP白名单"
        prop="whiteList"
      >
        <template #default="scope">
          {{ scope.row.whiteList || '无' }}
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
      @success="loadPermissions"
    />

    <show-secret
      ref="show-secret"
      @success="showSecretKeySuccess"
    />
  </div>
</template>

<script>
import {DocumentCopy, Delete, Edit, Unlock} from '@element-plus/icons'
import CreateApi from './create-api'
import EditApi from './edit-api'
import ShowSecret from './show-secret'

export default {
  components: {DocumentCopy, Delete, Edit, Unlock, CreateApi, EditApi, ShowSecret},
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
      permissions: [],
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
      this.secretKeyMap[data.id] = data.secretKey
    },
    /**
     * 创建Api成功
     */
    success(data) {
      this.apiKey = data.apiKey
      this.secretKey = data.secretKey
      this.loadPermissions()
      this.$success('API创建成功')
      this.params.remark = ''
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
        this.axios.delete('/v1/user/permission?id=' + row.id).finally(() => {
          this.loadPermissions()
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
    loadPermissions() {
      this.loading = true
      this.axios.get('/v1/user/permission').then(data => {
        this.permissions = data
      }).catch(res => {
        this.$error(res.msg)
      }).finally(() => {
        this.loading = false
      })
    }
  },
  activated() {
    this.loadPermissions()
  }
}
</script>

<style scoped lang="scss">
@import "../user.scss";
</style>