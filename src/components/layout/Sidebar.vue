<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <el-menu-item index="/" key="log" style="height: 70px;line-height: 70px;margin-left: -5px">
        <img style="height:40px;width: 30px;" src="../../../static/logSmall.jpg" alt="" v-if='collapse'>
        <img style="height:60px;width: 180px;" src="../../../static/log.jpg" alt="" v-else>
      </el-menu-item>
      <template v-for="item in items">
          <template v-if="item.subs">
            <el-submenu :index="item.index" :key="item.index">
              <template slot="title">
                  <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
              </template>
              <template v-for="subItem in item.subs">
                <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                    <template slot="title">{{ subItem.title }}</template>
                    <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                        {{ threeItem.title }}
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                    {{ subItem.title }}
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index" :key="item.index">
                <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from './bus'
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-tickets',
          index: 'notebooks',
          title: '笔记本列表'
        },
        {
          icon: 'el-icon-document',
          index: 'notes',
          title: '笔记详情'
        },
        {
          icon: 'el-icon-delete',
          index: 'trash',
          title: '回收站'
        },
        {
          icon: 'el-icon-message',
          index: '3',
          title: '表单相关',
          subs: [
              {
                  index: 'chart',
                  title: '基本图表'
              },
              {
                  index: 'summary',
                  title: '项目总结'
              }
          ]
        },
      ]

    }
  },
  computed: {
    onRoutes(){
      return this.$route.path.replace('/','')
    }
  },
  created () {
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  }

}
</script>

<style scoped lang="less">
.sidebar{
	display: block;
  position: absolute;
  left: 0;
  top: 0px;
  bottom:0;
  overflow-y: scroll;
  transition: width .3s;
  .log {
    padding-left: 16px;
    height: 70px;
    line-height: 70px;
    background: #324157;
    position: fixed;
    top: 0;
    width: 220px;
    transition: width .3s;
  }
  .log.el-menu--collapse {
    width: 48px;
  }
}
.sidebar::-webkit-scrollbar{
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse){
  width: 220px;
}
.sidebar > ul {
  min-height:100%;
}
</style>
