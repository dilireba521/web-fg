// 转换为数字型字符串
export function formateNumStr(str, params: any = { decimals: 4, multiple: 1, suffix: '' }) {
  if (!str) return '0'
  if (str == 0) return '0'
  const { decimals, multiple = 1, suffix } = params
  let _res: any = (Number(str) * multiple).toFixed(decimals)
  if (Number(_res) == 0) {
    _res = str
  }
  return formatNumberWithCommas(_res) + (suffix || '')
}

// 转换为数字型字符串保存原始精度值
export function formateNumStrSavePrecision(str, params: any = { multiple: 0, suffix: '' }) {
  if (!str) return '0'
  if (str == 0) return '0'
  const { multiple, suffix } = params
  let _str = str.toString()
  const _len = _str.split('.')[1]?.length || 0
  // 先化整数
  _str = Number(_str) * Math.pow(10, multiple >= 0 ? _len + multiple : _len)
  // 再转回原数
  _str = Number(_str) / Math.pow(10, multiple >= 0 ? _len : _len - multiple)
  return _str + (suffix || '')
}

// 数字加千分号
export function formatNumberWithCommas(x: any) {
  return x?.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') || 0
}

// 只能输入两位数字
export function limitDecimalPlaces(value: any) {
  let reg = /^(\-)*(\d+)\.(\d\d).*$/
  return String(value).replace(reg, '$1$2.$3')
}
