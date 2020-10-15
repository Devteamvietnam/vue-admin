<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <!-- <a-avatar class="avatar" size="small" shape="circle" :src="user.avatar" /> -->
      <!-- <span class="name">{{ user.name }}</span> -->
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
      <a-menu-item>
        <a-icon type="user" />
        <span>Personal Center</span>
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
  computed: {},
  methods: {}
}
</script>

<style lang="less">
.header-avatar {
  display: inline-flex;
  .avatar,
  .name {
    align-self: center;
  }
  .avatar {
    margin-right: 8px;
  }
  .name {
    font-weight: 500;
  }
}
.avatar-menu {
  width: 150px;
}
</style>
