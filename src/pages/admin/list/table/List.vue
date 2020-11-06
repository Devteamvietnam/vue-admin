<template>
<a-card>
    <a-table bordered :row-selection="rowSelection" :columns="columns" :data-source="data" :record="data.id">
    </a-table>
</a-card>
</template>

<script>
const columns = [{
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        width: 200
    },
    {
        title: 'Age',
        dataIndex: 'age',
        sorter: true,
        width: 200
    },
    {
        title: 'Address',
        dataIndex: 'address',
        sorter: true,
    }
]

export default {
    name: 'Table',
    data() {
        return {
            apiData: [{
                    id: '1',
                    name: 'IvanLucas',
                    age: 'xx',
                    address: 'HCMC',
                },
                {
                    id: '2',
                    name: 'IvanLucas',
                    age: 'xx',
                    address: 'HCMC',
                },
            ],
            data: [],
            columns,
            selectedRowId: [], // Check here to configure the default column
        }
    },
    computed: {
        rowSelection() {
            const {
                selectedRowId
            } = this
            return {
                selectedRowId,
                onChange: this.onSelectChange,
                hideDefaultSelections: true,
                onSelection: this.onSelection,
            }
        },
    },
    methods: {
        onSelectChange(selectedRowId) {
            this.selectedRowId = selectedRowId
        },
        onDelete(id) {
            const data = [...this.data]
            this.data = data.filter((item) => item.id !== id)
        },
    },
    created() {
        this.apiData.forEach((list) => {
            list = Object.assign({}, list)
            this.data.push(list)
        })
    },
}
</script>
