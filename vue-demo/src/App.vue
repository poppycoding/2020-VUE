<template>
  <!-- views和components里面都是vue组件,只是区分views是页面组件,components里面是页面里的更细的组件   -->
  <div id="app">
    <!--
        eg: import导入组件,然后components注册为组件key:value(当k-v相同时可以省略简写),之后组件相当于一个html标签,template标签内写内容,
        但是最终渲染的时候template标签最终会去掉消失,因此component组件里必须只能有一个根标签,如果template里有两个div就会报错,当渲染时
        template取消掉,就会出现两个div不知道如何排序等问题报错
    -->
    <router-view />
  </div>
</template>

<style></style>
