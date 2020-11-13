<template>
<a-card>
    <el-row :gutter="10" class="mx8">
        <el-col :span="1.5">
            <el-button round icon="el-icon-refresh" size="mini" @click="resetQuery"></el-button>
        </el-col>
        <el-col :span="1.5">
            <el-button round icon="el-icon-plus" size="mini"></el-button>
        </el-col>
        <el-col :span="1.5">
            <el-button round icon="el-icon-delete" size="mini" :disabled="multiple"></el-button>
        </el-col>
    </el-row>

    <el-table class="table" border v-loading="loading" :data="postList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column sortable label="Number" align="center" prop="postId" />
        <el-table-column label="Code" align="center" prop="postCode" />
        <el-table-column label="Name" align="center" prop="postName" />
        <el-table-column sortable label="Sorting" align="center" prop="postSort" />
        <el-table-column label="Status" align="center" prop="status" />
        <el-table-column label="Create time" align="center" prop="createTime" width="180">
        </el-table-column>
        <el-table-column label="operation" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
                <el-button round size="mini" @click="handleUpdate(scope.row)">Update</el-button>
            </template>
        </el-table-column>
    </el-table>
</a-card>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            total: 0,
            showSearch: true,
            single: true,
            multiple: true,
            search: '',
            apiPostList: [{
                    postId: '1',
                    postCode: 'devteam',
                    postName: 'Devteam',
                    postSort: '1',
                    status: 'normal',
                    createTime: '2020-11-10',
                },
                {
                    postId: '2',
                    postCode: '007',
                    postName: 'Devteam',
                    postSort: '2',
                    status: 'quality',
                    createTime: '2020-11-10',
                }
            ],
            postList: [],
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                postCode: undefined,
                postName: undefined,
                status: undefined
            },
        }
    },
    methods: {
        cancel() {
            this.open = false
            this.reset()
        },
        reset() {
            this.form = {
                postId: undefined,
                postCode: undefined,
                postName: undefined,
                postSort: 0,
                status: "0",
                remark: undefined
            };
            this.resetForm("form")
        },
        handleQuery() {
            this.queryParams.pageNum = 1
        },
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.postId)
            this.single = selection.length != 1
            this.multiple = !selection.length
        },
        resetQuery() {
            window.location.reload()
        }
    },
    created() {
        this.apiPostList.forEach((list) => {
            this.postList.push(list)
        })
    }
}
</script>

<style lang="less" scoped>
.table {
    margin-top: 10px;
}
</style>
