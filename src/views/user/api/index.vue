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
          <el-input v-model="params.remark" />
        </el-form-item>
        <el-form-item style="float: left;margin-top: 40px;margin-left: 10px;">
          <el-button
            type="primary"
            @click="createApi"
            v-loading="loading"
          >
            创建API
          </el-button>
        </el-form-item>
      </div>
      <div style="width: 100%;color: var(--app-text-color-dark)">
        <div>1. 每个账户最多可以创建 30 个 API Key。</div>
        <div>2. 请勿将您的 API Key 透露给任何人，以免造成资产损失。建议为API Key绑定IP，以提高您的账户安全性。</div>
        <div>3. 请注意，将API Key绑定在第三方平台，可能有安全隐患，请您谨慎操作。</div>
        <div>4. 请在创建 API 之前完成 谷歌认证。</div>
      </div>
    </el-form>

    <div
      class="page-header"
      style="margin-top: 30px;"
    >
      API列表
    </div>
    <el-table
      :data="permissions"
    >
      <el-table-column
        label="Api Key"
        prop="apiKey"
      >
        <template #default="scope">
          <el-icon style="cursor: pointer;color: var(--el-color-primary);font-size: 16px;">
            <document-copy />
          </el-icon>
          {{ scope.row.apiKey.substring(0, 4) }}****{{ scope.row.apiKey.substring(59, 63) }}
        </template>
      </el-table-column>
      <el-table-column
        label="Secret Key"
        prop="secretKey"
      >
        <template #default="scope">
          {{ scope.row.secretKey }}
          <el-icon style="cursor: pointer;color: var(--el-color-primary);font-size: 16px;">
            <unlock />
          </el-icon>
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
            @click="deleteApi(scope.row)"
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
  </div>
</template>

<script>
import { DocumentCopy, Delete, Edit, Unlock } from '@element-plus/icons'

export default {
  components: { DocumentCopy, Delete, Edit, Unlock },
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
      permissions: []
    }
  },
  methods: {
    /**
     * 删除API
     */
    deleteApi(row) {
      console.log(row)
    },
    /**
     * 创建Api
     */
    createApi() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        this.loading = true;
        let params = Object.assign({}, this.params)
        this.axios.post('/v1/user/permission', params).then(() => {
          this.params.remark = ''
          this.$success('API创建成功')
          this.loadPermissions()
        }).catch(res => {
          this.$error(res.msg)
        }).finally(() => {
          this.loading = false
        })
      })
    },
    /**
     * 加载Api列表
     */
    loadPermissions() {
      this.axios.get('/v1/user/permission').then(data => {
        this.permissions = data
      }).catch(res => {
        this.$error(res.msg)
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