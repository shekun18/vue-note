<template>
  <div class="note">
      <div class="note-left">
        <notebar
          :notebookId="curNotebookId"
          :notes="notes"
          @change="getContent"
        ></notebar>
      </div>
      <div class="note-content">
        <el-row
          style="border-bottom: 1px solid #ddd;height: 45px;line-height: 40px;padding: 0 20px"
        >
          <span style="font-size: 14px;">当前笔记本</span>
          <el-select
            v-model="curNotebookId"
            placeholder="请选择笔记本"
            @change="handleChange"
          >
            <el-option
              v-for="item in notebooks"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
          <div style="float: right">
            <span>{{stateText}}</span>
            <el-button type="info" size="mini" @click="handlePreview">{{previewText}}</el-button>
            <el-button type="danger" size="mini" @click="handleDelete">删除</el-button>
          </div>
        </el-row>
        <div class="editor">
          <input type="text"
            v-model="curNote.title"
            @input = "handleEdit"
            style="width: 80%;font-weight: 600;font-size: 26px;border-bottom: 1px solid #ddd;margin-bottom: 30px;line-height: 40px;"
          >
          <textarea
            v-if="show"
            v-model = "curNote.content"
            @input = "handleEdit"
            cols="100"
            rows="40">
          </textarea>
          <div class="preview" v-else v-html="previewContent"></div>
        </div>
      </div>
  </div>
</template>

<script>
import Notebook from "@/apis/notebook"
import notebar from "./notebar"
import Note from '@/apis/note'
// 引入debounce,进行节流
import {debounce} from "debounce"
import MarkdownIt from 'markdown-it'
let    md = new MarkdownIt();
export default {
  data() {
    return {
      stateText: "已保存",
      previewText: "预览",
      notebooks: [],
      notes: [],
      curNotebookId: "",
      curNote: {},
      show: true
    }
  },
  created(){
    this.getNotebooks()
  },
  components: {
    notebar
  },
  methods: {
    getNotebooks(){
      Notebook.getAll().then(res=>{
        this.notebooks = res.data
        this.curNotebookId = res.data[0].id
        Note.getAll(res.data[0].id).then(res=>{
          this.notes = res.data
        })
      })
    },
    handleChange(notebookId){
      this.notebookId = notebookId
      Note.getAll(notebookId).then(res=>{
        this.notes = res.data
      })
    },
    getContent(curNote){
      console.log(curNote)
      this.curNote = curNote
    },
    handlePreview(){
      this.previewContent = md.render(this.curNote.content)
      this.show = !this.show
      this.previewText = this.previewText==="预览"?"编辑":"预览"
    },
    handleDelete(){
      console.log('delete')
      Note.delete(this.curNote.id).then(res=>{
        console.log(this.notes)
        this.notes = this.notes.filter(item=>item.id !== this.curNote.id)
        this.$message.success("删除成功")
      })
    },

    handleEdit: debounce(function(){
      this.stateText = "正在保存..."
      let payload = {}
      payload.noteId = this.curNote.id
      payload.title = this.curNote.title
      payload.content = this.curNote.content
      Note.update(payload).then(res=>{
        this.stateText = "已保存"
      }).catch(()=>{
        this.stateText = "保存失败"
      })
    },1000)
  }
}
</script>

<style scoped lang="less">
.note {
  margin: -16px;
  height: calc(~ "100vh - 71px");
  .note-left {
    width: 200px;
    height: 100%;
    overflow-y: scroll;
    border: 1px solid #ddd;
    position: absolute;
    overflow-y: scroll;
  }
  .note-content {
    margin-left: 201px;
    .editor {
      height: calc(~ "100vh - 111px");
      overflow-y: scroll;
      background: #fff;
      padding: 30px 50px;
      line-height: 30px;
      font-size: 14px;
    }
    .preview {
      padding-bottom: 100px;
    }
  }
}
</style>
