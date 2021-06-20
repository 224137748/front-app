<template>
  <div>
    <el-form class="login-form" :rules="rules">
      <el-form-item props="email">
        <span>
          <i class="el-icon-mobile" />
        </span>
        <el-input placeholder="用户名" />
      </el-form-item>

      <el-form-item>
        <span>
          <i class="el-icon-lock" />
        </span>
        <el-input placeholder="密码" />
      </el-form-item>

      <el-form-item>
        <el-input placeholder="验证码" />
        <img draggable="false" @click="updateCaptcha" :src="captchaUrl" alt="" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  layout: 'login',
  data () {
    return {
      rules: [],
      captchaUrl: '/api/captcha?t_=' + Date.now()
    };
  },
  methods: {
    updateCaptcha () {
      this.captchaUrl = '/api/captcha?t_=' + Date.now();
    }
  }
};
</script>
<style lang="stylus">
.login-form
  width 800px
  margin 50px auto
</style>
