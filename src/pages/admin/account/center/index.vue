<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src="avatar" />
            </div>
            <div class="username">{{ name }}</div>
            <div class="bio">{{welcome}}</div>
          </div>
          <div class="account-center-detail">
            <p><i class="title"></i>I Love Vue, React, Spring boot</p>
            <p><i class="group"></i> DevTeamVietNam</p>
            <p>
              <i class="address"></i>
              <span>HCMC City</span>
              <span> VietNam</span>
            </p>
          </div>
          <a-divider />

          <div class="account-center-tags">
            <div class="tagsTitle">Tags</div>
            <div>
              <template v-for="(tag, index) in tags">
                <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                  <a-tag :key="tag" :closable="index !== 0" :close="() => handleTagClose(tag)">{{
                    `${tag.slice(0, 20)}...`
                  }}</a-tag>
                </a-tooltip>
                <a-tag v-else :key="tag" :closable="index !== 0" :close="() => handleTagClose(tag)">{{ tag }}</a-tag>
              </template>
              <a-input
                v-if="tagInputVisible"
                ref="tagInput"
                type="text"
                size="small"
                :style="{ width: '78px' }"
                :value="tagInputValue"
                @change="handleInputChange"
                @blur="handleTagInputConfirm"
                @keyup.enter="handleTagInputConfirm"
              />
              <a-tag v-else @click="showTagInput" style="background: #fff; borderstyle: dashed">
                <a-icon type="plus" />New Tag
              </a-tag>
            </div>
          </div>
          <a-divider :dashed="true" />

          <div class="account-center-team">
            <div class="teamTitle">Team</div>
            <a-spin :spinning="teamSpinning">
              <div class="members">
                <a-row>
                  <a-col :span="12" v-for="(item, index) in teams" :key="index">
                    <a>
                      <a-avatar size="small" :src="item.avatar" />
                      <span class="member">{{ name }}</span>
                    </a>
                  </a-col>
                </a-row>
              </div>
            </a-spin>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card
          style="width: 100%"
          :bordered="false"
          :tabList="tabListNoTitle"
          :activeTabKey="noTitleKey"
          @tabChange="(key) => handleTabChange(key, 'noTitleKey')"
        >
          <article-page v-if="noTitleKey"></article-page>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ArticlePage } from './page'
import { welcome } from '@/utils/util'
export default {
  data() {
    return {
      tags: ['Dev', 'Devteam', 'Ivan', 'Vue'],
      welcome: welcome(),
      tagInputVisible: false,
      tagInputValue: '',
      name: '',
      avatar:
        'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat2&accessoriesType=Prescription02&hatColor=PastelYellow&facialHairType=BeardLight&facialHairColor=Black&clotheType=GraphicShirt&clotheColor=Blue03&graphicType=Skull&eyeType=Default&eyebrowType=SadConcernedNatural&mouthType=Concerned&skinColor=Tanned',
      apiTeam: [
        {
          id: '6d8d5720-6f6c-4330-b6b1-c4bbc61a898d',
          avatar:
            'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat2&accessoriesType=Prescription02&hatColor=PastelYellow&facialHairType=BeardLight&facialHairColor=Black&clotheType=GraphicShirt&clotheColor=Blue03&graphicType=Skull&eyeType=Default&eyebrowType=SadConcernedNatural&mouthType=Concerned&skinColor=Tanned',
          name: 'Ivan Lucas',
          description: 'Leader',
        }
      ],
      teams: [],
      teamSpinning: true,
      tabListNoTitle: [
        {
          key: 'article',
          tab: 'News',
        }
      ],
      noTitleKey: 'app',
    }
  },
  components: {
    ArticlePage
  },
  methods: {
    handleTabChange(key, type) {
      this[type] = key
    },
    handleTagClose(removeTag) {
      const tags = this.tags.filter((tag) => tag !== removeTag)
      this.tags = tags
    },
    showTagInput() {
      this.tagInputVisible = true
      this.$nextTick(() => {
        this.$refs.tagInput.focus()
      })
    },

    handleInputChange(e) {
      this.tagInputValue = e.target.value
    },

    handleTagInputConfirm() {
      const inputValue = this.tagInputValue
      let tags = this.tags
      if (inputValue && !tags.includes(inputValue)) {
        tags = [...tags, inputValue]
      }

      Object.assign(this, {
        tags,
        tagInputVisible: false,
        tagInputValue: '',
      })
    },
  },
  mounted() {
    if (localStorage.getItem('fullname')) {
      this.name = localStorage.getItem('fullname')
    }
  },
  created() {
    this.apiTeam.forEach((team) => {
      this.teams.push(team)
      this.teamSpinning = false
    })
  },
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    & > .avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }

    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }

  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
    }

    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
      background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
    }

    .title {
      background-position: 0 0;
    }
    .group {
      background-position: 0 -22px;
    }
    .address {
      background-position: 0 -44px;
    }
  }

  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }

  .account-center-team {
    .members {
      a {
        display: block;
        margin: 12px 0;
        line-height: 24px;
        height: 24px;
        .member {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
          max-width: 100px;
          vertical-align: top;
          margin-left: 12px;
          transition: all 0.3s;
          display: inline-block;
        }
        &:hover {
          span {
            color: #1890ff;
          }
        }
      }
    }
  }

  .tagsTitle,
  .teamTitle {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
  }
}
</style>