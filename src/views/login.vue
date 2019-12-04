<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">管理你的第二大脑</div>
            <el-tabs type="border-card">
              <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> 登录</span>
                <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="ms-content">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="username">
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="password" v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')">
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitLoginForm('loginForm')">登录</el-button>
                    </div>
                </el-form>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-time"></i> 注册</span>
                <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="0px" class="ms-content">
                    <el-form-item prop="username">
                        <el-input v-model="registerForm.username" placeholder="username">
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="password" v-model="registerForm.password" @keyup.enter.native="submitForm('registerForm')">
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitregisterForm('registerForm')">注册</el-button>
                    </div>
                </el-form>
              </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import AUTH from '@/apis/auth'
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: 'admin',
                    password: '123123'
                },
                loginForm: {
                  username: '',
                  password: ''
                },
                registerForm: {
                  username: '',
                  password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 1, max: 15, message: '长度在 1 到 10 个字符', trigger: 'blur' }

                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitLoginForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        AUTH.login(this.loginForm).then(res=>{
                          console.log(res)
                          this.$message.success(`${res.data.username},欢迎登录`)
                          this.$router.push('/');
                        }).catch(err=>{
                          this.$message.err('登录失败')
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitRegisterForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        localStorage.setItem('ms_username',this.ruleForm.username);
                        this.$router.push('/');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang='stylus' scoped>
  .login-wrap
    position relative
    width 100%
    height 100%
    background-image url(../../static/login-bg.jpg)
    background-size 100%
    .ms-login
      position absolute
      left 50%
      top 50%
      margin -190px 0 0 -175px
      width 350px
      text-align center
      background rgba(85,255,255, 0.3)
      border-radius 5px
      overflow hidden
      .ms-title
        font-size 18px
        color #333
        height 40px
        line-height 40px
    .ms-content
      padding 20px
      .login-btn
        text-align center
        height 36px
        line-height 36px
      .login-btn button
        width 100%
        margin-bottom 10px
        text-align center
</style>
