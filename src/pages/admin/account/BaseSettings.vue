<template>
  <div class="account-settings-info-view">
    <a-row :gutter="12">
      <a-col :md="12" :lg="16">

        <a-form layout="vertical">
          <a-form-item
            label="Nickname"
          >
            <a-input placeholder="Give yourself a name" />
          </a-form-item>
          <a-form-item
            label="Bio"
          >
            <a-textarea rows="4" placeholder="You are not alone."/>
          </a-form-item>

          <a-form-item
            label="Email"
            :required="false"
          >
            <a-input placeholder="exp@admin.com"/>
          </a-form-item>
          <a-form-item
            label="Password"
            :required="false"
          >
            <a-input placeholder="h3gSbecd"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary">Update</a-button>
            <a-button style="margin-left: 8px">Canel</a-button>
          </a-form-item>
        </a-form>

      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="option.img"/>
        </div>
      </a-col>

    </a-row>

    <avatar-modal ref="modal" @ok="setavatar"/>

  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
export default {
  data () {
    return {
      preview: {},
       option: {
         img:'https://avatars3.githubusercontent.com/u/55986641?s=460&u=2b38c969e4e0c6f56a6052112c14383408f9e2a3&v=4',
         info: true,
         size: 1,
         outputType:'jpg',
         canScale: false,
         autoCrop: true,
         // The width and height will only take effect when the automatic screenshot is turned on
         autoCropWidth: 180,
         autoCropHeight: 180,
         fixedBox: true,
         // Turn on width and height ratio
         fixed: true,
         fixedNumber: [1, 1]
       }
    }
  },
  components: {AvatarModal},
  methods: {
    setavatar (url) {
      this.option.img = url
    }
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>