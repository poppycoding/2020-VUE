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
      <span class="custom-tree-node" slot-scope="{ node, data }" style="display: flex; justify-content: space-between;width: 100%">
        <span>{{ node.label }}</span>
        <span>
          <el-button
                  @click="() => showSave(data)"
                  size="mini"
                  style="padding: 1px"
                  type="primary"
          >
            添加部门
          </el-button>
          <el-button
                  @click="() => handleDelete(data)"
                  size="mini"
                  style="padding: 1px"
                  type="danger"
          >
            删除部门
          </el-button>
        </span>
      </span>
        </el-tree>
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
                }
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
                console.log(data)
            },
            handleDelete(data) {
                console.log(data)
            }
        }
    };
</script>

<style scoped></style>
