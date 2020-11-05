<template>
  <a-list
    size="large"
    rowKey="id"
    :loading="loading"
    itemLayout="vertical"
    :dataSource="data"
  >
    <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
      <template slot="actions">
        <icon-text type="star-o" :text="item.star" />
        <icon-text type="like-o" :text="item.like" />
        <icon-text type="message" :text="item.message" />
      </template>
      <a-list-item-meta>
        <a slot="title" href="https://devteamvietnam.github.io/vue-press-page/">{{ item.title }}</a>
        <template slot="description">
          <span>
            <a-tag>DevTeamVietNam</a-tag>
            <a-tag>Vue Admin</a-tag>
          </span>
        </template>
      </a-list-item-meta>
      <article-list-content :description="item.description" :owner="item.owner" :avatar="item.avatar" :href="item.href" :updateAt="item.updatedAt" />
    </a-list-item>
    <div slot="footer" v-if="data.length> 0" style="text-align: center; margin-top: 16px;">
      <a-button  :loading="loadingMore">Load more</a-button>
    </div>
  </a-list>
</template>

<script>
import  ArticleListContent   from '@/components/ArticleListContent'
export default {
    name: 'Article',
    data() {
        return {
            loading: true,
            loadingMore: false,
            apiData: [
               {
                id: '3e2cb209-1b61-46a5-9a83-7aeca4e3d503',
                avatar: '',
                owner: 'Ivan lucas',
                content: 'content',
                star: 1,
                percent: 10,
                like: 10,
                message: 'message',
                description: 'Update Repository on github',
                href: 'https://github.com/Devteamvietnam/vue-admin',
                title: 'Update Project',
                updatedAt: '2020-11-04',
                members: [
                    {
                    avatar: 'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat2&accessoriesType=Prescription02&hatColor=PastelYellow&facialHairType=BeardLight&facialHairColor=Black&clotheType=GraphicShirt&clotheColor=Blue03&graphicType=Skull&eyeType=Default&eyebrowType=SadConcernedNatural&mouthType=Concerned&skinColor=Tanned',
                    name: 'Ivan lucas',
                    id: 'Leader'
                    }
                ],
                activeUser: 10,
                newUser: 10,
                cover: ''
            }
          ],
          data: []
        }
    },
    components: {
        ArticleListContent
    },
    created() {
        this.apiData.forEach(datas => {
            this.data.push(datas)
            this.loading= false
        })
    }
}
</script>