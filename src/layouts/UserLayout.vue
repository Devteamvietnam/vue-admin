<template>
<div class="common-layout">
    <div class="content">
        <slot></slot>
    </div>
    <page-footer :link-list="footerLinks" :copyright="copyright"></page-footer>
</div>
</template>

<script>
import PageFooter from '@/layouts/footer/PageFooter'
import {
    mapState
} from 'vuex'
export default {
    name: 'CommonLayout',
    components: {
        PageFooter
    },
    computed: {
        ...mapState('setting', ['footerLinks', 'copyright']),
    },
}
</script>

<style lang="less" scoped>
.common-layout {
    height: 100%;
    overflow: auto;
    background-image: url('~@/assets/background.svg');
    background-size: 100%;
    position: relative;

    .content {
        padding: 100px 0;
        flex: 1;

        @media (min-width: 528px) {
            padding: 300px 0 24px;
        }
    }
}
</style>
