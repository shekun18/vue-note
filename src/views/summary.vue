<template>
  <div class="summary">
    <div class="crumbs">
      <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item><i class="el-icon-document"></i> 表单</el-breadcrumb-item> -->
          <el-breadcrumb-item><i class="el-icon-document"></i> 项目总结</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="preview" v-html="Content"></div>
      <textarea ref="mySummary" id="summary" cols="100" rows="40">
# vue后台项目总结记录
## 1. 项目涉及到的技术栈
- Vue：Vue、Vue-router、Vue-cli
- 插件：axios、element-ui、echart、v-charts、debounce、markdown-it
- CSS的预处理框架：stylus、less
- api：后台数据接口
## 2. 项目特点
- 组件化自适应布局
- 代码，简洁，易维护
- 实现性能优化
## 3. 项目具体结构
### 3.1 请求接口二次封装
- 使用 axios 进行 ajax 请求，在utils里面的request.js进行二次封装
- apis里面配置各个请求接口
### 3.2 vue公用组件部分
- layout为父组件，项目大部分页面都是基于这个 layout，里面包括Hearder.vue、Layout.vue、Sidebar.vue
- 这里使用了 vue-router 路由嵌套，layout的Content里配置router-view作为匹配组件的出口，增加或者修改页面只会影响 app-main这个主体区域。其它配置在 layout 中的内容如：侧边栏或者导航栏都是不会随着你主体页面变化而变化
### 3.3 业务组件部分
- login.vue使用element-ui实现基本功能
- notebooks.vue是笔记本列表页面，实现新建笔记本、编辑、删除、分页、列表搜索等功能
- notes.vue是笔记详情页面，它包含一个子组件notebar.vue，可以下拉选择某一笔记本，挑选这个笔记本下面具体某一篇文章，实现新建文章、重新编辑、删除至回收站，以及可以使用markdown语法进行预览功能
- notebar.vue是notes.vue的子组件，主要根据父组件notes.vue传过来的["notebookId","notes"]渲染出当前笔记本下的各篇文章，以及监听notes的改变，向notes.vue传送新的notes
- trash.vue是回收站页面，在笔记本详情页面删除的文章都会来到回收站页面，可以选择恢复或者彻底删除
- chart是使用v-charts实现的折线图、柱状图、南丁格尔玫瑰图
## 4. 项目相关npm依赖包
- element-ui： ui组件库
- axios：实现 ajax
- stylus、less: CSS 预处理框架
- stylus-loader
- v-charts、echarts：生成图表
- debounce：节流去抖
- markdown-it：编译markdown语法
## 5. 技术细节
### 5.1 项目初始化
- 全局安装 vue-cli，使用 vue-cli 创建 基于webpack模板的新项目，使用npm作为包管理工具
- 新建styles文件夹，引入reset.css文件，清除浏览器默认样式，新建index.css全局修改样式,并在main.js中引入
- 删除app.vue中的img
- 修改app.vue的css样式
### 5.2 Vue-admin基本布局
- 这个项目大部分页面都是基于这个 layout 的，除了个别页面如： login , 404, 401 等页面没有使用该layout。因此在路由表里设置layout为父组件，在layout的Content里配置router-view作为匹配组件的出口
- 这里使用了 vue-router 路由嵌套, 所以一般情况下，你增加或者修改页面只会影响 app-main这个主体区域。其它配置在 layout 中的内容如：侧边栏或者导航栏都是不会随着你主体页面变化而变化的
### 5.3 登录注册页基本布局
- 在项目开发中，为了开发效率以及统一性，我们的UI样式引用了element-ui。登录页面我们使用垂直水平居中布局。表单引入了element-ui的form表单组件，tab切换组件
### 5.4 登录注册页接口
- 之前封装了axios请求方法库，现在根据业务需求把各个功能api与页面相对应
```javascript
// 导入方法库
import request from '../utils/request'
// 配置URL
const URL = {
  REGISTER:'/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET_INFO: '/auth'
}
// 导出请求方法
export default {
  register({username,password}) {
    return request(URL.REGISTER,'POST',{username,password})
  },
  login({username,password}) {
    return request(URL.LOGIN,'POST',{username,password})
  },
  logout() {
    return request(URL.LOGOUT)
  },
  getInfo(){
    return request(URL.GET_INFO)
  }
}
```
### 5.5 笔记本列表页
- 搜索功能的实现
在搜索的input框中使用v-model="searchMessage"绑定
用vue的过滤器在表单`<el-table>`中绑定`:data="tableData|pagination(searchMessage,currentPage,pageSize)"`
在分页器`<el-pagination>`中绑定`:total="tableData|total(searchMessage)">`
然后在过滤器中进行处理
```javascript
pagination(tableData,searchMessage,currentPage,pageSize){
  let offset = (currentPage - 1) * pageSize;//当前页第一条的索引
  let data=(offset + pageSize >= tableData.length) ?
  tableData.filter(item=>!searchMessage || item.title.toLowerCase().includes(searchMessage.toLowerCase())).slice(offset, tableData.length)
  : tableData.filter(item=>!searchMessage || item.title.toLowerCase().includes(searchMessage.toLowerCase())).slice(offset, offset + pageSize);
  return data
}
```
```javascript
total(tableData,searchMessage){
  let originData = tableData.filter(item=>!searchMessage || item.title.toLowerCase().includes(searchMessage.toLowerCase()))
  console.log(originData.length)
  return originData.length || 0
}
```
- 删除按钮
```javascript
handleDelete(notebookId){
  NOTEBOOK.delete(notebookId).then(res=>{
    this.$message.success('删除成功')
    this.tableData = this.tableData.filter(item=>item.id !==notebookId)
  }).catch(err=>{
    this.$message.warning(err.msg);
  })
},
```
### 5.6 笔记本详情页
**这个页面算是这个项目的核心部分**
父组件是notes.vue 有一个子组件notebar.vue
**数据传送流程**
- 在实例创建完成后立即调用getNotebooks方法，得到笔记本notebooks和里面的内容**notes**，在el-select里面v-for数据循环notebooks，得到笔记本列表，通过在element-ui的el-select里面双向绑定`v-model="curNotebookId"`得到当前选择的笔记本ID**curNotebookId**
- 通过绑定向子组件传递**notes**和**curNotebookId**，子组件用props接收
- 子组件用v-for循环notes，渲染出当前笔记本下的文章列表，并且用$emit向父组件传当前具体的内容**curNote**
- 父组件监听接收，并且渲染在内容区

