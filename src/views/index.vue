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
          数据签名
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <span>行情接口</span>
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
        <el-menu-item index="#2-4">
          深度信息
        </el-menu-item>
        <el-menu-item index="#2-5">
          近期成交
        </el-menu-item>
        <el-menu-item index="#2-6">
          查询历史成交
        </el-menu-item>
        <el-menu-item index="#2-7">
          近期成交(归集)
        </el-menu-item>
        <el-menu-item index="#2-8">
          K线数据
        </el-menu-item>
        <el-menu-item index="#2-9">
          最新价格
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <span>Websocket 行情推送</span>
        </template>
        <el-menu-item index="#3-1">
          实时订阅/取消数据流
        </el-menu-item>
        <el-menu-item index="#3-2">
          最新价格
        </el-menu-item>
        <el-menu-item index="#3-3">
          K线
        </el-menu-item>
        <el-menu-item index="#3-4">
          有限档深度信息
        </el-menu-item>
        <el-menu-item index="#3-5">
          增量深度信息
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <span>账户和交易接口</span>
        </template>
        <el-menu-item index="#4-1">
          下单
        </el-menu-item>
        <el-menu-item index="#4-2">
          批量下单
        </el-menu-item>
        <el-menu-item index="#4-3">
          查询订单
        </el-menu-item>
        <el-menu-item index="#4-4">
          撤销订单
        </el-menu-item>
        <el-menu-item index="#4-5">
          撤销全部订单
        </el-menu-item>
        <el-menu-item index="#4-6">
          批量撤销订单
        </el-menu-item>
        <el-menu-item index="#4-7">
          查询当前挂单
        </el-menu-item>
        <el-menu-item index="#4-8">
          查询所有订单
        </el-menu-item>
        <el-menu-item index="#4-9">
          账户信息
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="5">
        <template #title>
          <span>Websocket 账户信息推送</span>
        </template>
        <el-menu-item index="#5-1">
          订单/交易 更新推送
        </el-menu-item>
        <el-menu-item index="#5-2">
          余额变动推送
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
          数据签名
        </div>
        <ul>
          <li>
            调用这些接口时，除了接口本身所需的参数外，还需要传递<span class="light">sign</span>即签名参数。
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
      <a class="title">
        行情接口
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
          <pre>xxx
xxx</pre>
        </code>
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
    }

    .title-node {
      font-size: 18px;
      color: var(--app-text-color-light);
    }
  }
</style>
