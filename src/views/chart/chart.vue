<template>
  <div class="summary">
    <div class="crumbs">
    </div>
    <div class="chart-content">
      <el-card class="chart-item">
        <ve-line></ve-line>
      </el-card>
      <el-card class="chart-item">
        <ve-histogram></ve-histogram>
      </el-card>
       <el-card class="chart-item">
        <ve-ring></ve-ring>
      </el-card>
    </div>
  </div>
</template>

<script>
import VeLine from './line'
import VeHistogram from './histogram'
import VeRing from './ring'
export default {
  data() {
    return {

    }
  },
  components: {
    VeLine,
    VeHistogram,
    VeRing
  }
}
</script>

<style scoped lang="less">
.chart-content {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .chart-item {
    width: 49%;
    height: 320px;
    margin-bottom: 10px;
  }
}
</style>