**其他细节**
- `v-if="show"` ,`v-else`实现预览切换。用markdown-it编译markdown语法
- 在保存状态上，用debounce实现函数节流，提升性能
### 5.7 回收站页面
- Trash.getAll()得到回收的数据，用v-for循环展示在el-card中
- 使用flex弹性布局
### 5.8 基本图表页
- chart.vue是父组件，里面有三个用v-charts实现的子组件
- 使用npm安装echart和v-charts
- 在main.js中部分引入
```javascript
import VCharts from 'v-charts'
Vue.use(VCharts)
import VeLine from 'v-charts/lib/line.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VeRing from 'v-charts/lib/ring.common'
Vue.component(VeLine.name, VeLine)
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VeRing.name, VeRing)
```
- chart.vue钟引入三个子组件，并且注册子组件
### 5.9 登录鉴权
- 登录鉴权目前主要有两种方法，一种是使用beforeEach方法，另一种是在axios响应拦截里面获取登录状态
#### axios响应拦截鉴权
```javascript
// 4.响应拦截
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      console.log(error.response.data.data[0])
      Message.error(error.response.data.data[0])
      route.push('/login');
      return
    } else {
      Message.error('系统错误');
    }
    return Promise.reject(error);
  }
);
```
#### beforeEach鉴权
- 缺点
1、依赖全局数据，处理起来麻烦
2、为了解决vuex刷新失败问题，需要在全局组件设置
3、如果身份过期，无法同步更新
- 在main.js中
```javascript
router.beforeEach((to,from,next)=>{
  Auth.getInfo().then(res=>{
    // 假如用户没有登录
    if(!res.isLogin && to.path !=="/login"){
      router.push("/login")
    }
  }).catch(err=>{
    router.push("/login")
  })
  next()
})
```
## 6. 项目中遇到的问题
在写笔记本详情页notes的时候，重写了一遍，在第一遍的时候因为逻辑问题写的不够好
**在第一版中的数据传送流程**
- 在实例创建完成后立即调用getNotebooks方法，得到笔记本notebooks，在el-select里面v-for数据循环notebooks，得到笔记本列表，通过在element-ui的el-select里面双向绑定`v-model="curNotebookId"`得到当前选择的笔记本ID**curNotebookId**
- 通过绑定向子组件传递**curNotebookId**，子组件用props接收
- 子组件用v-for循环notes，渲染出当前笔记本下的文章列表。使用Note.getAll得到**notes**，并且用$emit向父组件传当前具体的内容**curNote**
- 父组件监听接收，并且渲染在内容区

在这一版中，按删除的时候，删除成功但是数据无法更新，因为**notes**是在子组件中用Note.getAll得到的，父组件的删除无法更新子组件，必须要刷新页面才能更新。这时候我用了`history.go(0);`强刷页面。但是考虑到用户体验的问题，所以重写了笔记本详情页

**在第二版中的数据传送流程**
- 在实例创建完成后立即调用getNotebooks方法，得到笔记本notebooks和里面的内容**notes**，在el-select里面v-for数据循环notebooks，得到笔记本列表，通过在element-ui的el-select里面双向绑定`v-model="curNotebookId"`得到当前选择的笔记本ID**curNotebookId**
- 通过绑定向子组件传递**notes**和**curNotebookId**，子组件用props接收
- 子组件用v-for循环notes，渲染出当前笔记本下的文章列表，并且用$emit向父组件传当前具体的内容**curNote**
- 父组件监听接收，并且渲染在内容区

重写之后notes的获取方在父组件中，这样删除的时候就可以更新到子组件了
      </textarea>

    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
let    md = new MarkdownIt();
export default {
  data() {
    return {
      Content:''
    }
  },
  mounted() {
    this.handlePreview()
  },
  methods: {
    handlePreview(){
      this.Content = md.render(this.$refs.mySummary.innerHTML)
      console.log(this.$refs.mySummary.innerHTML)
    },
  }
}
</script>

<style scoped>
  #summary {
    visibility: hidden;
  }
</style>
