<template>
  <a-card>
    <div>
      <a-table
        :columns="columns"
        :row-key="(record) => record.login.uuid"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <template slot="name" slot-scope="name"> {{ name.first }} {{ name.last }} </template>
        <template slot="location" slot-scope="location"> {{ location.city }} {{ location.country }} </template>
        <template slot="update">
          <a-button type="primary"> Update </a-button>
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import reqwest from 'reqwest'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    sorter: true,
    width: '20%',
    scopedSlots: { customRender: 'gender' },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: true,
  },
  {
    title: 'Location',
    dataIndex: 'location',
    sorter: true,
    scopedSlots: { customRender: 'location' },
  },
  {
    title: 'Update',
    scopedSlots: { customRender: 'update' },
  },
]

export default {
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
      selectedRowKeys: [],
      size: 'large'
    }
  },
  mounted() {
    this.fetch()
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    },
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      })
    },
    fetch(params = {}) {
      this.loading = true
      reqwest({
        url: 'https://randomuser.me/api',
        method: 'get',
        data: {
          results: 100,
          ...params,
        },
        type: 'json',
      }).then((data) => {
        const pagination = { ...this.pagination }
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 100
        this.loading = false
        this.data = data.results
        this.pagination = pagination
      })
    },
  },
}
</script>
<style lang="less" scoped>

</style>