<template>
  <div class="wrapper">
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-head :username="username"></v-head>
      <div class="content">
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
import Auth from '@/apis/auth'
import bus from './bus'
export default {
  data () {
    return {
      collapse: false,
      username: "未"
    }
  },
  components: {
    vHead, vSidebar
  },
  created () {
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
    Auth.getInfo().then(res=>{
      this.username = res.data.username
    })
  }
}
</script>

<style lang="less">
.content-box {
  position: absolute;
  left: 220px;
  right: 0;
  top: 0;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left .3s ease-in-out;
  transition: left .3s ease-in-out;
  background: #f0f2f5;
}
.content-collapse {
  left: 65px;
}
.content {
  margin: 16px;
}

.container {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  margin-top: 10px;
  height: calc(~ "100vh - 180px");
  overflow-y: scroll;
  margin-bottom: 30px;
}

</style>

