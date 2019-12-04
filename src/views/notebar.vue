<template>
  <div class="notebar">
    <div class="addNote border" @click="addNote">+ 新建文章</div>
    <div
      class="note border"
      v-for="(item,index) in notes"
      :key="item.id"
      :class="{select: curIndedx===index }"
      @click="handleSelect(item,index)"
      >
      {{item.title}}
    </div>
  </div>
</template>

<script>
import Note from '@/apis/note'
export default {
  props: ["notebookId","notes"],
  data() {
    return {
      curIndedx: 0
    }
  },
  watch:{
    notes(){
      this.$emit("change",this.notes[0])
    }

  },
  methods: {
    handleSelect(item,index){
      this.curIndedx = index
      console.log(item,index)
      this.$emit('change',item)
    },
    addNote(){
      let title = new Date().toISOString().split('T')[0]
      Note.add(this.notebookId,{title,content: ""}).then(res=>{
        this.notes.unshift(res.data)
      })
    }
  }
}
</script>

<style scoped lang='stylus'>
  .iconfont
    font-size 14px
  .addNote
    cursor pointer
    padding-bottom 12px
  .note
    cursor pointer
    padding-left 22px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  .select
    color #21b1ed
  .border
    border-bottom: 1px solid #ddd;
    height: 20px;
    line-height: 20px;
    padding: 10px;
</style>
