<template>
<user-layout>
    <div class="top">
        <div class="header">
            <img alt="logo" class="logo" src="@/assets/img/logo.png" />
            <span class="title">{{ systemName }}</span>
        </div>
        <div class="desc">The Platform Admin With Vue</div>
    </div>
    <div class="login">
        <a-form-model @submit="handleSubmit" :model="user" @submit.native.prevent>
            <a-form-model-item>
                <a-input autocomplete="autocomplete" size="large" allow-clear type="email" id="username" ref="username" placeholder="Email" v-model="user.username" required>
                    <a-tooltip slot="suffix" title="Using email to login">
                        <a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
                    </a-tooltip>
                    <a-icon slot="prefix" type="user" />
                </a-input>
            </a-form-model-item>
            <a-form-model-item>
                <a-input-password size="large" id="password" ref="password" allow-clear placeholder="Password" autocomplete="autocomplete" type="password" required v-model="user.password">
                    <a-icon slot="prefix" type="lock" />
                </a-input-password>
            </a-form-model-item>
            <div>
                <a-checkbox v-model="rememberMe">Remember me</a-checkbox>
                <a style="float: right" @click="toForgot">Forgot password</a>
            </div>
            <a-form-model-item>
                <a-button :loading="logging" style="width: 100%; margin-top: 24px" size="large" html-type="submit" :disabled="user.username === '' || user.password === ''" type="primary">Log in</a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</user-layout>
</template>

<script>
import UserLayout from '@/layouts/UserLayout'
import User from '@/service/login/user'
import {
    timeFix
} from '@/utils/util'
export default {
    name: 'Login',
    data() {
        return {
            logging: false,
            error: '',
            rememberMe: false,
            user: new User('', '', ),
        }
    },
    components: {
        UserLayout
    },
    computed: {
        systemName() {
            return this.$store.state.setting.systemName
        },
    },
    methods: {
        handleSubmit() {
            if (this.user.username && this.user.password) {
                localStorage.setItem('rememberMe', this.user.username, {
                    expires: 30
                })
                this.$store
                    .dispatch('auth/login', this.user)
                    .then(() => {
                        this.$notification.success({
                            message: 'Login successfully',
                            description: `${timeFix()}，Welcome Back Bro!`,
                        })
                        this.$router.push('/admin/dashboard/workplace')
                    })
                    .catch((error) => {
                        if (error.response) {
                            if (error.response.status === 401) {
                                this.$notification.error({
                                    message: 'Error',
                                    description: 'Email or Password not found. Please try again',
                                })
                            } else if (error.response.status === 404) {
                                this.$notification.error({
                                    message: 'Error',
                                    description: 'Network error, Not Found. Please try again',
                                })
                            }
                        } else if (error.response.status === 400) {
                            this.$notification.error({
                                message: 'Error',
                                description: 'The server responded. Please try again',
                            })
                        }
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        },
        toRegister() {
            this.$router.push('/register')
        },
        toForgot() {
            this.$router.push('/forgot')
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

    .login {
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
