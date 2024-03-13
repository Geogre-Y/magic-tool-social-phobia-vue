<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import { useECharts } from '/@/hooks/web/useECharts';
import { basicProps } from './props';
import { computedCharts } from '/@/api/analysis/api';

defineProps({
  ...basicProps,
});
const chartRef = ref<HTMLDivElement | null>(null);
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

const color =() =>{
   let col = "#";
   for (var i = 0; i < 6; i++) col+=parseInt(Math.random() * 16).toString(16);
   console.log(col);
   return col;
}
const getEchartsData = (param :any)=>{
  
  computedCharts(param).then((res: any) => {
    console.log(res);
    let max = 0;
    let series= new Array
    let colorList = new Array
    res.series.forEach((element:any,index:any)=> {
      if(max<Math.max(...element.data)){
        max = Math.max(...element.data)
      }
      colorList.push( color())
      series.push(
        {
          name:element.name,
          smooth: true,
          data: element.data,
          type: 'line',
          areaStyle: {},
          itemStyle: {
            color: colorList[index],
          },
        })
    });
    setOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            width: 1,
            color: '#019680',
          },
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: res.xaxis,
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            type: 'solid',
            color: 'rgba(226,226,226,0.5)',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {},
      },
      yAxis: [
        {
          type: 'value',
          max: max,
          splitNumber: 4,
          axisTick: {
            show: false,
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
            },
          },
        },
      ],
      grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
      series: series
    });
  });
}
onMounted(() => {
  let param = {
    beginTime: '2024-01-24 08:00:00',
    endTime: '2024-01-25 23:59:59',
    monitorSplit: '00:01:00',
  };
  getEchartsData(param)
});
defineExpose({
  getEchartsData
	})
</script>
