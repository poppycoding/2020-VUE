<!--suppress HtmlUnknownTag -->
<template>
  <div>
    <el-container>
      <!--header上面有间隙边距,是因为template嵌入在index.html中的body中,需要设置0px处理-->
      <el-header class="homeHeader">
        <div class="title">
          微人事
        </div>
        <el-dropdown @command="handleCommand" class="user">
          <span class="el-dropdown-link">
            {{ user.name }}
            <i><img :src="user.avatar" alt=""/></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout" divided>
              注销登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!--原生实现二级菜单的路径跳转,indexPath就是二级的index值,element支持router直接自动实现跳转功能-->
          <!--<el-menu @select="menuClick">+ this.$router.push(indexPath)-->
          <!-- unique-open控制只打开一级,但是需要index不同(否则认为是同一个菜单),所以需要不同的index值,同时为字符串,下面index+''转为字符串 -->
          <el-menu router unique-opened>
            <!--v-if-for不可以同时使用,需要修改"allowUsingIterationVar":为true-->
            <!--<el-submenu :key="pIndex" index="1" v-for="(parent,pIndex) in this.$router.options.routes" v-if="parent.isNavigation">-->
            <el-submenu
              :index="pIndex + ''"
              :key="pIndex"
              v-for="(parent, pIndex) in navigations"
            >
              <template slot="title">
                <i
                  :class="parent.iconCls"
                  style="color: #37d69b; margin-right: 10px"
                ></i>
                <span>{{ parent.name }}</span>
              </template>
              <el-menu-item
                :index="child.path"
                :key="cIndex"
                v-for="(child, cIndex) in parent.children"
              >
                <i
                  :class="child.iconCls"
                  style="color: #57d65b; margin-right: 12px; margin-left: 4px; width: 14px; height: 10px"
                ></i>
                <span style="margin-right: 80px">{{ child.name }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            style="margin-bottom: 10px"
            v-if="this.$router.currentRoute.path !== '/home'"
          >
            <el-breadcrumb-item :to="{ path: '/home' }">
              首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              {{ this.$router.currentRoute.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <div
            class="welcome"
            v-if="this.$router.currentRoute.path === '/home'"
          >
            欢迎使用微人事系统!
          </div>
          <router-view style="margin-top: 10px" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user"))
    };
  },
  computed: {
    navigations() {
      return this.$store.state.routes;
    }
  },
  methods: {
    handleCommand(command) {
      if (command === "logout") {
        this.$confirm("此操作将注销登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.getRequest("/logout");
            window.sessionStorage.removeItem("user");

            // 注销登陆时,需要清除vuex缓存的本次登陆权限菜单route信息,否则下次登陆即使是别的角色,还会继续使用这个缓存,
            // 需要刷新解决,因此注销时初始为空,下次登陆重新加载即可
            this.$store.commit("initRoutes", []);
            this.$router.replace("/");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    }
  }
};
</script>

<style>
.homeHeader {
  display: flex;
  align-items: center;
  padding: 0 15px;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #35d6c6;
}

.homeHeader .title {
  font-family: 华文行楷, serif;
  color: white;
  font-size: 30px;
}

.homeHeader .user {
  cursor: pointer;
}

.homeHeader .el-dropdown-link {
  display: flex;
  align-items: center;
}

.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}

.welcome {
  text-align: center;
  padding-top: 50px;
  font-family: 华文行楷, serif;
  color: #d63bca;
  font-size: 30px;
}
</style>
