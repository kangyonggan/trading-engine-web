<template>
  <div>
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
  </div>
</template>

<style scoped lang="scss">
@import "./api.scss";
</style>