<template>
  <div>
    <a class="title">
      账户和交易接口
    </a>
    <el-card id="3-1">
      <div class="title-node">
        账户信息
      </div>
      <p>
        地址：
      </p>
      <ul>
        <li>POST /v1/account</li>
      </ul>
      <p>
        鉴权类型：
      </p>
      <ul>
        <li>USER_DATA</li>
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
        <li>id（Long）：账户ID</li>
        <li>uid（String）：用户uid</li>
        <li>accountType（Enum）：账户类型</li>
        <li>currency（String）：币种</li>
        <li>totalAmount（BigDecimal）：总资产</li>
        <li>frozenAmount（BigDecimal）：冻结资产</li>
        <li>enable（Enum）：是否可用</li>
        <li>createTime（Long）：创建时间</li>
        <li>updateTime（Long）：更新时间</li>
      </ul>
      <code>
        <pre>{
  "code": "0000",
  "msg": null,
  "data": [
    {
      "id": "1",
      "uid": "00000000",
      "accountType": "SPOT",
      "currency": "USDT",
      "totalAmount": 1000.000000000000,
      "frozenAmount": 500.100000000000,
      "enable": 1,
      "createTime": 1639967661000,
      "updateTime": 1639967661000
    }
  ],
  "success": true
}</pre>
      </code>
    </el-card>

    <el-card id="3-2">
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
      <code>
        <pre>{
  "symbol": "BTCUSDT",
  "clientOrderNo": "1639973816490",
  "side": "BUY",
  "type": "LIMIT",
  "price": 50000,
  "quantity": 0.01
}</pre>
      </code>
      <p>
        出参：
      </p>
      <ul>
        <li>clientOrderNo（String）：客户端订单号</li>
        <li>orderId（Long）：订单ID</li>
        <li>status（Enum）：状态</li>
      </ul>
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
    </el-card>

    <el-card id="3-3">
      <div class="title-node">
        订单查询
      </div>
      <p>
        地址：
      </p>
      <ul>
        <li>GET /v1/order</li>
      </ul>
      <p>
        鉴权类型：
      </p>
      <ul>
        <li>USER_DATA</li>
      </ul>
      <p>
        入参：
      </p>
      <ul>
        <li>clientOrderNo（String）：客户端订单号</li>
      </ul>
      <p>
        出参：
      </p>
      <ul>
        <li>orderId（Long）：订单ID</li>
        <li>uid（String）：用户uid</li>
        <li>clientOrderNo（String）：客户端订单号</li>
        <li>symbol（String）：交易对</li>
        <li>side（Enum）：买卖方向</li>
        <li>type（Enum）：订单类型</li>
        <li>price（BigDecimal）：委托价格</li>
        <li>quantity（BigDecimal）：数量</li>
        <li>tradeQuantity（BigDecimal）：已成交数量</li>
        <li>status（Enum）：状态</li>
        <li>createTime（Long）：下单时间</li>
      </ul>
      <code>
        <pre>{
  "code": "0000",
  "msg": null,
  "data": {
    "orderId": 1472782862146707457,
    "uid": "00000000",
    "clientOrderNo": "1639973816490",
    "symbol": "BTCUSDT",
    "side": "BUY",
    "type": "LIMIT",
    "price": 50000.000000000000,
    "quantity": 0.010000000000,
    "tradeQuantity": 0,
    "status": "NEW",
    "createTime": 1639973771000
  },
  "success": true
}</pre>
      </code>
    </el-card>

    <el-card id="3-4">
      <div class="title-node">
        撤销订单
      </div>
      <p>
        地址：
      </p>
      <ul>
        <li>DELETE /v1/order</li>
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
        <li>clientOrderNo（String）：客户端订单号</li>
        <li>symbol（String）：交易对</li>
      </ul>
      <span class="light">clientOrderNo 和 symbol 至少上送一个</span>
      <p>
        出参：
      </p>
      <ul>
        <li>clientOrderNos（String）：撤销成功的客户端订单号</li>
      </ul>
      <code>
        <pre>{
  "code": "0000",
  "msg": null,
  "data": {
    "clientOrderNos": ["1639973816490"],
  },
  "success": true
}</pre>
      </code>
    </el-card>

    <el-card id="3-5">
      <div class="title-node">
        查询当前挂单
      </div>
      <p>
        地址：
      </p>
      <ul>
        <li>GET /v1/openOrders</li>
      </ul>
      <p>
        鉴权类型：
      </p>
      <ul>
        <li>USER_DATA</li>
      </ul>
      <p>
        入参：
      </p>
      <ul>
        <li>symbol（String）：交易对</li>
      </ul>
      <p>
        出参：
      </p>
      <ul>
        <ul>
          <li>orderId（Long）：订单ID</li>
          <li>uid（String）：用户uid</li>
          <li>clientOrderNo（String）：客户端订单号</li>
          <li>symbol（String）：交易对</li>
          <li>side（Enum）：买卖方向</li>
          <li>type（Enum）：订单类型</li>
          <li>price（BigDecimal）：委托价格</li>
          <li>quantity（BigDecimal）：数量</li>
          <li>tradeQuantity（BigDecimal）：已成交数量</li>
          <li>status（Enum）：状态</li>
          <li>createTime（Long）：下单时间</li>
        </ul>
      </ul>
      <code>
        <pre>{
  "code": "0000",
  "msg": null,
  "data": {
    "orderId": 1472782862146707457,
    "uid": "00000000",
    "clientOrderNo": "1639973816490",
    "symbol": "BTCUSDT",
    "side": "BUY",
    "type": "LIMIT",
    "price": 50000.000000000000,
    "quantity": 0.010000000000,
    "tradeQuantity": 0,
    "status": "NEW",
    "createTime": 1639973771000
  },
  "success": true
}</pre>
      </code>
    </el-card>

    <el-card id="3-6">
      <div class="title-node">
        查询所有订单
      </div>
      <p>
        地址：
      </p>
      <ul>
        <li>GET /v1/allOrders</li>
      </ul>
      <p>
        鉴权类型：
      </p>
      <ul>
        <li>USER_DATA</li>
      </ul>
      <p>
        入参：
      </p>
      <ul>
        <li>symbol（String）：交易对</li>
        <li>orderId（Long）：最小订单号</li>
        <li>limit（Integer）：条数（缺省为500条）</li>
      </ul>
      <p>
        出参：
      </p>
      <ul>
        <ul>
          <li>orderId（Long）：订单ID</li>
          <li>uid（String）：用户uid</li>
          <li>clientOrderNo（String）：客户端订单号</li>
          <li>symbol（String）：交易对</li>
          <li>side（Enum）：买卖方向</li>
          <li>type（Enum）：订单类型</li>
          <li>price（BigDecimal）：委托价格</li>
          <li>quantity（BigDecimal）：数量</li>
          <li>tradeQuantity（BigDecimal）：已成交数量</li>
          <li>status（Enum）：状态</li>
          <li>createTime（Long）：下单时间</li>
        </ul>
      </ul>
      <code>
        <pre>{
  "code": "0000",
  "msg": null,
  "data": {
    "orderId": 1472782862146707457,
    "uid": "00000000",
    "clientOrderNo": "1639973816490",
    "symbol": "BTCUSDT",
    "side": "BUY",
    "type": "LIMIT",
    "price": 50000.000000000000,
    "quantity": 0.010000000000,
    "tradeQuantity": 0,
    "status": "NEW",
    "createTime": 1639973771000
  },
  "success": true
}</pre>
      </code>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
@import "./api.scss";
</style>