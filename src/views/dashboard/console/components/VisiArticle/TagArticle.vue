<template>
  <div
    ref="chartRef"
    style="height: 300px"
  />
</template>

<script setup>
import {ref, onMounted} from "vue";
import {getTagRelation} from "@/api/web/tag";
import {useECharts} from "./useEcharts";

const chartRef = ref(null)
const {setOptions} = useECharts(chartRef)

getTagRelation().then(res => {
  setOptions({
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: res,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
})

onMounted(() => {

  setOptions({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    }
  })
})


</script>
<style scoped>
</style>
