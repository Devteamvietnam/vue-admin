<template>
  <div class="exception-page">
    <div class="img">
      <img :src="config[type].img" />
      <div class="content">
        <h1>{{ config[type].title }}</h1>
        <div class="desc">{{ config[type].desc }}</div>
        <div class="action">
          <a-button type="primary" class="backHome" @click="backHome">Back to home</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Config from './typeConfig'

export default {
  name: 'ExceptionPage',
  props: ['type', 'homeRoute'],
  data() {
    return {
      config: Config,
    }
  },
  methods: {
    backHome() {
      if (this.homeRoute) {
        this.$router.push(this.homeRoute)
      }
      this.$emit('backHome', this.type)
    },
  },
}
</script>

<style lang="less" scoped>
.exception-page {
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: @base-bg-color;
  .img {
    padding-right: 100px;
    zoom: 1;
    img {
      max-width: 500px;
    }
  }
  .content {
    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .desc {
      color: @text-color-second;
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}
@media screen and (max-width: 769px) {
  .exception-page {
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @base-bg-color;
    .img {
      padding-right: 20px;
      zoom: 1;
      img {
        max-width: 250px;
        margin-left: 50px;
      }
    }
    .content {
      h1 {
        color: #434e59;
        font-size: 50px;
        font-weight: 500;
        line-height: 80px;
        margin-bottom: 30px;
        text-align: center;
      }
      .desc {
        color: @text-color-second;
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 16px;
        text-align: center;
      }
      .backHome {
        margin-left: 115px;
      }
    }
  }
}
</style>
