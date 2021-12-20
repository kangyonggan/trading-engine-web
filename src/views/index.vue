<template>
  <div>
    <el-menu
      ref="menu"
      class="side-bar"
      router
      :default-active="defaultActive"
    >
      <el-sub-menu index="1">
        <template #title>
          <span>基本信息</span>
        </template>
        <el-menu-item
          index="#1-1"
        >
          Github源码
        </el-menu-item>
        <el-menu-item
          index="#1-2"
        >
          Rest基本信息
        </el-menu-item>
        <el-menu-item index="#1-3">
          接口鉴权类型
        </el-menu-item>
        <el-menu-item index="#1-4">
          数据签名
        </el-menu-item>
        <el-menu-item index="#1-5">
          枚举和错误码
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <span>公共行情接口</span>
        </template>
        <el-menu-item index="#2-1">
          测试服务器连通性
        </el-menu-item>
        <el-menu-item index="#2-2">
          获取服务器时间
        </el-menu-item>
        <el-menu-item index="#2-3">
          获取交易对
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <span>账户和交易接口</span>
        </template>
        <el-menu-item index="#3-1">
          下单
        </el-menu-item>
        <el-menu-item index="#3-2">
          批量下单
        </el-menu-item>
        <el-menu-item index="#3-3">
          查询订单
        </el-menu-item>
        <el-menu-item index="#3-4">
          撤销订单
        </el-menu-item>
        <el-menu-item index="#3-5">
          撤销全部订单
        </el-menu-item>
        <el-menu-item index="#3-6">
          批量撤销订单
        </el-menu-item>
        <el-menu-item index="#3-7">
          查询当前挂单
        </el-menu-item>
        <el-menu-item index="#3-8">
          查询所有订单
        </el-menu-item>
        <el-menu-item index="#3-9">
          账户信息
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <span>Websocket推送</span>
        </template>
        <el-menu-item index="#4-1">
          实时订阅/取消数据流
        </el-menu-item>
        <el-menu-item index="#4-2">
          最新价格
        </el-menu-item>
        <el-menu-item index="#4-3">
          K线
        </el-menu-item>
        <el-menu-item index="#4-4">
          有限档深度信息
        </el-menu-item>
        <el-menu-item index="#4-5">
          增量深度信息
        </el-menu-item>
      </el-sub-menu>
    </el-menu>

    <div class="main-content">
      <a class="title">
        基本信息
      </a>
      <el-card id="1-1">
        <div class="title-node">
          Github源码
        </div>
        <p>
          交易引擎由Java语言实现，目前只支持单机模式不支持集群。分为：Java后台、后台管理系统和Web前端。
        </p>
        <ul>
          <li>
            Java后台：
            <a
              href="https://github.com/kangyonggan/trading-engine.git"
              target="_blank"
            >
              https://github.com/kangyonggan/trading-engine.git
            </a>
          </li>
          <li>
            后台管理系统：
            <a
              href="https://github.com/kangyonggan/trading-engine-admin.git"
              target="_blank"
            >
              https://github.com/kangyonggan/trading-engine-admin.git
            </a>
          </li>
          <li>
            Web前端：
            <a
              href="https://github.com/kangyonggan/trading-engine-web.git"
              target="_blank"
            >
              https://github.com/kangyonggan/trading-engine-web.git
            </a>
          </li>
        </ul>
      </el-card>
      <el-card id="1-2">
        <div class="title-node">
          Rest基本信息
        </div>
        <p>
          Rest接口的基础地址为：
          <span class="light">
            http://127.0.0.1:8080
          </span>
        </p>
        <ul>
          <li>
            接口可能需要用户的 API Key，如何创建API-KEY请参考
            <router-link to="/user/api">
              这里
            </router-link>
          </li>
          <li>
            所有接口的响应都是JSON格式
          </li>
          <li>
            所有时间、时间戳均为UNIX时间，单位为毫秒
          </li>
          <li>
            所有数据类型采用JAVA的数据类型定义
          </li>
        </ul>
      </el-card>
      <el-card id="1-3">
        <div class="title-node">
          接口鉴权类型
        </div>
        <ul>
          <li>
            NONE：不需要鉴权的接口
          </li>
          <li>
            TRADE：需要有效的API-KEY和签名
          </li>
          <li>
            USER_DATA：需要有效的API-KEY和签名
          </li>
        </ul>
      </el-card>
      <el-card id="1-4">
        <div class="title-node">
          数据签名
        </div>
        <ul>
          <li>
            调用鉴权类型为<span class="light">TRADE</span>和<span class="light">USER_DATA</span>接口时，除了接口本身所需的参数外，还需要传递<span
              class="light"
            >sign</span>即签名参数。
          </li>
          <li>
            请求头中需要传递<span class="light">APIKEY</span>即API-KEY。
          </li>
          <li>
            签名使用<span class="light">HMAC SHA256</span>算法. API-KEY所对应的API-Secret作为 <span class="light">HMAC SHA256</span>
            的密钥，其他所有参数作为<span class="light">HMAC SHA256</span>的操作对象，得到的输出即为签名。
          </li>
          <li>
            签名大小写不敏感。
          </li>
          <li>
            当同时使用query string和request body时，<span class="light">HMAC SHA256</span>的输入query string在前，request body在后
          </li>
        </ul>
      </el-card>
      <el-card id="1-5">
        <div class="title-node">
          枚举和错误码
        </div>

        <div style="margin-top: 10px;color: var(--app-text-color-light)">
          side - 买卖方向
        </div>
        <table
          class="table"
          style="width: 500px"
        >
          <tr>
            <th>枚举值</th>
            <th>说明</th>
          </tr>
          <tr>
            <td>BUY</td>
            <td>买入</td>
          </tr>
          <tr>
            <td>SELL</td>
            <td>卖出</td>
          </tr>
        </table>

        <div style="margin-top: 10px;color: var(--app-text-color-light)">
          type - 订单类型
        </div>
        <table
          class="table"
          style="width: 500px"
        >
          <tr>
            <th>枚举值</th>
            <th>说明</th>
          </tr>
          <tr>
            <td>LIMIT</td>
            <td>限价单</td>
          </tr>
          <tr>
            <td>MARKET</td>
            <td>市价单</td>
          </tr>
        </table>
      </el-card>
      <a class="title">
        公共行情接口
      </a>
      <el-card id="2-1">
        <div class="title-node">
          测试服务器连通性
        </div>
        <p>
          地址：
        </p>
        <ul>
          <li>GET /v1/ping</li>
        </ul>
        <p>
          鉴权类型：
        </p>
        <ul>
          <li>NONE</li>
        </ul>
        <p>
          入参：
        </p>
        <ul>
          <li>无</li>
        </ul>
        <p>
          出参：
          <code>
            <pre>{
  "code": "0000",
  "msg": null,
  "data": "pong",
  "success": true
}</pre>
          </code>
        </p>
      </el-card>
      <el-card id="2-2">
        <div class="title-node">
          获取服务器时间
        </div>
        <p>
          地址：
        </p>
        <ul>
          <li>GET /v1/time</li>
        </ul>
        <p>
          鉴权类型：
        </p>
        <ul>
          <li>NONE</li>
        </ul>
        <p>
          入参：
        </p>
        <ul>
          <li>无</li>
        </ul>
        <p>
          出参：
          <code>
            <pre>{
  "code": "0000",
  "msg": null,
  "data": 1639903235341,
  "success": true
}</pre>
          </code>
        </p>
      </el-card>
      <el-card id="2-3">
        <div class="title-node">
          获取交易对
        </div>
        <p>
          地址：
        </p>
        <ul>
          <li>GET /v1/symbol</li>
        </ul>
        <p>
          鉴权类型：
        </p>
        <ul>
          <li>NONE</li>
        </ul>
        <p>
          入参：
        </p>
        <ul>
          <li>无</li>
        </ul>
        <p>
          出参：
        </p>
        <ul>
          <li>symbol（String）：交易对</li>
          <li>takerFeeRate（BigDecimal）：taker手续费率</li>
          <li>makerFeeRate（BigDecimal）：maker手续费率</li>
          <li>priceScale（Integer）：价格精度</li>
          <li>quantityScale（Integer）：数量精度</li>
          <li>sort（Integer）：排序</li>
          <li>price（BigDecimal）：最新价</li>
          <li>rose（BigDecimal）：24小时涨跌幅</li>
        </ul>
        <code>
          <pre>{
  "code": "0000",
  "msg": null,
  "data": [
    {
      "symbol": "BTCUSDT",
      "takerFeeRate": 0.000200000000,
      "makerFeeRate": 0.000400000000,
      "priceScale": 4,
      "quantityScale": 8,
      "sort": 0,
      "price": 57685.4156,
      "rose": -0.0256
    }
  ],
  "success": true
}</pre>
        </code>
      </el-card>
      <a class="title">
        账户和交易接口
      </a>
      <el-card id="3-1">
        <div class="title-node">
          下单
        </div>
        <p>
          地址：
        </p>
        <ul>
          <li>POST /v1/order</li>
        </ul>
        <p>
          鉴权类型：
        </p>
        <ul>
          <li>TRADE</li>
        </ul>
        <p>
          入参：
        </p>
        <ul>
          <li>symbol（String）：交易对</li>
          <li>clientOrderNo（String）：客户端订单号</li>
          <li>side（Enum）：买卖方向</li>
          <li>type（Enum）：订单类型</li>
          <li>price（BigDecimal）：委托价格</li>
          <li>quantity（BigDecimal）：数量</li>
        </ul>
        <p>
          出参：
          <code>
            <pre>{
  "code": "0000",
  "msg": null,
  "data": {
    "clientOrderNo": "1639973816490",
    "orderId": 1472782862146707457,
    "status": "NEW"
  },
  "success": true
}</pre>
          </code>
        </p>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: '',
    }
  },
  methods: {
    jump(id) {
      let section = document.getElementById(id)
      if (section) {
        section.scrollIntoView()
      }
    }
  },
  mounted() {
    this.defaultActive = this.$route.hash
    let defaultOpen = this.$route.hash.split('-')[0].replace('#', '')
    if (!defaultOpen) {
      defaultOpen = '1'
    }
    this.$refs.menu.open([defaultOpen])
    this.jump(this.$route.hash.replace('#', ''))
  },
  watch: {
    '$route'(newRoute) {
      this.jump(newRoute.hash.replace('#', ''))
    }
  }
}
</script>

