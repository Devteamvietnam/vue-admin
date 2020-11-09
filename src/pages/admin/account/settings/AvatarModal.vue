<template>
<a-modal :title="$t('avatar.title')" :visible="visible" :maskClosable="false" :confirmLoading="confirmLoading" :width="800" :footer="null" @cancel="cancelHandel">
    <a-row>
        <a-col :xs="24" :md="12" :style="{height: '400px'}">
            <vue-cropper ref="cropper" :img="options.img" :info="true" :autoCrop="options.autoCrop" :autoCropWidth="options.autoCropWidth" :autoCropHeight="options.autoCropHeight" :fixedBox="options.fixedBox" @realTime="realTime">
            </vue-cropper>
        </a-col>
        <a-col :xs="24" :md="12" :style="{height: '350px'}">
            <div class="avatar-upload-preview">
                <img :src="previews.url" :style="previews.img" />
            </div>
        </a-col>
    </a-row>
    <br>
    <a-row>
        <a-col :lg="2" :md="2">
            <a-upload name="file" :beforeUpload="beforeUpload" :showUploadList="false">
                <a-button icon="upload">{{$t('avatar.select')}}</a-button>
            </a-upload>
        </a-col>
        <a-col :lg="{span: 1, offset: 3}" :md="2">
            <a-button icon="plus" @click="changeScale(1)" />
        </a-col>
        <a-col :lg="{span: 1, offset: 1}" :md="2">
            <a-button icon="minus" @click="changeScale(-1)" />
        </a-col>
        <a-col :lg="{span: 1, offset: 1}" :md="2">
            <a-button icon="undo" @click="rotateLeft" />
        </a-col>
        <a-col :lg="{span: 1, offset: 1}" :md="2">
            <a-button icon="redo" @click="rotateRight" />
        </a-col>
        <a-col :lg="{span: 2, offset: 5}" :md="2">
            <a-button type="primary" @click="finish('blob')">{{$t('avatar.save')}}</a-button>
        </a-col>
    </a-row>
</a-modal>
</template>

<script>
import {
    VueCropper
} from 'vue-cropper'
export default {
    name: 'AvatarModal',
    i18n: require('./i18n'),
    data() {
        return {
            visible: false,
            id: null,
            confirmLoading: false,
            fileList: [],
            uploading: false,
            options: {
                img: '',
                autoCrop: true,
                autoCropWidth: 200,
                autoCropHeight: 200,
                fixedBox: true
            },
            previews: {}
        }
    },
    components: {
        VueCropper
    },
    methods: {
        edit(id) {
            this.visible = true
            this.id = id
            /* Get the original avatar */
        },
        close() {
            this.id = null
            this.visible = false
        },
        cancelHandel() {
            this.close()
        },
        changeScale(num) {
            num = num || 1
            this.$refs.cropper.changeScale(num)
        },
        rotateLeft() {
            this.$refs.cropper.rotateLeft()
        },
        rotateRight() {
            this.$refs.cropper.rotateRight()
        },
        beforeUpload(file) {
            const reader = new FileReader()
            // Convert Array Buffer to blob, if it is base64, no need
            // Convert to base64
            reader.readAsDataURL(file)
            reader.onload = () => {
                this.options.img = reader.result
            }
            // Convert to blob
            // reader.readAsArrayBuffer(file)
            return false
        },
        // Upload picture (click the upload button)
        finish(type) {
            const formData = new FormData()
            // output
            if (type === 'blob') {
                this.$refs.cropper.getCropBlob((data) => {
                    const img = window.URL.createObjectURL(data)
                    this.model = true
                    this.modelSrc = img
                    formData.append('file', data, this.fileName)
                })
            } else {
                this.$refs.cropper.getCropData((data) => {
                    this.model = true
                    this.modelSrc = data
                })
            }
        },
        okHandel() {
            const vm = this

            vm.confirmLoading = true
            setTimeout(() => {
                vm.confirmLoading = false
                vm.close()
                vm.$message.success('Avatar uploaded successfully')
            }, 2000)
        },
        realTime(data) {
            this.previews = data
        }
    }
}
</script>

<style lang="less" scoped>
.avatar-upload-preview {
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    width: 180px;
    height: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
    }
}
</style>
