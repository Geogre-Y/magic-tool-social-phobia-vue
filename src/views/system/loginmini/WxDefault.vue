<template>
  <div :class="prefixCls" class="login-background-img">
    <AppLocalePicker class="absolute top-4 right-4 enter-x xl:text-gray-600" :showText="false" />
    <AppDarkModeToggle class="absolute top-3 right-7 enter-x" />
    <div class="aui-logo" v-if="!getIsMobile">
      <div>
        <h3>
          <img :src="logoImg" alt="jeecg" />
        </h3>
      </div>
    </div>
    <div v-else class="aui-phone-logo">
      <img :src="logoImg" alt="jeecg" />
    </div>
    <a-spin tip="正在登录中..." :spinning="loginLoading">
    <div v-show="type === 'login'">
      <div class="aui-content">
        <div class="aui-container">
          <div class="aui-form">
            <div class="aui-image">
              <div class="aui-image-text">
                <h1>I 型人群出门神器 </h1>
                <h4 style="margin-top: 30%; color: #fff">&copy;cick-y 余维华</h4>
              </div>
            </div>
            <div class="aui-formBox">
              <div class="aui-formWell">
                <div class="aui-flex aui-form-nav investment_title">
                  <div class="aui-flex-box accountLogin">首次登录需要您的手机号码 </div>
                </div>
                <div class="aui-form-box" style="height: 6vh">
                  <a-form ref="loginRef" :model="formData" @keyup.enter.native="accountLogin">
                    <div class="aui-account">
                      <div class="aui-inputClear">
                        <i class="icon icon-code" style="top: 0.5vh"></i>
                        <a-form-item>
                          <a-input
                            class="fix-auto-fill"
                            placeholder="请输入手机号码"
                            show-count
                            :maxlength="11"
                            :bordered="false"
                            v-model:value="formData.phone"
                          />
                        </a-form-item>
                      </div>

                      <div class="aui-flex"> </div>
                    </div>
                  </a-form>
                </div>
                <div class="aui-formButton">
                  <div class="aui-flex">
                    <a-button :loading="loginLoading" class="aui-link-login aui-flex-box" type="primary" @click="accountLogin">
                      {{ t('sys.login.loginButton') }}</a-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-spin>
  </div>
