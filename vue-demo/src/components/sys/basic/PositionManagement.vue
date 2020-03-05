<!--suppress HtmlUnknownTag -->
<template>
  <div>
    <div>
      <el-input
        class="positionAdd"
        placeholder="添加职位..."
        prefix-icon="el-icon-plus"
        size="small"
        v-model="position.name"
      ></el-input>
      <el-button
        @click="handleSave"
        icon="el-icon-plus"
        size="small"
        type="primary"
        >添加
      </el-button>
    </div>
    <div>
      <el-table
        :data="data"
        @selection-change="handleSelectionChange"
        border
        class="positionTable"
        stripe
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="编号" prop="id" width="55"></el-table-column>
        <el-table-column
          label="职位名称"
          prop="name"
          width="180"
        ></el-table-column>
        <el-table-column label="状态" width="150">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="创建日期"
          prop="createAt"
          width="150"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="showEdit(scope.$index, scope.row)" size="mini">
              编辑
            </el-button>
            <el-button
              @click="handleDelete(scope.$index, scope.row)"
              size="mini"
              type="danger"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 批量删除 -->
      <el-button
        :disabled="this.multiSelectRows.length === 0"
        @click="handleBatchDelete"
        size="small"
        style="margin-top: 8px"
        type="danger"
        >批量删除
      </el-button>
    </div>
    <!-- 编辑对话框 -->
    <el-dialog :visible.sync="dialogVisible" title="修改职位" width="30%">
      <div>
        <el-tag type="success">职位名称</el-tag>
        <el-input
          size="small"
          style="width: 200px; margin-left: 10px"
          v-model="updatePosition.name"
        ></el-input>
      </div>
      <div>
        <el-tag style="margin-right: 8px; margin-top: 5px" type="success">
          是否启用
        </el-tag>
        <el-switch
          active-color="#13ce66"
          active-text="启用"
          inactive-color="#978787"
          inactive-text="禁用"
          v-model="updatePosition.enabled"
        ></el-switch>
      </div>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button @click="handleEdit" size="small" type="primary">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PositionManagement",
  data() {
    return {
      position: {
        name: ""
      },
      data: [],
      dialogVisible: false,
      // 更新的对象,不可以复用上面的position,否则关联变化,页面数据也会变化
      updatePosition: {
        name: "",
        enabled: ""
      },
      // 多选数据
      multiSelectRows: []
    };
  },
  // vue声明周期钩子,用来初始化数据,vue2之前用的created函数,3.0之后用的mounted
  mounted() {
    // 数据驱动页面,当数据发生变化时,页面自动刷新
    this.listPositions();
  },
  methods: {
    // 列表: 初始化数据
    listPositions() {
      this.getRequest("/sys/basic/positions").then(response => {
        if (response.data) {
          this.data = response.data;
          this.position.name = "";
        }
      });
    },
    // 新增: 成功则加载数据
    handleSave() {
      if (this.position.name) {
        this.postRequest("/sys/basic/positions", this.position).then(
          response => {
            if (response.code === 200) {
              this.listPositions();
            }
          }
        );
      } else {
        this.$message.error("请输入职位名称!");
      }
    },
    // 删除: MessageBox弹框提醒,成功则加载数据
    handleDelete(index, row) {
      this.$confirm("删除职位: " + row.name + " 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest("/sys/basic/positions/" + row.id).then(
            response => {
              if (response.code === 200) {
                this.listPositions();
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑对话框: 不可以直接使用对象赋值,否则联动变化,点击取消时数据仍然是编辑输入的值,使用对象copy方法:assign
    showEdit(index, row) {
      // this.updatePosition = row;
      Object.assign(this.updatePosition, row);
      this.dialogVisible = true;
    },
    // 编辑: 成功则加载数据,隐藏对话框
    handleEdit() {
      this.putRequest("/sys/basic/positions", this.updatePosition).then(
        response => {
          if (response.code === 200) {
            this.listPositions();
            this.updatePosition.name = "";
            this.dialogVisible = false;
          }
        }
      );
    },
    handleSelectionChange(rows) {
      this.multiSelectRows = rows;
    },
    handleBatchDelete() {
      this.$confirm(
        "批量删除: " + this.multiSelectRows.length + " 条职位,是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let ids = [];
          this.multiSelectRows.forEach(row => {
            ids.push(row.id);
          });
          this.deleteRequest("/sys/basic/positions/", ids).then(response => {
            if (response.code === 200) {
              this.listPositions();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
.positionAdd {
  width: 300px;
  margin-right: 8px;
}

.positionTable {
  width: 45%;
  margin-top: 10px;
}
</style>
