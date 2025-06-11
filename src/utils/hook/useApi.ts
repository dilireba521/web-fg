import { message } from 'ant-design-vue'
interface ApiBasicConfig {
  apiFn: Promise<any>
  successFn?: (params?: any) => void
  errorFn?: () => void
  finallyFn?: () => void
}
// 快速接口调用
export async function useApiBasic(ApiBasicConfig: ApiBasicConfig) {
  let result: any
  try {
    ;({ data: result } = await ApiBasicConfig.apiFn)
    if (result.value?.retCode == 0) {
      ApiBasicConfig?.successFn?.(result)
      message.success({
        content: result.value?.retMsg || result.value?.msg || '操作成功!',
        key: '_save_fake_data',
        duration: 2
      })
    } else {
      ApiBasicConfig?.errorFn?.()
      message.error({
        content: result.value?.retMsg || result.value?.msg || '操作失败!',
        key: '_save_fake_data',
        duration: 2
      })
    }
  } catch (error) {
    // TODO 网络问题居多
    ApiBasicConfig?.errorFn?.()
  } finally {
    ApiBasicConfig?.finallyFn?.()
  }
  return {
    result
  }
}
