<template>
  <div>
    <div class="page-header">
      {{ currency }}账户流水
    </div>

    <el-table
      v-loading="loading"
      :data="accountLogs"
    >
      <el-table-column
        prop="orderNo"
        label="订单号"
      />
      <el-table-column
        prop="accountType"
        label="账户类型"
      >
        <template #default="scope">
          {{ scope.row.accountType === 'SPOT' ? '现货账户' : scope.row.accountType }}
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="流水类型"
      >
        <template #default="scope">
          {{ scope.row.type === 'SPOT' ? '现货交易' : scope.row.type === 'FEE' ? '手续费' : scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column
        prop="amount"
        label="金额"
      />
      <el-table-column
        prop="createTime"
        label="时间"
      >
        <template #default="scope">
          {{ DateTimeUtil.format(scope.row.createTime) }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-show="total > 10"
      style="margin: 10px 0;float:right"
      layout="prev, pager, next"
      @current-change="loadAccountLogs($event)"
      :total="total * 1"
      :current-page="pageNum"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        accountLogs: [],
        pageNum: 1,
        total: 0,
        accountType: '',
        currency: '',
      }
    },
    methods: {
      loadAccountLogs(pageNum) {
        if (!pageNum) {
          pageNum = 1
        }
        this.pageNum = pageNum
        this.loading = true
        this.axios.get('/v1/user/accountLog?accountType=' + this.accountType + '&currency=' + this.currency + '&current=' + this.pageNum).then(data => {
          this.accountLogs = data.records
          this.total = data.total
        }).catch(res => {
          this.$error(res.msg)
        }).finally(() => {
          this.loading = false
        })
      }
    },
    activated() {
      this.accountType = this.$route.query.accountType.toUpperCase()
      this.currency = this.$route.query.currency.toUpperCase()
      this.loadAccountLogs()
    }
  }
</script>

<style scoped lang="scss">
  @import "./user.scss";
</style>
