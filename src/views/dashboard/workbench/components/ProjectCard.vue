<template>
  <Card title="监控配置" v-bind="$attrs">
    <template #extra>
      <a-button type="link" @click="add">新增监控</a-button>
    </template>
    <template v-for="item in monitorList" :key="item">
      <!-- {{ item }} -->
      <CardGrid class="!md:w-1/3 !w-full">
        <span class="flex">
          <Icon icon="ant-design:video-camera-filled" :color="item.color" size="30" />
          <span class="text-lg ml-4">{{ item.backup }} </span>
          <span class="text-lg ml-10 justify-center">
            <a-switch v-model:checked="item.checkValue" @change="(e) => switchChange(e, item.id)" checked-children="开启"
              un-checked-children="关闭" :loading="item.checkLodding" />
          </span>
        </span>
        <div class="flex mt-2 h-5 text-secondary"> 出行时间： </div>
        <div class="mt-2 h-10 text-secondary"> {{ item.outBeginTime }} - {{ item.outEndTime }} </div>
        <div class="flex h-8 justify-between text-secondary">
          <span>所属用户：{{ item.userName }}</span>
        </div>
        <div class="flex text-secondary">
          <span>操作：
            <p style="width: 7vh; display: inline-block; cursor: pointer">
              <Icon icon="ant-design:eye-filled" @click="startVideo(item)" :size="30" color="#409eff" />
            </p>
            <p style="width: 7vh; display: inline-block; cursor: pointer">
              <Icon icon="ant-design:edit-filled" @click="edit(item)" :size="30" color="#e6a23c" />
            </p>
            <p style="width: 7vh; display: inline-block; cursor: pointer">
              <Icon icon="ant-design:close-square-filled" @click="del(item)" :size="30" color="red" />
            </p>
          </span>
        </div>
        <div class="flex text-secondary">
          <a-button type="primary" @click="computerTravelTime(item)">计算出行时间并提醒</a-button>
        </div>
      </CardGrid>
      <a-modal v-model:visible="showVideo" title="播放监控" destroyOnClose centered @ok="showVideo = false">
        <video
          src="https://prod-streaming-video-msn-com.akamaized.net/fe13f13c-c2cc-4998-b525-038b23bfa9b5/1a9d30ca-54be-411e-8b09-d72ef4488e05.mp4"
          controls></video>
      </a-modal>
    </template>
    <a-modal width="100vh" v-model:visible="editMonitor" title="编辑监控配置" destroyOnClose centered @ok="update">
      <!-- pointer-events: none -->
      <a-form :model="showMonitorData" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }"
        autocomplete="off" aria-disabled="true" style="margin: 2vh">
        <a-form-item label="监控名称" name="backup">
          <a-input v-model:value="showMonitorData.backup" />
        </a-form-item>
        <a-form-item label="出行时间" name="showMonitorTime">
          <a-range-picker v-model:value="showMonitorTime" show-time />
        </a-form-item>
        <a-form-item label="选择城市" name="city">
          <a-cascader v-model:value="showMonitorData.cityCode"
            :field-names="{ label: 'cityName', value: 'adcCode', children: 'children' }" :options="cityCodeData"
            placeholder="请选择城市" showSearch />
        </a-form-item>
        <a-form-item label="监控地址" name="monitorId">
          <a-input v-model:value="showMonitorData.monitorId" />
        </a-form-item>
        <a-form-item label="所属用户" name="userName">
          <a-input v-model:value="showMonitorData.userName" disabled />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal width="100vh" v-model:visible="createMonitor" title="新增监控" destroyOnClose centered @ok="addMonitor">
      <a-form :model="addMonitorData" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }"
        autocomplete="off" aria-disabled="true" style="margin: 2vh">
        <a-form-item label="监控名称" name="backup">
          <a-input v-model:value="addMonitorData.backup" />
        </a-form-item>
        <a-form-item name="state">
          是否开启 <a-switch v-model:checked="addMonitorData.state" checked-children="开" un-checked-children="关" />
        </a-form-item>
        <a-form-item label="出行时间" name="addMonitorTime">
          <a-range-picker v-model:value="addMonitorTime" show-time />
        </a-form-item>
        <a-form-item label="选择城市" name="city">
          <a-cascader v-model:value="addMonitorData.cityCode"
            :field-names="{ label: 'cityName', value: 'adcCode', children: 'children' }" :options="cityCodeData"
            placeholder="请选择城市" showSearch />
        </a-form-item>
        <a-form-item label="监控地址" name="monitorId">
          <a-input v-model:value="addMonitorData.monitorId" />
        </a-form-item>
      </a-form>
    </a-modal>
  </Card>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick, reactive } from 'vue';
