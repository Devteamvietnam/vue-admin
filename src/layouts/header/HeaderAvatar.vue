<template>
  <a-dropdown>
    <div class="header-avatar"  style="cursor: pointer">
      <a-avatar :src="avatar" class="avatar"  shape="circle" />
      <span class="name">{{name}}</span>
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
      <a-menu-item>
         <router-link to="/account/basicsettings">
        <a-icon type="user" />
        <span> Personal center</span>
        </router-link>
      </a-menu-item>
      <a-menu-item>
      <router-link to="/account/basicsettings">
        <a-icon type="setting" />
        <span> Settings</span>
      </router-link>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item  @click="handleLogout">
        <a-icon style="margin-right: 8px;" type="poweroff" />
        <span>Sign out</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { Modal } from 'ant-design-vue'
export default {
  name: 'HeaderAvatar',
  data () {
    return {
      avatar: 'https://avatars3.githubusercontent.com/u/55986641?s=460&u=2b38c969e4e0c6f56a6052112c14383408f9e2a3&v=4',
      name: ''
    }
  },
  computed: {
  },
  methods: {
    handleLogout () {
      Modal.confirm({
        title: 'Logout!',
        content: 'Do you want to log out now ?',
        onOk: () => {
         this.$auth.logout().then(() => {
          this.$router.push('/')  
          })
        },
        onCancel () {
          this.$router.push('/admin/dashboard/workplace')
        }
      })
    }
  },
  mounted(){
    if(localStorage.getItem('fullname')) {
      this.name = localStorage.getItem('fullname')
    }
  }
}
</script>

<style lang="less">
  .header-avatar{
    display: inline-flex;
    .avatar, .name{
      align-self: center;
    }
    .avatar{
      margin-right: 8px;
    }
    .name{
      font-weight: 500;
    }
  }
  .avatar-menu{
    width: 150px;
  }

</style>
