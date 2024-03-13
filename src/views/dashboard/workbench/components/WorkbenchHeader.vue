<template>
  <div class="lg:flex">
    <Avatar :src="userinfo.avatar || headerImg" :size="72" class="!mx-auto !block" />
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2" style="text-align: center;">
      <h1 class="md:text-lg text-md">{{getTimeState()}}, {{ userinfo.realname }}, I人拯救世界！</h1>
      <span class="text-secondary"> 今日晴，20℃ - 32℃！ </span>
    </div>

  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { Avatar } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';
  import headerImg from '/@/assets/images/header.jpg';

  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);
  const getTimeState = () => {
    // 获取当前时间
    let timeNow = new Date();
    // 获取当前小时
    let hours = timeNow.getHours();
    // 设置默认文字
    let text = ``;
    // 判断当前时间段
    if (hours >= 0 && hours <= 10) {
        text = `早上好`;
    } else if (hours > 10 && hours <= 14) {
        text = `中午好`;
    } else if (hours > 14 && hours <= 18) {
        text = `下午好`;
    } else if (hours > 18 && hours <= 24) {
        text = `晚上好`;
    }
    return text;
};
</script>
