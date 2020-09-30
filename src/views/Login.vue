<template>
    <div class="login-wrap">
        <div class="login-form-wrap">
            <h2 class="title">EL-ADMIN后台管理系统</h2>
            <el-form 
            ref="loginForm"
            :rules="rules"
            class="login-form"
            :model="formData">
                <el-form-item prop="userName">
                    <el-input 
                    v-model="formData.userName" 
                    prefix-icon="el-icon-user"/>  
                </el-form-item>      
                <el-form-item prop="password">
                    <el-input 
                    type="password"
                    v-model="formData.password" 
                    prefix-icon="el-icon-lock"/>  
                </el-form-item> 
                <el-form-item prop="checkCode">
                    <div class="checkCode-wrap">
                        <el-input 
                        v-model="formData.checkCode" 
                        prefix-icon="el-icon-circle-check"/>  
                        <check-code
                        ref="checkCodeDom" 
                        v-model="checkCode" />
                    </div>
                </el-form-item>
                <!-- <el-form-item prop="rememberMe">
                    <el-checkbox 
                    v-model="formData.rememberMe" 
                    label="记住我"/>
                </el-form-item>  -->
            </el-form>
            <el-button 
            :loading="loginLoading"
            @click="handleSubmit"
            type="primary">
                登陆
            </el-button>
        </div>
    </div>
</template>
<script>
import CheckCode from "@components/CheckCode.vue";
import ss from "@/until/sign";
import { mapActions } from "vuex";
export default {
    name: "login",
    components: {
        'check-code': CheckCode
    },
    data() {
        const checkValidator = (a,val,cb) => {
            const result = parseInt(val);
            if(isNaN(result)) {
                cb(new Error("需要一个数字结果"))
            }else {
                if(this.checkCode == result) {
                    cb();
                }else {
                    cb(new Error("错误的结果"));
                    this.$refs['checkCodeDom'].draw();
                }
            }
        }
        return {
            formData: {
                userName: "admin",
                password: "123456",
                checkCode: "",
                rememberMe: false
            },
            loginLoading: false,
            checkCode: 0,
            rules: {
                userName: [{
                    required: true,
                    message: "用户名是必需的",
                    trigger: "blur"
                }],
                password: [{
                    required: true,
                    message: "密码不能为空的",
                    trigger: "blur"
                }]
            }
        }
    },
    methods: {
        //登陆
        ...mapActions({
            login: "login"
        }),
        //得到ip地址
        getIp() {
            const script = document.createElement("script");
            script.src = 'https://pv.sohu.com/cityjson?ie=utf-8';
            document.head.appendChild(script);
            return new Promise(res => {
                script.onload = () => {
                    script.remove();
                    res()
                }
            })
        },
        handleSubmit() {
            const { 
                checkCode, 
                getIp,
                formData: {checkCode: formCheckCode}
            } = this;
            this.$refs['loginForm'].validate(async (valid) => {
                let checkValidator = true;//默认验证码正确
                const result = parseInt(formCheckCode);
                if(!(checkCode == result)) {
                    this.$notify({
                        type: "error",
                        message: '验证码错误'
                    });
                    checkValidator = false;//验证码错误
                    this.$refs['checkCodeDom'].draw();
                }
                if(valid && checkValidator) {
                    await getIp();
                    this.login({...this.formData, ip: window.returnCitySN.cip}).then(flag => {
                        this.$refs['loginForm'].resetFields();
                        if(flag) {
                            this.$router.push("/")
                        }else {
                            this.$refs['checkCodeDom'].draw();
                        }
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.login-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    // min-width: ;
    background-image: url("/images/background-login.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}

.login-form-wrap {
    background-color: #fff;
    padding: 30px 40px;
    border-radius: 8px;
    .el-form-item {
        width: 300px;
    }
    .title  {
        color: rgb(192,196,204);
        text-align: center;
        font-size: 12px;
        margin-bottom: 10px;
    }

    .el-button {
        width: 100%;
    }

    .checkCode-wrap {
        display: flex;
        width: 100%;
        .el-input {
            flex: 1;
            width: auto;
        }
    }
}
</style>