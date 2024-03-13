<template>
  <Card :tab-list="tabListTitle" v-bind="$attrs" :active-tab-key="activeKey" @tabChange="onTabChange">
    <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
      <a-form-item label="时间区间" :rules="[{ required: true, message: '请输入时间区间' }]">
        <a-range-picker v-model:value="value2" show-time inputReadOnly format="YYYY-MM-DD HH:00:00" />
      </a-form-item>

      <a-form-item label="时间间隔">
        <a-time-picker v-model:value="value1" placeholder="选择时间区间" disabled />
        <p style="display: inline-block; right: 0; position: absolute">
          <a-button type="primary" @click="go">查询</a-button>
        </p>
      </a-form-item>
    </a-form>
    <p v-if="activeKey === 'tab1'">
      <VisitAnalysis ref="visitAnalysis" />
    </p>
    <p v-if="activeKey === 'tab2'">
      <VisitAnalysisBar ref="visitAnalysisBar" />
    </p>
  </Card>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Card, message } from 'ant-design-vue';
import VisitAnalysis from './VisitAnalysis.vue';
import VisitAnalysisBar from './VisitAnalysisBar.vue';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

// 选择时间区间
type RangeValue = [Dayjs, Dayjs];
const value2 = ref<RangeValue>();
const value1 = ref(dayjs('00:10:00', 'HH:mm'));

const activeKey = ref('tab1');
const tabListTitle = [
  {
    key: 'tab1',
    tab: '人流量',
  },
  {
    key: 'tab2',
    tab: '访问量',
  },
];

function onTabChange(key) {
  activeKey.value = key;
}
const visitAnalysis = ref(null);
const visitAnalysisBar = ref(null);
const go = () => {
    if (!value2.value) {
      message.error('必须选择时间区间');
      return;
    }
    let param = {
      beginTime: value2.value[0].format('YYYY-MM-DD HH:00:00'),
      endTime: value2.value[1].format('YYYY-MM-DD HH:00:00'),
      monitorSplit: '00:01:00',
    };
  if (activeKey.value == 'tab1') {
    visitAnalysis.value.getEchartsData(param)
  } else {
    console.log('🚀 ~ visitAnalysisBar:', visitAnalysisBar);
  }
};
</script>
<style>
:deep(.ant-form) {
  max-width: none !important;
}
:deep(.ant-form-item) {
  max-width: none !important;
}
</style>