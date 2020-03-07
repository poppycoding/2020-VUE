<!--suppress HtmlUnknownTag -->
<template>
  <div>
    <div class="permissionSave">
      <el-input
        placeholder="请输入角色英文名..."
        size="small"
        v-model="role.name"
      >
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input
        placeholder="请输入角色中文名..."
        size="small"
        v-model="role.chineseName"
      ></el-input>
      <el-button
        @click="handleSave"
        icon="el-icon-plus"
        size="small"
        type="primary"
      >
        添加
      </el-button>
    </div>
    <div style="width: 700px; margin-top: 10px">
      <el-collapse @change="handleExpandChange" accordion v-model="activeName">
        <el-collapse-item
          :key="index"
          :name="role.id"
          :title="role.chineseName"
          v-for="(role, index) in roles"
        >
          <div>
            <el-card class="box-card">
              <div class="clearfix" slot="header">
                <span>可以访问的资源</span>
                <el-button
                  @click="handleDelete(role)"
                  icon="el-icon-delete"
                  style="float: right; padding: 3px 0; color: #dd144e"
                  type="text"
                ></el-button>
              </div>
              <div>
                <el-tree
                  :data="menuTree"
                  :default-checked-keys="checkedKeys"
                  :props="defaultProps"
                  node-key="id"
                  ref="tree"
                  show-checkbox
                ></el-tree>
                <div
                  @click="handleCancelUpdate"
                  style="display: flex; justify-content: flex-end"
                >
                  <el-button>
                    取消修改
                  </el-button>
                  <el-button
                    @click="handleUpdate(role.id, index)"
                    type="primary"
                  >
                    确认修改
                  </el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "PermissionManagement",
  data() {
    return {
      role: {
        name: "",
        chineseName: ""
      },
      roles: [],
      menuTree: [],
      // 折叠面板默认展开的name属性:role.id,这里设置-1代表默认不展开
      activeName: -1,
      checkedKeys: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  mounted() {
    this.listRoles();
  },
  methods: {
    listRoles() {
      this.getRequest("/sys/basic/roles").then(response => {
        if (response.data) {
          this.roles = response.data;
        }
      });
    },
    handleSave() {
      this.postRequest("/sys/basic/roles", this.role).then(response => {
        if (this.role.name && this.role.chineseName) {
          if (response.code === 200) {
            this.listRoles();
          }
        } else {
          this.$message.error("角色信息不能为空!");
        }
      });
    },
    handleDelete(role) {
      this.$confirm("删除职称: " + role.chineseName + " 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest("/sys/basic/roles/" + role.id).then(response => {
            if (response.code === 200) {
              this.listRoles();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 折叠面板的点击事件,参数是展开的时候name属性,关闭的时候也会触发点击事件,但是没有参数,所以这里只需要判断是展开的时候才请求资源
    handleExpandChange(rid) {
      if (rid) {
        // 树形控件添加默认选择项,这里一定要先请求获取默认选中的ids,然后再请求trees;
        // 否则在各个角色切换点击时候,容易出现后面点击展开的默认选择项使用上次点击的数据
        this.listMenuIdsByRoleId(rid);
        this.listMenuTrees();
      }
    },
    listMenuTrees() {
      this.getRequest("/sys/basic/roles/menuTree").then(response => {
        if (response.data) {
          this.menuTree = response.data;
        }
      });
    },
    listMenuIdsByRoleId(rid) {
      this.getRequest("/sys/basic/roles/menuIds/" + rid).then(response => {
        if (response.data) {
          this.checkedKeys = response.data;
        }
      });
    },
    handleUpdate(rid, index) {
      // vue中通过ref来获取html元素,也可以定义id像js中那样getElementById操作,这里定义了一个tree元素,但是因为在for循环里所以是数组
      let selectTree = this.$refs.tree[index];

      // 选中的叶子节点,true是leafOnly
      let checkedMenuIds = selectTree.getCheckedKeys(true);
      this.putRequest("/sys/basic/roles/" + rid, checkedMenuIds).then(
        response => {
          if (response.code === 200) {
            this.activeName = -1;
          }
        }
      );
    },
    handleCancelUpdate() {
      this.activeName = -1;
    }
  }
};
</script>

<style>
.permissionSave .el-input {
  width: 300px;
  margin-right: 8px;
}
</style>
