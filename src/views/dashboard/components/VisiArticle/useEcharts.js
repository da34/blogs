import {unref} from 'vue'
import * as echarts from 'echarts/core';
import {BarChart, PieChart} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import {CanvasRenderer} from 'echarts/renderers';

echarts.use(
  [TitleComponent, TooltipComponent, LegendComponent, GridComponent, BarChart, CanvasRenderer, PieChart]
);

export function useECharts(elRef) {
  let chartInstance

  function initEcharts() {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }
    chartInstance = echarts.init(el);
  }

  function setOptions(option) {
    initEcharts()
    chartInstance?.setOption(option)
  }

  return {
    setOptions,
    chartInstance
  }
}
