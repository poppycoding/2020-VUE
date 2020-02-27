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
                    <span class="el-dropdown-link">{{user.name}}
                        <i><img :src="user.userface" alt=""></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="info">个人中心</el-dropdown-item>
                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <!--原生实现二级菜单的路径跳转,indexPath就是二级的index值,element支持router直接自动实现跳转功能-->
                    <!--<el-menu @select="menuClick">+ this.$router.push(indexPath)-->
                    <el-menu router>
                        <!--v-if-for不可以同时使用,需要修改"allowUsingIterationVar":为true-->
                        <!--<el-submenu :key="pIndex" index="1" v-for="(parent,pIndex) in this.$router.options.routes" v-if="parent.isNavigation">-->
                        <el-submenu :key="pIndex" index="1" v-for="(parent,pIndex) in navigations">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{parent.name}}</span>
                            </template>
                            <el-menu-item :index="child.path" :key="cIndex" v-for="(child,cIndex) in parent.children">
                                {{child.name}}
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view/>
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
                user: JSON.parse(window.sessionStorage.getItem('user'))
            }
        },
        computed: {
            navigations() {
                return this.$router.options.routes.filter(function (nav) {
                    return nav.isNavigation
                })
            }
        },
        methods: {
            handleCommand(command) {
                if (command === 'logout') {
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest('/logout')
                        window.sessionStorage.removeItem('user')
                        this.$router.replace('/')
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            }
        }
    }
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

    .el-dropdown-link img {
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }

    .homeHeader .el-dropdown-link {
        display: flex;
        align-items: center;
    }


</style>