<template>
  <user-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo.png" />
        <span class="title">{{systemName}}</span>
      </div>
      <div class="desc">The Platform Admin With Vue</div>
    </div>
    <div class="login">
      <a-form-model @submit="handleSubmit" :model="user" @submit.native.prevent>
        <a-tabs size="large" :tabBarStyle="{textAlign:'center'}" style="padding: 0 2px;">
          <a-tab-pane tab="Login" key="1">
            <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
            <a-form-model-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                id="email"
                ref="email"
                placeholder="email"
                v-model="user.email"
                required
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-input
                size="large"
                id="password"
                ref="password"
                placeholder="password"
                autocomplete="autocomplete"
                type="password"
                required
                v-model="user.password"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-model-item>
          </a-tab-pane>
        </a-tabs>
        <div>
          <a-checkbox :checked="false" >Remember me</a-checkbox>
          <a style="float: right" @click="toForgot">Forgot password</a>
        </div>
        <a-form-model-item>
          <a-button 
          :loading="logging" 
          style="width: 100%;margin-top: 24px" 
          size="large" html-type="submit"
          :disabled="user.email === '' || user.password === ''"
          type="primary">Log in</a-button>
        </a-form-model-item>
        <div style="width: 100%;margin-top: 24px">
          Other login
          <a-icon class="icon" type="github" />
          <a-icon class="icon" type="facebook" />
          <a-icon class="icon" type="google" />
          <a style="float: right" @click="toRegister" >Register account</a>
        </div>
      </a-form-model>
    </div>
  </user-layout>
</template>

<script>
import UserLayout from '@/layouts/UserLayout'
export default {
  name: 'Login',
    data () {
    return {
      logging: false,
      error: '',
      user: {
        email: '',
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
    handleSubmit() {
      console.log(this.user);
    },
    toRegister() {
      this.$router.push('/register')
    },
    toForgot() {
      this.$router.push('/forgot')
    }
  }
}
</script>

<style lang="less" scoped>
  .common-layout{
    .top {
      text-align: center;
      .header {
        height: 38px;
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
    .login{
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