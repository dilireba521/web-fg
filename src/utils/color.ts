/**
 * 根据数字颜色-添加不同文字颜色
 * @param num
 */
export function getTextColor(num: number | string) {
    const _num = parseFloat(num);
    if (_num < 0) {
      return 'text-[#2FB97B]';
    } else if (_num > 0) {
      return 'text-[#C1272D]';
    } else {
      return '';
    }
  }
  