</template>
<script lang="ts" setup name="login-mini">
import { onMounted, reactive, ref, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '/@/store/modules/user';
import { useMessage } from '/@/hooks/web/useMessage';
import { useI18n } from '/@/hooks/web/useI18n';
import logoImg from '/@/assets/images/logo.png';
import { useDesign } from '/@/hooks/web/useDesign';
import { useAppInject } from '/@/hooks/web/useAppInject';
import { AppLocalePicker, AppDarkModeToggle } from '/@/components/Application';

const { prefixCls } = useDesign('mini-login');
const { notification, createMessage } = useMessage();
const userStore = useUserStore();
const { t } = useI18n();
const randCodeData = reactive<any>({
  randCodeImage: '',
  requestCodeSuccess: false,
  checkKey: null,
});
//手机号登录还是账号登录
const type = ref<string>('login');
//账号登录表单字段
const formData = reactive<any>({
  inputCode: '',
  username: '',
  password: '',
});
const loginRef = ref();

//注册
const loginLoading = ref<boolean>(false);
const { getIsMobile } = useAppInject();

defineProps({
  sessionTimeout: {
    type: Boolean,
  },
});
const router = useRouter();
/**
 * 账号或者手机登录
 */
async function loginHandleClick() {
  console.log('🚀 ~ router:', router.currentRoute.value.query);
  console.log('🚀 ~ router:', formData);

  // accountLogin();
}

async function accountLogin() {
  try {
    loginLoading.value = true;
    const { userInfo } = await userStore.wxLogin(
      toRaw({
        phone: formData.phone,
        url:  router.currentRoute.value.query.url,
        mode: 'none', //不要默认的错误提示
      })
    );
    if (userInfo) {
      notification.success({
        message: t('sys.login.loginSuccessTitle'),
        description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realname}`,
        duration: 3,
      });
    }
  } catch (error) {
    notification.error({
      message: t('sys.api.errorTip'),
      description: error.message || t('sys.login.networkExceptionMsg'),
      duration: 3,
    });
  } finally {
    loginLoading.value = false;
  }
}
onMounted(() => {
  accountLogin()
});
</script>

<style lang="less" scoped>
@import '/@/assets/loginmini/style/home.less';
@import '/@/assets/loginmini/style/base.less';

:deep(.ant-input:focus) {
  box-shadow: none;
}
:deep(.aui-image-text) {
  font-size: 24px;
  text-align: center;
}
:deep(.aui-image-text h1) {
  color: #fff;
  font-family: 'Gill Sans', sans-serif;
}
:deep(.aui-logo img) {
  width: 50%;
}
.aui-get-code {
  float: right;
  position: relative;
  z-index: 3;
  background: #ffffff;
  color: #1573e9;
  border-radius: 100px;
  padding: 5px 16px;
  margin: 7px;
  border: 1px solid #1573e9;
  top: 12px;
}

.aui-get-code:hover {
  color: #1573e9;
}

.code-shape {
  border-color: #dadada !important;
  color: #aaa !important;
}

:deep(.jeecg-dark-switch) {
  position: absolute;
  margin-right: 10px;
}
.aui-link-login {
  height: 42px;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 8px;
  margin-top: 15px;
  margin-bottom: 8px;
}
.aui-phone-logo {
  position: absolute;
  margin-left: 10px;
  width: 60px;
  top: 2px;
  z-index: 4;
}
.top-3 {
  top: 0.45rem;
}
</style>

<style lang="less">
@prefix-cls: ~'@{namespace}-mini-login';
@dark-bg: #293146;

html[data-theme='dark'] {
  .@{prefix-cls} {
    background-color: @dark-bg !important;
    background-image: none;

    &::before {
      background-image: url(/@/assets/svg/login-bg-dark.svg);
    }
    .aui-inputClear {
      background-color: #232a3b !important;
    }
    .ant-input,
    .ant-input-password {
      background-color: #232a3b !important;
    }

    .ant-btn:not(.ant-btn-link):not(.ant-btn-primary) {
      border: 1px solid #4a5569 !important;
    }

    &-form {
      background: @dark-bg !important;
    }

    .app-iconify {
      color: #fff !important;
    }
    .aui-inputClear input,
    .aui-input-line input,
    .aui-choice {
      color: #c9d1d9 !important;
    }

    .aui-formBox {
      background-color: @dark-bg !important;
    }
    .aui-third-text span {
      background-color: @dark-bg !important;
    }
    .aui-form-nav .aui-flex-box {
      color: #c9d1d9 !important;
    }

    .aui-formButton .aui-linek-code {
      background: @dark-bg !important;
      color: white !important;
    }
    .aui-code-line {
      border-left: none !important;
    }
    .ant-checkbox-inner,
    .aui-success h3 {
      border-color: #c9d1d9;
    }
    //update-begin---author:wangshuai ---date:20230828  for：【QQYUN-6363】这个样式代码有问题，不在里面，导致表达式有问题------------
    &-sign-in-way {
      .anticon {
        font-size: 22px !important;
        color: #888 !important;
        cursor: pointer !important;

        &:hover {
          color: @primary-color !important;
        }
      }
    }
    //update-end---author:wangshuai ---date:20230828  for：【QQYUN-6363】这个样式代码有问题，不在里面，导致表达式有问题------------
  }

  input.fix-auto-fill,
  .fix-auto-fill input {
    -webkit-text-fill-color: #c9d1d9 !important;
    box-shadow: inherit !important;
  }

  .ant-divider-inner-text {
    font-size: 12px !important;
    color: @text-color-secondary !important;
  }
  .aui-third-login a {
    background: transparent;
  }
}
</style>
