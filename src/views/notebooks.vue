<template>
  <div class="notebooks">
    <div class="crumbs">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-document"></i> 笔记本</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-row>
        <el-button type="primary" @click='addNotebook'>新建笔记</el-button>
        <el-input
          style="width:300px;float:right"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchMessage">
        </el-input>
      </el-row>
      <br>
      <el-table
        :data="tableData|pagination(searchMessage,currentPage,pageSize)"
        :border='true'
        style="width: 100%">
        <el-table-column
          prop="title"
          align="center"
          label="笔记名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="updatedAt"
          align="center"
          label="创建日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="noteCounts"
          align="center"
          label="笔记数">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-pagination
        background
        align='right'
        :page-size="pageSize"
        layout="prev, pager, next"
        @current-change='handleCurPageChange'
        :total="tableData|total(searchMessage)">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import NOTEBOOK from '@/apis/notebook'
export default {
  data() {
    return {
      searchMessage: "",
      tableData: [],
      currentPage: 1,
      pageSize: 7
    }
  },
  filters:{
    pagination(tableData,searchMessage,currentPage,pageSize){
      let offset = (currentPage - 1) * pageSize;//当前页第一条的索引
      let data=(offset + pageSize >= tableData.length) ? tableData.filter(item=>!searchMessage || item.title.toLowerCase().includes(searchMessage.toLowerCase())).slice(offset, tableData.length) : tableData.filter(item=>!searchMessage || item.title.toLowerCase().includes(searchMessage.toLowerCase())).slice(offset, offset + pageSize);
      return data
    },
    total(tableData,searchMessage){
      let originData = tableData.filter(item=>!searchMessage || item.title.toLowerCase().includes(searchMessage.toLowerCase()))
      console.log(originData.length)
      return originData.length || 0
    }
  },
  created(){
    NOTEBOOK.getAll().then(res=>{
      // console.log(res)
      this.tableData = res.data.reverse()
    })
  },
  methods: {
    addNotebook() {
      this.$prompt('请输入笔记本标题', {title: '新建笔记本'}).then(res=>{
        let title = res.value
        NOTEBOOK.add({title}).then(res=>{
          this.$message.success('创建成功')
          NOTEBOOK.getAll().then(res=>{
            this.tableData = res.data.reverse()
          })
        })
      })
    },
    handleEdit(notebookId) {
      this.$prompt('修改笔记本标题', {title: '修改笔记本'}).then(res=>{
        let title = res.value
        NOTEBOOK.update(notebookId, {title}).then(res=>{
          this.$message.success('修改成功')
          this.tableData.filter(item=>item.id===notebookId)[0].title = title
        })
      })
    },
    handleDelete(notebookId) {
      NOTEBOOK.delete(notebookId).then(res=>{
        this.$message.success('删除成功')
        this.tableData = this.tableData.filter(item=>item.id !==notebookId)
      }).catch(err=>{
        this.$message.warning(err.msg);
      })
    },
    handleCurPageChange(curpage){
      this.currentPage = curpage
    }
  }

}
</script>

<style scoped lang="stylus">

</style>