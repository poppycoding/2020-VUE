<template>
    <div>
        <el-tabs type="card" v-model="activeName">
            <el-tab-pane label="部门管理" name="dev">
                <depManagement></depManagement>
            </el-tab-pane>
            <el-tab-pane label="职位管理" name="position">
                <positionManagement></positionManagement>
            </el-tab-pane>
            <el-tab-pane label="职称管理" name="level">
                <jobLevelManagement></jobLevelManagement>
            </el-tab-pane>
            <el-tab-pane label="奖惩规则" name="reward">
                <rewardsManagement></rewardsManagement>
            </el-tab-pane>
            <el-tab-pane label="权限管理" name="permission">
                <permissionManagement></permissionManagement>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    // 导入,然后components注册为组件,相当于一个html标签,因此component组件里必须只能有一个根标签,也即是template标签内只有一个,
    // 因为template标签最终会去掉消失,如果template里有两个div就会报错,因为没法渲染
    import DepManagement from "../../components/sys/basic/DepManagement";
    import JobLevelManagement from "../../components/sys/basic/JobLevelManagement";
    import PositionManagement from "../../components/sys/basic/PositionManagement";
    import RewardsManagement from "../../components/sys/basic/RewardsManagement";
    import PermissionManagement from "../../components/sys/basic/PermissionManagement";

    export default {
        name: "SysBasic",
        data() {
            return {
                activeName: 'position'
            }
        },
        // key:value,如果key和value一样可以省略
        components: {
            depManagement: DepManagement,
            jobLevelManagement: JobLevelManagement,
            positionManagement: PositionManagement,
            rewardsManagement: RewardsManagement,
            permissionManagement: PermissionManagement
        }

    }
</script>

<style scoped>

</style>