<style scoped lang="scss">
.side-bar {
  width: 220px;
  float: left;
}

.main-content {
  width: calc(100% - 261px);
  float: left;
  min-height: calc(100vh - 142px);
  padding: 10px 20px;
  border-left: 1px solid var(--app-border-color);

  .title {
    display: block;
    font-size: 22px;
    font-weight: bold;
    line-height: 40px;
    padding-bottom: 5px;
    color: var(--app-text-color-light);
    border-bottom: 1px solid var(--app-border-color);
    margin-bottom: 15px;
  }

  .el-card {
    margin-bottom: 20px;

    .light {
      color: var(--app-text-color-light)
    }

    code {
      display: block;

      pre {
        background-color: var(--app-bg-color);
        padding: 5px 10px;
        border-radius: 4px;
        color: var(--app-text-color-light);
      }
    }

    .table {
      margin-top: 3px;
      border-collapse: collapse;
      border: 1px solid var(--app-text-color);

      tr {
        border-bottom: 1px solid var(--app-text-color);
      }

      th {
        border-collapse: collapse;
        color: var(--app-text-color-light);
        text-align: left;
        padding: 5px 8px;
        border-right: 1px solid var(--app-text-color);
      }

      td {
        border-collapse: collapse;
        padding: 5px 8px;
        border-right: 1px solid var(--app-text-color);
      }
    }
  }

  .title-node {
    font-size: 18px;
    color: var(--app-text-color-light);
  }
}
</style>
