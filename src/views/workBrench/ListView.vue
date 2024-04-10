<template>
  <div class="w-1/1 h-1/1 flex flex-col  ">
    <div class="w-1/1 flex justify-between mb-4 ">
      <div class="w-3/13 h-19vh  min-h-40 min-w-85 py-4 rounded-md shallow bg-white flex flex-col justify-center">
        <div class="w-1/1 flex justify-between">
          <div class="text-2.5vh ">库存数量</div>
          <el-button-group>
            <button
                v-for="(item,index) in ButtonText"
                :key="index"
                :class="activate1==index?'active':''"
                style="margin: 0 0.5em; width: 3em; height: 1.5em;background-color: #b1b2b7;border-radius: 3px; color: #fff;font-weight: lighter;line-height: 1.5em"
                @click="activate1=index"
            >{{ item }}
            </button>
          </el-button-group>
        </div>
        <div class="my-10 font-medium"><span class="text-3vh font-bold">33,56800</span>件</div>
        <div class="flex justify-between" style="color:#dadadc"><span>周同比: 12.5%</span>
          <span>月同比: 12.5%</span></div>
      </div>
      <div
          class="w-3/13 h-19vh  min-h-40 min-w-85 p-2 rounded-md shallow bg-white flex flex-col justify-center">
        <div class="w-1/1 flex justify-between"><span class="text-2.5vh">库存数量</span>
          <el-button-group>
            <button
                v-for="(item,index) in ButtonText"
                :key="index"
                :class="activate1==index?'active':''"
                style="margin: 0 0.5em; width: 3em; height: 1.5em;background-color: #b1b2b7;border-radius: 3px; color: #fff;font-weight: lighter;line-height: 1.5em"
                @click="activate1=index"
            >{{ item }}
            </button>
          </el-button-group>
        </div>
        <div class="my-10 font-medium"><span class="text-3vh font-bold">33,56800</span>件</div>
        <div class="flex justify-between" style="color:#dadadc"><span>周同比: 12.5%</span>
          <span>月同比: 12.5%</span></div>
      </div>
      <div
          class="w-3/13 h-19vh  min-h-40 min-w-85 p-2 rounded-md shallow bg-white flex flex-col justify-center">
        <div class="w-1/1 flex justify-between"><span class="text-2.5vh">库存数量</span>
          <el-button-group>
            <button
                v-for="(item,index) in ButtonText"
                :key="index"
                :class="activate1==index?'active':''"
                style="margin: 0 0.5em; width: 3em; height: 1.5em;background-color: #b1b2b7;border-radius: 3px; color: #fff;font-weight: lighter;line-height: 1.5em"
                @click="activate1=index"
            >{{ item }}
            </button>
          </el-button-group>
        </div>
        <div class="my-10 font-medium"><span class="text-3vh font-bold">33,56800</span>件</div>
        <div class="flex justify-between" style="color:#dadadc"><span>周同比: 12.5%</span>
          <span>月同比: 12.5%</span></div>
      </div>
      <div
          class="w-3/13 h-19vh  min-h-40 min-w-85 p-2 rounded-md shallow bg-white flex flex-col justify-center">
        <div class="w-1/1 flex justify-between"><span class="text-2.5vh">库存数量</span>
          <el-button-group>
            <button
                v-for="(item,index) in ButtonText"
                :key="index"
                :class="activate1==index?'active':''"
                style="margin: 0 0.5em; width: 3em; height: 1.5em;background-color: #b1b2b7;border-radius: 3px; color: #fff;font-weight: lighter;line-height: 1.5em"
                @click="activate1=index"
            >{{ item }}
            </button>
          </el-button-group>
        </div>
        <div class="my-10 font-medium"><span class="text-3vh font-bold">33,56800</span>件</div>
        <div class="flex justify-between" style="color:#dadadc"><span>周同比: 12.5%</span>
          <span>月同比: 12.5%</span></div>
      </div>

    </div>
    <div class="w-3/4 bg-white h-3/7 ">
      <div class="px-7 pt-3 flex justify-between items-center text-xl font-bold">
        <div>
          赋码数量趋势
          <span v-for="(item) in legendText" class="text-16px mx-2 font-normal"><span
              :style="{'background-color':item.color}"
              class="mx-1"
              style="display: inline-block; width: 10px;height: 10px; ;border-radius: 3px"></span>{{ item.title }}
        </span>
        </div>


        <el-date-picker
            v-model="queryOption"
            class=""
            clearable
            format="YYYY/MM/DD"
            placeholder=""
            style="width: 12em;"
            type="date"
            value-format="YYYY-MM-DD"
            @change="change"

        ></el-date-picker>
      </div>
      <Echarts :option="option"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import Echarts from "@/components/echarts.vue";
import * as echarts from "echarts";

const legendText = [
  {
    title: '1级码',
    color: '#ffd383'
  },
  {
    title: '2级码',
    color: '#2bcdfd'
  },
  {
    title: '3级码',
    color: '#2fc3a2'
  }
]
const option = reactive({
  color: ['#80FFA5', '#00DDFF', '#37A2FF'],
  // title: {
  //   text: '赋码数量趋势'
  // },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  // legend: {
  //   left: '15%', //位置
  //   icon: "roundRect",//形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
  //   itemWidth: 14,
  //
  //   data: ['1级码', '2级码', '3级码']
  // },
  // toolbox: {
  //   feature: {
  //     saveAsImage: {}
  //   }
  // },
  grid: {
    left: '3%',
    right: '3%',
    bottom: '15%',
    top: '10%',
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

const activate1 = ref(0)
const ButtonText = [
  '本周',
  '本月'
]
const queryOption = ref([])

const change = () => {

}
</script>


<style scoped>

.active {
  background: #279cff !important;
  color: white !important;
}

</style>