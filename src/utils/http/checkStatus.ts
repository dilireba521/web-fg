import { message } from 'ant-design-vue'
// import router from '@/router';
// import { PageEnum } from '@/enums/pageEnum';
import { useUserStoreWithOut } from '@/store/modules/user'
import projectSetting from '@/settings/projectSetting'
// import { SessionTimeoutProcessingEnum } from '@/enums/appEnum'

// const { createMessage, createErrorModal } = useMessage();
const error = message.error!
// const stp = projectSetting.sessionTimeoutProcessing;

export function checkStatus(status: number, msg: string): void {
  // const { t } = useI18n();
  const userStore = useUserStoreWithOut()
  let errMessage = ''

  switch (status) {
    case 400:
      errMessage = `${msg}`
      break
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      userStore.setToken(undefined)
      errMessage = msg || '用户没有权限（令牌、用户名、密码错误）!'
      userStore.loginOut()
      break
    case 403:
      errMessage = msg || '用户登录时间过期，请重新登录!'
      break
    // 404请求不存在
    case 404:
      errMessage = '网络请求错误,未找到该资源!'
      break
    case 405:
      errMessage = '网络请求错误,请求方法未允许!'
      break
    case 408:
      errMessage = '网络请求超时!'
      break
    case 500:
      errMessage = '服务器错误,请联系管理员!'
      break
    case 501:
      errMessage = '网络未实现!'
      break
    case 502:
      errMessage = '网络错误!'
      break
    case 503:
      errMessage = '服务不可用，服务器暂时过载或维护!'
      break
    case 504:
      errMessage = '网络超时!'
      break
    case 505:
      errMessage = 'http版本不支持该请求!'
      break
    default:
  }

  if (errMessage) {
    error({ content: errMessage, key: `global_error_message_status_${status}` })
  }
}
