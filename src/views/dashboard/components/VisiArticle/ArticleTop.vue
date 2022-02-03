<template>
  <div
    ref="chartRef"
    style="height: 300px"
  />
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {getArticleList} from '@/api/web/article';
import {useECharts} from './useEcharts';

const chartRef = ref(null)
const {setOptions} = useECharts(chartRef)

getArticleList({
  pageSize: 5,
  'sortBy[views]': 'DESC',
}).then(res => {
  setOptions({
    series: [
      {
        type: 'bar',
        barWidth: 20,
        yAxisIndex: 0,
        label: {
          show: true,
          position: 2,
          fontSize: 15,
        },
        tooltip: {show: false},
        data: res.list.map((item) => {
          return {
            value: 0,
            label: {
              formatter() {
                return item.title;
              },
            },
          };
        }),
      },
      {
        name: '访问次数',
        type: 'bar',
        barWidth: 20,
        barMinHeight: 20, // 最小高度
        yAxisIndex: 0,
        label: {
          show: true,
          position: 'right',
          fontSize: 18,
          offset: [10, 0],
          formatter({value}) {
            return `${value}次`;
          },
        },
        tooltip: {
          formatter: '{a}: {c0}'
        },
        itemStyle: {
          barBorderRadius: 4,
        },
        data: res.list.map((item, index) => {
          let color = COLOR[index % COLOR.length];
          return {
            value: item.views,
            label: {color},
            itemStyle: {color},
          };
        }),
      },
    ],
  })
})

const COLOR = [
  'rgba(47, 123, 230, 1)',
  'rgba(47, 123, 230, 0.85)',
  'rgba(47, 123, 230, 0.7)',
  'rgba(47, 123, 230, 0.55)',
  'rgba(47, 123, 230, 0.4)',
];

onMounted(() => {
  setOptions({
    grid: {
      top: '8%',
      left: '3%',
      right: '10%',
      bottom: '2%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      show: true,
      inverse: true,
      type: 'category',
      axisLine: {
        show: false,
      },
    }
  })
})
</script>

<style scoped>

</style>
