import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createErrorModal } = useMessage();
enum Api {
  //人流量统计图数据
  computedCharts = '/computed/charts',
  //获取、新增、修改、删除监控配置
  getUserConfigs = '/userConfig/get',
  setUserConfig = '/userConfig/set',
  updateUserConfig = '/userConfig/update',
  delUserConfig = '/userConfig/del',
  // 开启、结束信息收集
  startMonitor = '/collection/monitor/start',
  shutdownMonitor = '/collection/monitor/shutdown',
  getMonitorLog = '/collection/monitor/log',

  //获取城市编码
  getCityCode = '/weather/getCityCode',
  // 获取天气信息
  getWeather = '/weather/getWeather',
  //计算出行时间
  getTravelTime = '/computed/getTravelTime',

}

/**
 * @description: Trigger ajax error
 */
export function getCityCode() {
  return new Promise((resolve, reject) => {
    defHttp.get({ url: Api.getCityCode }).then((res) => {
      if (res) {
        resolve(res);
      } else {
        createErrorModal({ title: '错误提示', content: res.message || '未知问题' });
        reject();
      }
    });
  });
}
export function getMonitorLog() {
  return new Promise((resolve, reject) => {
    defHttp.get({ url: Api.getMonitorLog }).then((res) => {
      if (res) {
        resolve(res);
      } else {
        createErrorModal({ title: '错误提示', content: res.message || '未知问题' });
        reject();
      }
    });
  });
}
export function getWeather(params) {
  return new Promise((resolve, reject) => {
    defHttp.post({ url: Api.getWeather, params }).then((res) => {
      if (res) {
        resolve(res);
      } else {
        createErrorModal({ title: '错误提示', content: res.message || '未知问题' });
        reject();
      }
    });
  });
}
export function computedCharts(params) {
  return new Promise((resolve, reject) => {
    defHttp.post({ url: Api.computedCharts, params }).then((res) => {
      if (res) {
        resolve(res);
      } else {
        createErrorModal({ title: '错误提示', content: res.message || '未知问题' });
        reject();
      }
    });
  });
}
export function startMonitor(params) {
  return new Promise((resolve, reject) => {
    defHttp.get({ url: Api.startMonitor, params }).then((res) => {
      if (res) {
        resolve(res);
      } else {
        createErrorModal({ title: '错误提示', content: res.message || '未知问题' });
        reject();
      }
    });
  });
}
export function shutdownMonitor(params) {
  return new Promise((resolve, reject) => {
    defHttp.get({ url: Api.shutdownMonitor, params }).then((res) => {
      if (res) {
        resolve(res);
      } else {
        createErrorModal({ title: '错误提示', content: res.message || '未知问题' });
        reject();
      }
    });
  });
}
export function getUserConfigs(params) {
  return new Promise((resolve, reject) => {
    defHttp.get({ url: Api.getUserConfigs, params }).then((res) => {
      if (res) {
        resolve(res);
      } else {
        createErrorModal({ title: '错误提示', content: res.message || '未知问题' });
        reject();
      }
    });
  });
}
export function setUserConfig(params) {
  console.log("🚀 ~ setUserConfig ~ params:", params)
  return new Promise((resolve, reject) => {
    defHttp.post({ url: Api.setUserConfig, params }).then((res) => {
      if (res) {
        resolve(res);
      } else {
        createErrorModal({ title: '错误提示', content: res.message || '未知问题' });
        reject();
      }
    });
  });
}
export function updateUserConfig(params) {
  return new Promise((resolve, reject) => {
    defHttp.post({ url: Api.updateUserConfig, params }).then((res) => {
      if (res) {
        resolve(res);
      } else {
        createErrorModal({ title: '错误提示', content: res.message || '未知问题' });
        reject();
      }
    });
  });
}
export function delUserConfig(params) {
  return new Promise((resolve, reject) => {
    defHttp.post({ url: Api.delUserConfig, params }).then((res) => {
      if (res) {
        resolve(res);
      } else {
        createErrorModal({ title: '错误提示', content: res.message || '未知问题' });
        reject();
      }
    });
  });
}

export function getTravelTime(params) {
  return new Promise((resolve, reject) => {
    defHttp.get({ url: Api.getTravelTime, params }).then((res) => {
      if (res) {
        resolve(res);
      } else {
        createErrorModal({ title: '错误提示', content: res.message || '未知问题' });
        reject();
      }
    });
  });
}
