<template>
  <div>
    <a class="title">
      基本信息
    </a>
    <el-card id="1-1">
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
    <el-card id="1-2">
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
    <el-card id="1-3">
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
    <el-card id="1-4">
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

      <div style="margin-top: 10px;color: var(--app-text-color-light)">
        status - 订单状态
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
          <td>NEW</td>
          <td>新订单</td>
        </tr>
        <tr>
          <td>PARTIALLY_FILLED</td>
          <td>部分成交</td>
        </tr>
        <tr>
          <td>FILLED</td>
          <td>完全成交</td>
        </tr>
        <tr>
          <td>FAILURE</td>
          <td>成交失败</td>
        </tr>
        <tr>
          <td>CANCELED</td>
          <td>已撤销</td>
        </tr>
      </table>

      <div style="margin-top: 10px;color: var(--app-text-color-light)">
        accountType - 账户类型
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
          <td>SPOT</td>
          <td>现货</td>
        </tr>
      </table>

      <div style="margin-top: 10px;color: var(--app-text-color-light)">
        enable - 是否可用
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
          <td>1</td>
          <td>可用</td>
        </tr>
        <tr>
          <td>0</td>
          <td>不可用</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
@import "./api.scss";
</style>