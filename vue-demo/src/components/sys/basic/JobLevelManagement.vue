<!--suppress HtmlUnknownTag -->
<template>
    <div>
        <div>
            <el-input class="jobLevelAdd" placeholder="添加职称..." prefix-icon="el-icon-plus" size="small"
                      v-model="jobLevel.name"></el-input>
            <el-select placeholder="职称等级" size="small" style="margin: 0 5px" v-model="jobLevel.level">
                <el-option :key="item.label" :label="item.label" :value="item.value" v-for="item in jobLevels">
                </el-option>
            </el-select>
            <el-button @click="handleSave" icon="el-icon-plus" size="small" type="primary">添加</el-button>
        </div>
        <div>
            <el-table :data="data" @selection-change="handleSelectionChange" border class="jobLevelTable" stripe>
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column label="编号" prop="id" width="55"></el-table-column>
                <el-table-column label="职位名称" prop="name" width="180"></el-table-column>
                <el-table-column label="职位级别" prop="level" width="180"></el-table-column>
                <!-- 布尔值enabled没法直接使用prop展示控制,这里可以和下面的操作列一样,通过template自定义处理column -->
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
                        <el-tag type="danger" v-else>禁用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="创建日期" prop="createAt" width="150"></el-table-column>
                <el-table-column label="操作">
                    <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
                    <template slot-scope="scope">
                        <el-button @click="showEdit(scope.row)" size="mini">编辑</el-button>
                        <el-button @click="handleDelete(scope.row)" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button :disabled="this.multiSelectRows.length===0" @click="handleBatchDelete" size="small"
                       style="margin-top: 8px" type="danger">批量删除
            </el-button>
        </div>
        <div>
            <!-- 编辑对话框 -->
            <el-dialog :visible.sync="dialogVisible" title="修改职位" width="30%">
                <div>
                    <el-tag type="success">职称名称</el-tag>
                    <el-input size="small" style="width: 200px; margin-left: 10px"
                              v-model="updateLevel.name"></el-input>
                </div>
                <div>
                    <el-tag type="success">职称级别</el-tag>
                    <el-select placeholder="请选择" size="small" style="width: 200px; margin-left: 10px; margin-top: 5px"
                               v-model="updateLevel.level">
                        <el-option :key="item.label" :label="item.label" :value="item.value" v-for="item in jobLevels">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-tag style="margin-right: 8px; margin-top: 5px" type="success">是否启用</el-tag>
                    <el-switch active-color="#13ce66" active-text="启用" inactive-color="#978787" inactive-text="禁用"
                               v-model="updateLevel.enabled"></el-switch>
                </div>
                <span class="dialog-footer" slot="footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button @click="handleEdit" size="small" type="primary">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "JobLevelManagement",
        data() {
            return {
                jobLevel: {
                    name: '',
                    level: ''
                },
                jobLevels: [
                    {label: '正高级', value: '正高级'},
                    {label: '副高级', value: '副高级'},
                    {label: '高级', value: '高级'},
                    {label: '中级', value: '中级'},
                    {label: '初级', value: '初级'},
                    {label: '员级', value: '员级'}
                ],
                data: [],
                updateLevel: {
                    name: '',
                    level: '',
                    enabled: '',
                },
                dialogVisible: false,
                multiSelectRows: []
            }
        },
        mounted() {
            this.listJobLevels();
        },
        methods: {
            listJobLevels() {
                this.getRequest("/sys/basic/levels").then(response => {
                    if (response) {
                        this.data = response.data;
                        this.jobLevel = {level: '', name: ''}
                    }
                })
            },
            handleSave() {
                if (this.jobLevel.name && this.jobLevel.level) {
                    this.postRequest("/sys/basic/levels", this.jobLevel).then(response => {
                        if (response.code === 200) {
                            this.listJobLevels();
                        }
                    })
                } else {
                    this.$message.error('职称信息不可以为空!');
                }
            },
            handleDelete(row) {
                this.$confirm('删除职称: ' + row.name + ' 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/sys/basic/levels/" + row.id).then(response => {
                        if (response.code === 200) {
                            this.listJobLevels();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            showEdit(row) {
                Object.assign(this.updateLevel, row);
                this.dialogVisible = true;
            },
            handleEdit() {
                this.dialogVisible = false;
                this.putRequest("/sys/basic/levels", this.updateLevel).then(response => {
                    if (response.code === 200) {
                        this.listJobLevels();
                        this.dialogVisible = false;
                    }
                })

            },
            handleSelectionChange(rows) {
                this.multiSelectRows = rows;
            },
            handleBatchDelete() {
                this.$confirm('批量删除: ' + this.multiSelectRows.length + ' 条职称信息,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = [];
                    this.multiSelectRows.forEach(row => {
                        ids.push(row.id)
                    })
                    this.deleteRequest("/sys/basic/levels/", ids).then(response => {
                        if (response.code === 200) {
                            this.listJobLevels();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style>
    .jobLevelAdd {
        width: 300px;
        margin-right: 8px;
    }


    .jobLevelTable {
        width: 50%;
        margin-top: 10px;
    }
</style>