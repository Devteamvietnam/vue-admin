<template>
  <user-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo.png" />
        <span class="title">{{ systemName }}</span>
      </div>
      <div class="desc">The Platform Admin With Vue</div>
    </div>
    <div class="forgot">
      <a-form-model>
        <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px" />
        <a-form-model-item>
          <a-input
            autocomplete="autocomplete"
            size="large"
            allow-clear
            placeholder="Email"
            ref="email"
            id="email"
            v-model="forgot.email"
          >
            <a-icon slot="prefix" type="mail" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button :loading="logging" style="width: 100%" size="large" htmlType="submit" type="primary">Send</a-button>
        </a-form-model-item>
        <div>
          <a style="float: right" @click="toLogin">Login account</a>
        </div>
      </a-form-model>
    </div>
  </user-layout>
</template>

<script>
import UserLayout from '@/layouts/UserLayout'
export default {
  name: 'Login',
  data() {
    return {
      logging: false,
      error: '',
      forgot: {
        email: '',
      },
    }
  },
  components: { UserLayout },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName
    },
  },
  methods: {
    toRegister() {
      this.$router.push('/register')
    },
    toLogin() {
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="less" scoped>
.common-layout {
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
  .forgot {
    width: 368px;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
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