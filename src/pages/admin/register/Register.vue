<template>
  <user-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo.png" />
        <span class="title">{{systemName}}</span>
      </div>
      <div class="desc">The Platform Admin With Vue</div>
    </div>
    <div class="register">
      <a-form-model >
            <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
            <a-form-model-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="Username"
                id="username"
                ref="username"
                allow-clear
                required
                v-model="reg.username"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="Email"
                id="email"
                ref="email"
                allow-clear
                required
                v-model="reg.email"

              >
                <a-icon slot="prefix" type="mail" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-input
                size="large"
                placeholder="Password"
                autocomplete="autocomplete"
                type="password"
                ref="password"
                allow-clear
                id="password"
                required
                v-model="reg.password"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-model-item>
        <a-form-item>
          <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">Register</a-button>
        </a-form-item>
        <div>
          <a style="float: right" @click="toLogin" >Login account</a>
        </div>
      </a-form-model>
    </div>
  </user-layout>
</template>

<script>
import UserLayout from '@/layouts/UserLayout'
export default {
  name: 'Register',
    data () {
    return {
      logging: false,
      error: '',
      reg: {
        email: '',
        username: '',
        password: '',
      }
    }
  },
  components: {UserLayout},
  computed: {
    systemName () {
      return this.$store.state.setting.systemName
    }
  },
  methods: {
    toLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
  .common-layout{
    .top {
      text-align: center;
      .header {
        height: 28px;
        line-height: 40px;
        a {
          text-decoration: none;
        }
        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 33px;
          color: @title-color;
          font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: @text-color-second;
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .register{
      width: 368px;
      margin: 0 auto;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button{
          font-size: 14px;
        }
      }
      .icon {
        font-size: 24px;
        color: @text-color-second;
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;
        &:hover {
          color: @primary-color;
        }
      }
    }
  }
</style>