<!--suppress HtmlUnknownTag -->
<template>
    <div>
        <el-form :rules="rules" :model="loginForm" class="loginContent">
            <h3 class="loginTitle">系统登陆</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off"
                          placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="text" v-model="loginForm.password" auto-complete="off"
                          placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" class="loginRemember">记住密码</el-checkbox>
            <el-button style="width: 100%" type="primary">login</el-button>
        </el-form>
    </div>
</template>

<script>
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