<template>
  <a-dropdown :trigger="['click']" v-model="show">
    <div slot="overlay">
      <a-spin :spinning="loading">
        <a-tabs class="dropdown-tabs" :tabBarStyle="{ textAlign: 'center' }" :style="{ width: '297px' }">
          <a-tab-pane tab="Notification" key="1">
            <a-list class="tab-pane">
              <a-list-item>
                <a-list-item-meta title="You have received 14 new weekly reports" description="One year ago">
                  <a-avatar style="background-color: white" slot="avatar" src="https://vuejs.org/images/logo.png" />
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta
                  title="Qu Nini you recommended has passed the third round of interview"
                  description="One year ago"
                >
                  <a-avatar style="background-color: white" slot="avatar" src="https://vuejs.org/images/logo.png" />
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta
                  title="This template can distinguish multiple notification types"
                  description="One year ago"
                >
                  <a-avatar style="background-color: white" slot="avatar" src="https://vuejs.org/images/logo.png" />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane tab="Message" key="2">
            <a-list class="tab-pane"></a-list>
          </a-tab-pane>
          <a-tab-pane tab="to do" key="3">
            <a-list class="tab-pane"></a-list>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </div>
    <span @click="fetchNotice" class="header-notice">
      <a-badge class="notice-badge" count="12">
        <a-icon :class="['header-notice-icon']" type="bell" />
      </a-badge>
    </span>
  </a-dropdown>
</template>

<script>
export default {
  name: 'HeaderNotice',
  data() {
    return {
      loading: false,
      show: false
    }
  },
  computed: {},
  methods: {
    fetchNotice() {
      if (this.loading) {
        this.loading = false
        return
      }
      this.loadding = true
      setTimeout(() => {
        this.loadding = false
      }, 1000)
    }
  }
}
</script>
