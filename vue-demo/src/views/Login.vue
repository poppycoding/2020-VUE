<!--suppress HtmlUnknownTag -->
<template>
    <div>
        <el-form :model="loginForm" :rules="rules" class="loginContent" ref="loginForm">
            <h3 class="loginTitle">系统登陆</h3>
            <el-form-item prop="username">
                <el-input auto-complete="off" placeholder="请输入用户名" type="text" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input auto-complete="off" placeholder="请输入密码" type="text"
                          v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-checkbox class="loginRemember" v-model="checked">记住密码</el-checkbox>
            <el-button @click="submitLoginForm" style="width: 100%" type="primary">login</el-button>
        </el-form>
    </div>
</template>

<script>
    /// import {postKVRequest} from "../util/api";不再导入,通过Vue.prototype封装插件,通过this.调用

    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: 'admin',
                    password: '123'
                },
                checked: true,
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                }
            }
        },
        methods: {
            submitLoginForm() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.postKVRequest('/doLogin', this.loginForm).then(response => {
                            if (response) {
                                // 存到当前页面的session中,关闭页面就会清空
                                window.sessionStorage.setItem('user', JSON.stringify(response))

                                // 页面跳转:replace是浏览者器中不带后退的功能,push是带后退的功能
                                this.$router.replace('/home')
                            }
                        })
                    } else {
                        this.$message.error('请输入用户名和密码!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .loginTitle {
        text-align: center;
        color: #060606;
        margin: 15px auto 20px auto;

    }

    .loginRemember {
        text-align: center;
        margin: 0 0 20px auto;
    }

    .loginContent {
        border: 1px solid #eaeaea;
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        background: #fff;
        padding: 15px 35px 15px 35px;
        box-shadow: 0 0 25px #f6faf4;
    }
</style>