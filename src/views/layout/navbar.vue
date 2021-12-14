<template>
  <div class="navbar">
    <router-link to="/">
      <div
        class="logo"
      >
        <img src="../../assets/logo.png">
        <span>金币研究所</span>
      </div>
    </router-link>

    <ul class="nav-menus">
      <li>
        <router-link to="/futures">
          永续合约
        </router-link>
      </li>
      <li>
        <router-link to="/spot">
          现货交易
        </router-link>
      </li>
    </ul>

    <ul
      class="nav-user"
      v-if="$store.getters.getUserInfo.id"
    >
      <li>
        <el-dropdown
          trigger="click"
          class="profile"
          @command="handleCommand"
        >
          <span
            class="el-dropdown-link"
            style="margin-left: 20px;color: #d5d5d5;cursor: pointer;height: 60px;line-height: 60px;display: inline-block"
            v-if="$store.getters.getUserInfo.email.indexOf('@') <= 4"
          >
            {{ $store.getters.getUserInfo.email.substring(0, $store.getters.getUserInfo.email.indexOf('@')) }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <span
            class="el-dropdown-link"
            style="margin-left: 20px;color: #d5d5d5;cursor: pointer;height: 60px;line-height: 60px;display: inline-block"
            v-else
          >
            {{ $store.getters.getUserInfo.email.substring(0, 4) }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                command="logout"
              >
                <i class="el-icon-switch-button" />退出登录
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
          to="/register"
          :class="isActive('/register') ? 'active ' : ''"
        >
          注册
        </router-link>
      </li>
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
export default {
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
        this.axios.get('/v1/user/logout').finally(() => {
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
$--color-primary: #D8BE33;

.navbar {
  height: 60px;
  line-height: 60px;
  background: #171a21;
  border-bottom: 1px solid #293448;

  .logo {
    float: left;

    img {
      margin: 10px 0 0 10px;
      height: 40px;
      float: left;
    }

    span {
      color: $--color-primary;
      font-size: 18px;
      float: left;
      line-height: 60px;
      margin-left: 5px;
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
        color: #a6afc6;
      }

      a.active {
        color: $--color-primary;
      }

      a:hover {
        color: $--color-primary;
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
        color: #828ea1;
      }

      a.active {
        color: $--color-primary;
      }

      a:hover {
        color: $--color-primary;
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
