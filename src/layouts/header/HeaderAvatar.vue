<template>
  <a-dropdown>
    <div class="header-avatar"  style="cursor: pointer">
      <a-avatar :src="avatar" class="avatar"  shape="circle" />
      <span class="name"></span>
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
      <a-menu-item>
        <a-icon type="user" />
        <span>Personal center</span>
      </a-menu-item>
      <a-menu-item>
        <a-icon type="setting" />
        <span>Settings</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <a-icon style="margin-right: 8px;" type="poweroff" />
        <span>Sign out</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>

export default {
  name: 'HeaderAvatar',
  data () {
    return {
      avatar: 'https://avatars3.githubusercontent.com/u/55986641?s=460&u=2b38c969e4e0c6f56a6052112c14383408f9e2a3&v=4'
    }
  },
  computed: {
  },
  methods: {
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
