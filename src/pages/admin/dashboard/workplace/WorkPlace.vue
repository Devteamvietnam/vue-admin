<template>
  <page-layout :avatar="avatar">
    <div slot="headerContent">
      <div class="title">{{timeFix}}，{{name}}，{{ welcome }}</div>
      <div>{{position}}</div>
    </div>
    <template>
      <a-row style="margin: 0 -12px">
        <a-col style="padding: 0 12px" :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card class="project-list" :loading="loading" style="margin-bottom: 24px;" :bordered="false" :title="$t('progress')" :body-style="{padding: 0}">
            <a slot="extra"></a>
            <div>
              <a-card-grid :key="project.id" v-for="project in projects">
                <a-card :bordered="false" :body-style="{padding: 0}">
                  <a-card-meta :description="project.desc">
                    <div slot="title" class="card-title">
                      <a-avatar :size="30" :src="project.img" />
                      <span>{{project.name}}</span>
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <a class="group">{{project.author}}</a>
                    <span class="datetime">{{project.created_date}}</span>
                  </div>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>
          <a-card :loading="loading" :title="$t('dynamic')" :bordered="false">
            <a-list>
              <a-list-item :key="active.id" v-for="active in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="active.img" />
                  <div slot="title" v-html="active.title" />
                  <div slot="description">{{active.description}}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :title="$t('organization')" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <div class="item-group">
              <a>DevTeam</a>
            </div>
          </a-card>
          <a-card :loading="loading" :title="$t('team')" :bordered="false">
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="team in teams" :key="team.id">
                  <a>
                    <a-avatar :size="30" :src="team.avatar"  />
                    <span class="member">{{name}}</span>
                    <span class="member">{{team.description}}
                      <img style="padding: 0 30px; max-height: 30px;" :xl="16" :lg="24" :md="24" :sm="24" :xs="24"  
                    :src="made">
                    </span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </template>
  </page-layout>
</template>

<script>
import { timeFix } from '@/utils/util'
import { welcome } from '@/utils/util'
import PageLayout from '@/layouts/PageLayout'
import {mapState} from 'vuex'
export default {
  name: "WorkPlace",
   i18n: require('./i18n'),
  data () {
    return {
      timeFix: timeFix(),
      welcome: welcome(),
      loading: true,
      visit: 'https://visitor-badge.glitch.me/badge?page_id=Ivanluca.Ivanluca',
      made: 'https://madewithlove.now.sh/vn?heart=true',
      name: '',
      position: 'Frontend Vue | DevTeamVietNam | VUE ADMIN',
      avatar: 'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat2&accessoriesType=Prescription02&hatColor=PastelYellow&facialHairType=BeardLight&facialHairColor=Black&clotheType=GraphicShirt&clotheColor=Blue03&graphicType=Skull&eyeType=Default&eyebrowType=SadConcernedNatural&mouthType=Concerned&skinColor=Tanned',
      apiProjects: [
         {
          id: '62bf3080-1daf-11eb-adc1-0242ac120002',
          name: 'Vue',
          img: 'https://vuejs.org/images/logo.png',
          created_date: '2020-11-3',
          desc: 'The Progressive JavaScript Framework',
          author: 'DevTeamVietNam'
        },
        {
          id: '99abd256-1daf-11eb-adc1-0242ac120002',
          img: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
          name: 'React',
          created_date: '2020-11-2',
          desc: 'React is an open-source, front end, JavaScript library for building user interfaces or UI components.',
          author: 'Ivan Lucas'
       },
        {
          id: 'a9d289ea-1daf-11eb-adc1-0242ac120002',
          img: 'https://spring.io/images/spring-initializr-4291cc0115eb104348717b82161a81de.svg',
          name: 'Spring boot',
          created_date: '2020-11-1',
          desc: 'The Progressive JavaScript Framework',
          author: 'Luca ku'
        },
      ],
      projects: [],
      apiActivites: [
         {
          id: 'bc2ca476-ad95-46af-b550-c2fb5803be07',
          img: '',
          title: 'Ivanlucas',
          description: 'Update workplace'
        },
        {
          id: 'dff6c01d-35ea-478d-b691-b2bf3886ae4f',
          img: '',
          title: 'this is title',
          description: 'this is description'
        }
      ],
      activities: [],
      apiTeam: [
        {
          id: '6d8d5720-6f6c-4330-b6b1-c4bbc61a898d',
          avatar: 'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat2&accessoriesType=Prescription02&hatColor=PastelYellow&facialHairType=BeardLight&facialHairColor=Black&clotheType=GraphicShirt&clotheColor=Blue03&graphicType=Skull&eyeType=Default&eyebrowType=SadConcernedNatural&mouthType=Concerned&skinColor=Tanned',
          name: 'Ivan Lucas',
          description: 'Leader'
        }
      ],
      teams: [],
    }
  },
  components: {
    PageLayout
  },
   mounted(){
    if(localStorage.getItem("fullname")) {
      this.name = localStorage.getItem('fullname')
    }
  },
  computed: {
    ...mapState('setting', ['lang'])
  },
  methods: {},
  created() {
      this.apiTeam.forEach(team => {
        this.teams.push(team)
        this.loading = false
      })
      this.apiProjects.forEach(project => {
        this.projects.push(project)
        this.loading = false
      })
       this.apiActivites.forEach(activities => {
        this.activities.push(activities)
        this.loading = false
      })
  } 
};
</script>


<style lang="less">
@import "index";
</style>
