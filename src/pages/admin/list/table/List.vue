<template>
<div class="app-container">
    <a-card>
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item>
                <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">Search</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">Reset</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="12" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" icon="el-icon-plus" size="mini">New</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single">Edit</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="multiple">Delete</el-button>
            </el-col>
        </el-row>

        <el-table v-loading="loading" :data="postList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column sortable label="Number" align="center" prop="postId" />
            <el-table-column label="Code" align="center" prop="postCode" />
            <el-table-column label="Name" align="center" prop="postName" />
            <el-table-column label="Sorting" align="center" prop="postSort" />
            <el-table-column label="Status" align="center" prop="status" />
            <el-table-column label="Create time" align="center" prop="createTime" width="180">
            </el-table-column>
            <el-table-column label="operation" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">Update</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" />
    </a-card>
</div>
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
            this.resetForm("queryForm");
            this.handleQuery();
        }
    },
    created() {
        this.apiPostList.forEach((list) => {
            this.postList.push(list)
        })
    }
}
</script>