import { Card } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { getUserConfigs, startMonitor, shutdownMonitor, getCityCode, updateUserConfig, setUserConfig, delUserConfig,getTravelTime } from '/@/api/analysis/api';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import type { CascaderProps } from 'ant-design-vue';
import { AnyNsRecord } from 'dns';
dayjs.locale('zh-cn');
// import 'video.js/dist/video-js.css';
// import videojs from 'video.js';
export default defineComponent({
  components: { Card, CardGrid: Card.Grid, Icon },
  setup() {
    const color = () => {
      let col = '#';
      for (var i = 0; i < 6; i++) col += parseInt(Math.random() * 16).toString(16);
      return col;
    };
    const monitorList = ref([]);
    const get = () => {
      const page = ref({ pageSize: 10, pageNo: 1 });
      getUserConfigs(page).then((res: any) => {
        nextTick(() => {
          res.records.forEach((element: any) => {
            element.color = color();
            element.checkValue = element.state == 1 ? true : false;
            element.checkLodding = false;
          });
          monitorList.value = res.records;
        });
      });
      return monitorList;
    };
    const switchChange = (event: any, monitorId: String) => {
      let target = monitorList.value.find((item) => item.id == monitorId);
      if (!target) {
        return;
      }
      target.checkLodding = true;
      if (event) {
        startMonitor({ userConfigId: monitorId }).then((res) => {
          console.log('🚀 ~ startMonitor ~ res:', res);
        });
      } else {
        shutdownMonitor({ userConfigId: monitorId }).then((res) => {
          console.log('🚀 ~ startMonitor ~ res:', res);
        });
      }
      setTimeout(() => {
        target.checkLodding = false;
        get();
      }, 3000);
    };
    // 展示监控
    const showVideo = ref(false);
    const startVideo = (event: any) => {
      showVideo.value = true;
    };
    // 编辑监控配置
    const editMonitor = ref(false);
    const showMonitorData = ref({});
    const showMonitorTime = ref([]);
    const cityCodeData = ref([]);
    const cityData = () => {
      getCityCode().then((res: any) => {
        nextTick(() => {
          cityCodeData.value = res;
        });
      });
    };
    const edit = (event: any) => {
      cityData();
      showMonitorData.value = event;
      editMonitor.value = true;
      showMonitorData.value.cityCode = event.cityCode.split(',');
      showMonitorTime.value = [];
      showMonitorTime.value[0] = dayjs(showMonitorData.value.outBeginTime, 'YYYY-MM-DD HH:mm:ss');
      showMonitorTime.value[1] = dayjs(showMonitorData.value.outEndTime, 'YYYY-MM-DD HH:mm:ss');
    };

    const update = () => {
      if (showMonitorTime.value[0]) {
        showMonitorData.value.outBeginTime = showMonitorTime.value[0].format('YYYY-MM-DD HH:mm:ss');
        showMonitorData.value.outEndTime = showMonitorTime.value[1].format('YYYY-MM-DD HH:mm:ss');
      }
      showMonitorData.value.cityCode = showMonitorData.value.cityCode.join(',');
      updateUserConfig(showMonitorData.value).then(() => {
        editMonitor.value = false;
        get();
      });
    };
    //删除监控配置
    const del = (event: any) => {
      delUserConfig(event).then(() => {
        get();
      })
    };
    //  新增监控配置
    const addMonitorData = ref({});
    const addMonitorTime = ref([]);
    const createMonitor = ref(false);
    const add = () => {
      console.log('🚀 ~ add ~ true:', true);
      createMonitor.value = true;
      cityData();
    };
    const addUpdate = () => {
      if (addMonitorData.value.cityCode instanceof Array) {
        addMonitorData.value.cityCode = addMonitorData.value.cityCode.join(',');
      }
      if (addMonitorData.value.state) {
        addMonitorData.value.state = 1;
      } else {
        addMonitorData.value.state = 0;
      }
      setUserConfig(addMonitorData.value).then((res: any) => {
        createMonitor.value = false;
        get();
      });
    };
    const addMonitor = () => {
      console.log('🚀 ~ setup ~ addMonitorData:', addMonitorData.value);
      if (addMonitorTime.value[0]) {
        addMonitorData.value.outBeginTime = addMonitorTime.value[0].format('YYYY-MM-DD HH:mm:ss');
        addMonitorData.value.outEndTime = addMonitorTime.value[1].format('YYYY-MM-DD HH:mm:ss');
      }
      addUpdate();
    };
    // 计算出行时间
    const computerTravelTime = (event: any) => {
      getTravelTime(event).then((res:any) => {
        console.log("🚀 ~ getTravelTime ~ res:", res)
      })
    }

    return {
      monitorList: get(),
      switchChange,
      startVideo,
      edit,
      del,
      showVideo,
      editMonitor,
      showMonitorData,
      showMonitorTime,
      cityCodeData,
      update,
      add,
      createMonitor,
      addMonitorData,
      addMonitor,
      addMonitorTime,
      computerTravelTime
    };
  },
});
</script>
