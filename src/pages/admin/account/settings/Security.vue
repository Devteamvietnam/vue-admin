<template>
<a-list itemLayout="horizontal" :dataSource="data">
    <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
            <a slot="title">{{ item.title }}</a>
            <span slot="description">
                <span class="security-list-description">{{ item.description }}</span>
                <span v-if="item.value"> : </span>
                <span class="security-list-value">{{ item.value }}</span>
            </span>
        </a-list-item-meta>
        <template v-if="item.actions">
            <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
        </template>

    </a-list-item>
</a-list>
</template>

<script>
export default {
    data() {
        return {
            data: [{
                    title: 'Account password',
                    description: 'Current password strength',
                    value: 'Strong',
                    actions: {
                        title: 'Modify',
                        callback: () => {
                            this.$message.info('This is a normal message')
                        }
                    }
                },
                {
                    title: 'Secret secured phone',
                    description: 'Binded phone',
                    value: '138****8293',
                    actions: {
                        title: 'Modify',
                        callback: () => {
                            this.$message.success('This is a message of success')
                        }
                    }
                },
                {
                    title: 'secret security issue',
                    description: 'secret security issue is not set, secret security issue can effectively protect account security',
                    value: '',
                    actions: {
                        title: 'setup',
                        callback: () => {
                            this.$message.error('This is a message of error')
                        }
                    }
                },
                {
                    title: 'Alternate mailbox',
                    description: 'Binded mailbox',
                    value: 'devteam******@gmail.com',
                    actions: {
                        title: 'Modify',
                        callback: () => {
                            this.$message.warning('This is message of warning')
                        }
                    }
                },
                {
                    title: 'MFA device',
                    description: 'Unbound MFA device, after binding, you can perform a second confirmation',
                    value: '',
                    actions: {
                        title: 'Binding',
                        callback: () => {
                            this.$message.info('This is a normal message')
                        }
                    }
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>
