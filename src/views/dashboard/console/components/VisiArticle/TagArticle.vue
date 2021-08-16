<template>
<div ref="chartRef" style="height: 300px"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import {ref,onMounted,nextTick} from "vue";
const chartRef = ref(null)

onMounted(() => {
  // console.log(chartRef.value)
  let myChart = echarts.init(chartRef.value);
  var option;

  option = {
    title: {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      type: 'scroll',
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        data: [
          {value: 1048, name: '搜索引擎'},
          {value: 735, name: '直接访问'},
          {value: 580, name: '邮件营销'},
          {value: 484, name: '联盟广告'}
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  option && myChart.setOption(option);
})


</script>

<style scoped>

</style>
