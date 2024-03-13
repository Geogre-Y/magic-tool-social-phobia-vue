<template>
  <Card title="最新动态" v-bind="$attrs">
    <template #extra>
      <a-button type="link" size="small">更多</a-button>
    </template>
    <List item-layout="horizontal" :data-source="logList">
      <template #renderItem="{ item }">
        <ListItem>
          <ListItemMeta>
            <template #description>
              {{ item.createTime }}
            </template>
            <!-- eslint-disable-next-line -->
            <template #title>{{ item.createBy }}<span v-html="item.content"> </span> </template>
            <template #avatar>
              <!-- <Icon :icon="item.createAvatar" :size="30" /> -->
              <img :src="item.createAvatar" style="width: 8vh; height: 8vh; border-radius: 50%" />
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
  </Card>
</template>
<script lang="ts" setup>
  import { Card, List } from 'ant-design-vue';
  import { dynamicInfoItems } from './data';
  import { Icon } from '/@/components/Icon';
  import { onMounted, ref } from 'vue';
  import { getMonitorLog } from '/@/api/analysis/api';
  const ListItem = List.Item;
  const ListItemMeta = List.Item.Meta;
  const logList = ref([]);
  const initData = () => {
    getMonitorLog().then((res: any) => {
      logList.value = res;
      console.log('🚀 ~ getMonitorLog ~ res:', res);
    });
  };
  onMounted(() => {
    initData();
  });
</script>
