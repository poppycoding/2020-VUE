<!--suppress HtmlUnknownTag -->
<template>
  <div style="width: 500px">
    <el-input
      placeholder="请输入部门名称..."
      prefix-icon="el-icon-search"
      v-model="filterText"
    ></el-input>
    <el-tree
      :data="deps"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :props="defaultProps"
      ref="tree"
    >
      <span
        class="custom-tree-node"
        slot-scope="{ node, data }"
        style="display: flex; justify-content: space-between;width: 100%"
      >
        <span>{{ node.label }}</span>
        <span>
          <el-button
            @click="showSave(data)"
            size="mini"
            style="padding: 1px"
            type="primary"
          >
            添加部门
          </el-button>
          <el-button
            @click="handleDelete(data)"
            size="mini"
            style="padding: 1px"
            type="danger"
          >
            删除部门
          </el-button>
        </span>
      </span>
    </el-tree>
    <div>
      <!-- 新增部门对话框 -->
      <el-dialog :visible.sync="dialogVisible" title="新增部门" width="30%">
        <div>
          <table>
            <tr>
              <td>
                <el-tag style="margin-right: 8px;margin-bottom: 3px"
                  >上级部门
                </el-tag>
              </td>
              <td>{{ parentName }}</td>
            </tr>
            <tr>
              <td>
                <el-tag type="success">部门名称</el-tag>
              </td>
              <td>
                <el-input
                  placeholder="请输入部门名称"
                  v-model="dep.name"
                ></el-input>
              </td>
            </tr>
          </table>
        </div>
        <span class="dialog-footer" slot="footer">
          <el-button @click="dialogVisible = false" size="small">
            取 消
          </el-button>
          <el-button @click="handleSave" size="small" type="primary">
            确 定
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "DepManagement",
  data() {
    return {
      filterText: "",
      deps: [],
      // 默认是children和label,如果服务端返回的树形数据也是子级是children,展示的字段是label可以不用写这个defaultProps
      // 如果不是,则需要指定对应的key-value
      defaultProps: {
        children: "children",
        label: "name"
      },
      dialogVisible: false,
      dep: {
        name: "",
        parentId: ""
      },
      parentName: ""
    };
  },
  // 监控输入框中的filterText变化,然后调用filter方法filter-node-method也即是:filterNode
  watch: {
    filterText(input) {
      this.$refs.tree.filter(input);
    }
  },
  mounted() {
    this.listDepTrees();
  },
  methods: {
    listDepTrees() {
      this.getRequest("/sys/basic/deps/tree").then(response => {
        if (response.data) {
          this.deps = response.data;
        }
      });
    },
    // 当输入框变动时,自动调用filter方法,input是输入的值,node是树中的节点数据(从顶级到最低级的所有node依次调用)
    filterNode(input, node) {
      // 当输入为空时,返回true表示展示node,也即是整棵树
      if (!input) return true;
      // 当输入不为空时,判断节点的label也即是这里的name值是否包含输入的字符串,如果是返回true表示保留展示这个node节点
      return node.name.indexOf(input) !== -1;
    },
    showSave(data) {
      this.dialogVisible = true;
      this.parentName = data.name;
      this.dep.parentId = data.id;
    },
    // 递归动态判断新增的部门在哪,直接挂载到tree上,不需要刷新页面,否则刷新页面tree自动闭合,用户体验差
    addNewDepToDepTree(newDep, parentId, depTrees) {
      for (let i = 0; i < depTrees.length; i++) {
        let parentDep = depTrees[i];
        if (parentDep.id === parentId) {
          parentDep.children = parentDep.children.concat(newDep);
          this.parentName = "";
          this.dep.name = "";
          return;
        } else {
          // 递归调用,继续判断新增dep的parent位置,直接concat到tree树上
          this.addNewDepToDepTree(newDep, parentId, parentDep.children);
        }
      }
    },
    handleSave() {
      this.postRequest("/sys/basic/deps", this.dep).then(response => {
        if (response.code === 200) {
          this.dialogVisible = false;
          this.addNewDepToDepTree(response.data, this.dep.parentId, this.deps);
        }
      });
    },
    // 递归动态删除树上的部门
    deleteDepFromDepTree(id, depTrees) {
      for (let i = 0; i < depTrees.length; i++) {
        let depTree = depTrees[i];
        if (depTree.id === id) {
          depTrees.splice(i, 1);
          return;
        } else {
          // 递归调用,继续判断删除dep的parent位置,直接splice去掉
          this.deleteDepFromDepTree(id, depTree.children);
        }
      }
    },
    handleDelete(data) {
      if (data.children.length > 0) {
        this.$message({
          type: "error",
          message: "该部门有下级部门使用,暂时不能删除!"
        });
      } else {
        this.$confirm("删除部门: " + data.name + ",是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.deleteRequest("/sys/basic/deps/" + data.id).then(response => {
              if (response.code === 200) {
                this.deleteDepFromDepTree(data.id, this.deps);
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
  }
};
</script>

<style scoped></style>
