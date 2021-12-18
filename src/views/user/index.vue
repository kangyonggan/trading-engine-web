<template>
  <div>
    <div class="page-header">
      <el-icon>
        <coin />
      </el-icon>
      现货账户

      <span style="float: right;font-size: 12px;margin-top: 15px;">
        隐藏小额资产
        <el-switch
          v-model="hideLittle"
          @change="changeHideLittle"
        />
      </span>
    </div>

    <el-table
      v-loading="loading"
      :data="accounts"
    >
      <el-table-column
        prop="currency"
        label="币种"
      />
      <el-table-column
        prop="totalAmount"
        label="总资产"
      />
      <el-table-column
        prop="frozenAmount"
        label="冻结资产"
      />
      <el-table-column
        prop="freeAmount"
        label="可用资产"
      >
        <template #default="scope">
          {{ scope.row.totalAmount - scope.row.frozenAmount }}
        </template>
      </el-table-column>
      <el-table-column
        prop="enable"
        label="状态"
      >
        <template #default="scope">
          {{ scope.row.enable === 1 ? '正常' : '禁用' }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template #default="scope">
          <el-button
            type="text"
            @click="trade(scope.row)"
          >
            流水
          </el-button>
          <el-button
            type="text"
            @click="trade(scope.row)"
          >
            交易
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {Coin} from '@element-plus/icons'

export default {
  components: {Coin},
  data() {
    return {
      loading: false,
      hideLittle: localStorage.getItem('hideLittle') === 'YES',
      accounts: [],
      allAccounts: []
    }
  },
  methods: {
    changeHideLittle(hideLittle) {
      localStorage.setItem('hideLittle', hideLittle ? 'YES' : 'NO')
      let res = []
      if (hideLittle) {
        for (let i = 0; i < this.allAccounts.length; i++) {
          if (this.allAccounts[i].totalAmount > 0) {
            res.push(this.allAccounts[i])
          }
        }
      } else {
        res = this.allAccounts
      }
      this.accounts = res
    },
    trade(row) {
      console.log(row)
      this.$warning('敬请期待')
    },
    loadAccounts() {
      this.loading = true
      this.axios.get('/v1/user/account').then(data => {
        this.allAccounts = data
        this.changeHideLittle(this.hideLittle)
      }).catch(res => {
        this.$error(res.msg)
      }).finally(() => {
        this.loading = false
      })
    }
  },
  activated() {
    this.loadAccounts()
  }
}
</script>

<style scoped lang="scss">
@import "./user.scss";
</style>
