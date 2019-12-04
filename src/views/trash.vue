<template>
  <div class="trash">
    <div class="container">
      <el-card class="box-card" v-for="(item, index) in trashList" :key="index">
        <div slot="header" class="clearfix">
          <span>{{item.title}}</span>
            <div class="button" style="float: right; padding: 3px 0">
              <el-tooltip class="item" effect="dark" content="彻底删除，不能恢复" placement="top-start">
                <i class="el-icon-delete"
                   @click="handleDelete(item.id)"
                   style="color: #f00;font-size: 18px;margin-right: 10px;cursor: pointer;"
                ></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="返回原笔记本" placement="top-start">
                <i class="el-icon-refresh"
                   @click="handleRevert(item.id)"
                  style="color: #21b1ed;font-size: 18px;cursor: pointer;"
                ></i>
              </el-tooltip>
            </div>
        </div>
        <div class="content">
          {{item.content}}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Trash from '@/apis/trash'
export default {
  data() {
    return {
      trashList: []
    }
  },
  created() {
    Trash.getAll().then(res=>{
      console.log(res)
      this.trashList = res.data
    })
  },
  methods: {
    handleDelete(noteId) {
      this.$confirm("删除笔记后将不可恢复", "删除笔记").then(()=>{
        Trash.delete(noteId).then(res=>{
          this.$message.success(res.msg)
          this.trashList = this.trashList.filter(item=>item.id !==noteId)
        }).catch(err=>{
          this.$message.error(err.msg)
        })
      })
    },
    handleRevert(noteId) {
      this.$confirm("笔记将恢复到所属笔记本", "恢复笔记").then(()=>{
        Trash.revert(noteId).then(res=>{
          this.$message.success(res.msg)
          this.trashList = this.trashList.filter(item=>item.id !==noteId)
        }).catch(err=>{
          this.$message.error(err.msg)
        })
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .container
    display flex
    justify-content space-between
    flex-wrap wrap
    .box-card
      width 23%
      margin-bottom 23px
      .content
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
        line-height 26px
</style>