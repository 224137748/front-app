<template>
  <div class="login-container">
    <el-form
      ref="registerForm"
      label-width="100px"
      class="login-form"
      :rules="rules"
      :model="form"
    >
      <div class="title-container">
        <img src="/vue.png" alt="" />
      </div>

      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item prop="captcha" label="验证码" class="captcha-container">
        <div class="captcha">
          <img :src="code.captcha" draggable="false" @click="resetCaptcha" alt="" />
        </div>
        <el-input v-model="form.captcha" placeholder="请输入验证码" />
      </el-form-item>

      <el-form-item prop="nickname" label="昵称">
        <el-input v-model="form.nickname" placeholder="请输入昵称" />
      </el-form-item>

      <el-form-item prop="passwd" label="密码">
        <el-input type="password" v-model="form.passwd" placeholder="请输入密码" />
      </el-form-item>

      <el-form-item prop="repasswd" label="确认密码">
        <el-input type="password" v-model="form.repasswd" placeholder="请再次输入密码" />
      </el-form-item>

      <el-form-item label="确认密码">
        <el-button type="primary" @click.native.prevent="handleRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import md5 from "md5";
export default {
  name: "Register",
  layout: "login",
  data() {
    return {
      form: {
        email: "snoopy_zuozuo@qq.com",
        nickname: "findream",
        passwd: "zhang44175",
        repasswd: "zhang44175",
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "请输入正确的邮箱格式" },
        ],
        captcha: [{ required: true, message: "请输入验证码" }],
        nickname: [{ required: true, message: "请输入昵称" }],
        passwd: [
          { required: true, pattern: /^[\w_-]{6,12}$/g, message: "请输入6-12位密码" },
        ],
        repasswd: [
          { required: true, message: "请再次输入密码" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.passwd) {
                callback(new Error("两次密码不一致"));
              }
              callback();
            },
          },
        ],
      },
      code: {
        captcha: "/api/captcha",
      },
    };
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          console.log("校验成功");
          // 发送注册请求
          const obj = {
            email: this.form.email,
            nickname: this.form.nickname,
            passwd: this.form.passwd,
            captcha: this.form.captcha,
          };

          const ret = await this.$http.post("/user/register", obj);
          if (ret.code === 0) {
            this.$alert("注册成功", {
              confirmButtonText: "去登陆",
              callback: () => {
                this.$router.push("/login");
              },
            });
          } else {
            console.log(ret);
            this.$message.error(ret.message ?? "接口请求错误");
          }
        } else {
          console.log("校验失败");
        }
      });
    },
    resetCaptcha() {
      this.code.captcha = "/api/captcha?t_=" + Date.now();
    },
  },
};
</script>
<style lang="less" scoped></style>
