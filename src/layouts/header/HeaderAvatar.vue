<template>
<a-dropdown>
    <div v-if="name" class="header-avatar" style="cursor: pointer">
        <a-avatar :src="avatar" class="avatar" shape="circle" />
        <span class="name">{{ name }}</span>
    </div>
    <div v-else-if="!name" class="header-avatar" style="cursor: pointer">
        <a-avatar :src="avatar" class="avatar" shape="circle" />
        <span class="name">{{ defaultUsername }}</span>
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
        <a-menu-item>
            <router-link to="/admin/account/accountcenter">
                <a-icon type="user" />
                <span> Account center</span>
            </router-link>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item @click="handleLogout">
            <a-icon style="margin-right: 8px" type="poweroff" />
            <span>Sign out</span>
        </a-menu-item>
    </a-menu>
</a-dropdown>
</template>

<script>
import {
    Modal
} from 'ant-design-vue'
export default {
    name: 'HeaderAvatar',
    data() {
        return {
            avatar: 'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat2&accessoriesType=Prescription02&hatColor=PastelYellow&facialHairType=BeardLight&facialHairColor=Black&clotheType=GraphicShirt&clotheColor=Blue03&graphicType=Skull&eyeType=Default&eyebrowType=SadConcernedNatural&mouthType=Concerned&skinColor=Tanned',
            name: '',
            defaultUsername: 'Đinh Đức Thiện',
        }
    },
    computed: {},
    methods: {
        handleLogout() {
            Modal.confirm({
                title: 'Logout!',
                content: 'Do you want to log out now ?',
                onOk: () => {
                    this.$store.dispatch('auth/logout')
                    this.$router.push('/login')
                },
                onCancel() {},
            })
        },
    },
    mounted() {
        if (localStorage.getItem('fullname')) {
            this.name = localStorage.getItem('fullname')
        }
    },
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
