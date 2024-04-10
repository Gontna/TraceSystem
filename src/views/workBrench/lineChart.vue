<template>
  <Echarts :option="option"/>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import Echarts from "@/components/echarts.vue";
import {reactive} from "vue";

var chartDom = document.getElementById('line');
var myChart = echarts.init(chartDom);
const option = reactive({
  color: ['#80FFA5', '#00DDFF', '#37A2FF'],
  title: {
    text: 'Gradient Stacked Area Chart'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['1级码', '2级码', '3级码']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月,',
        '9月',
        '10月',
        '11月',
        '12月'
      ]
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '1级码',
      type: 'line',
      stack: 'Total1',
      smooth: true,
      lineStyle: {
        color: '#6ad4c1',
        width: 4
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(175, 233, 233)'
          },
          {
            offset: 1,
            color: 'rgb(218, 248, 240)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [140, 232, 101, 264, 90, 340, 250, 210, 219, 289, 123, 178]
    },
    {
      name: '2级码',
      type: 'line',
      stack: 'Total2',
      smooth: true,
      lineStyle: {
        color: '#6ad9f7',
        width: 3
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(151, 229, 243)'
          },
          {
            offset: 1,
            color: 'rgb(217, 247, 247)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 282, 111, 234, 220, 340, 310, 312, 333, 362, 311, 362]
    },
    {
      name: '3级码',
      type: 'line',
      stack: 'Total3',
      smooth: true,
      lineStyle: {
        color: '#e7dda8',
        width: 3
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(215, 231, 207)'
          },
          {
            offset: 1,
            color: 'rgb(241, 249, 243)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 132, 201, 334, 190, 130, 220, 242, 123, 313, 31, 41]
    }
  ]
});

option && myChart.setOption(option);

</script>


<style scoped>

</style>