<template>
  <div class="navbar">
    <router-link to="/">
      <div
        class="logo"
      >
        <img
          alt="logo"
          src="../../assets/logo.png"
        >
        <span>交易引擎</span>
      </div>
    </router-link>

    <ul
      class="nav-user"
      v-if="$store.getters.getUserInfo.uid"
    >
      <li>
        <el-dropdown
          trigger="click"
          class="profile"
          @command="handleCommand"
        >
          <span>
            {{ $store.getters.getUserInfo.uid }}
            <el-icon><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                command="/user"
              >
                <el-icon><coin /></el-icon>钱包总览
              </el-dropdown-item>
              <el-dropdown-item
                command="/user/security"
              >
                <el-icon><lock /></el-icon>账户安全
              </el-dropdown-item>
              <el-dropdown-item
                command="/user/api"
              >
                <el-icon><set-up /></el-icon>API管理
              </el-dropdown-item>
              <el-dropdown-item
                divided
                command="/login"
              >
                <el-icon><Switch /></el-icon>切换账号
              </el-dropdown-item>
              <el-dropdown-item
                command="logout"
              >
                <el-icon><switch-button /></el-icon>退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
    </ul>

    <ul
      v-else
      class="nav-user"
    >
      <li>
        <router-link
          to="/login"
          :class="isActive('/login') ? 'active ' : ''"
        >
          登录
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ArrowDown, SwitchButton, Switch, Lock, SetUp, Coin } from '@element-plus/icons'

export default {
  components: { ArrowDown, SwitchButton, Switch, Lock, SetUp, Coin },
  data() {
    return {
      currentUrl: '/'
    }
  },
  methods: {
    isActive: function (url) {
      if (url === '/') {
        return this.currentUrl === '/';
      }
      return this.currentUrl.startsWith(url);
    },
    logout() {
      this.$confirm('确定退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('/v1/user/logout').finally(() => {
          this.$store.commit('setUserInfo', {})
          this.$router.push({
            path: '/login'
          })
        })
      })
    },
    handleCommand: function (command) {
      if (command === 'logout') {
        this.logout()
      } else {
        this.$router.push(command)
      }
    }
  },
  mounted() {
    this.currentUrl = this.$route.path
  },
  watch: {
    '$route'(newRoute) {
      this.currentUrl = newRoute.path
    }
  }
}
</script>

<style scoped lang="scss">
.navbar {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid var(--app-border-color);

  .logo {
    float: left;

    img {
      margin: 10px 0 0 10px;
      height: 40px;
      float: left;
    }

    span {
      font-size: 18px;
      float: left;
      line-height: 60px;
      margin-left: 5px;
      color: var(--app-text-color-light);
    }
  }

  .nav-menus {
    float: left;
    list-style: none;
    margin: 0 0 0 20px;
    padding: 0;

    li {
      float: left;
      height: 60px;
      line-height: 60px;
      text-align: center;
      margin-right: 10px;

      a {
        cursor: pointer;
        display: block;
        width: 70px;
        text-decoration: none;
        color: var(--app-text-color);
      }

      a.active {
        color: var(--el-color-primary);
      }

      a:hover {
        color: var(--el-color-primary);
      }
    }
  }

  .nav-user {
    float: right;
    list-style: none;
    margin: 0 20px 0 0;
    padding: 0;

    li {
      height: 60px;
      line-height: 60px;
      text-align: center;
      float: right;

      a {
        cursor: pointer;
        display: block;
        width: 70px;
        text-decoration: none;
        color: var(--app-text-color);
      }

      a.active {
        color: var(--el-color-primary);
      }

      a:hover {
        color: var(--el-color-primary);
      }

      .profile {
        .avatar {
          float: left;
          margin-top: 13px;
          margin-left: 10px;
        }

        i {
          margin-top: 25px;
          margin-right: 10px;
        }
      }
    }

    li.no-border {
      border: 0;
    }
  }
}
</style>
