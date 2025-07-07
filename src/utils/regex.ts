export function validatePassword(password: string) {
   // 正确的正则表达式：
  // ^                 - 字符串开始
  // (?=.*[\dA-Za-z])  - 必须包含数字或字母
  // |                 - 或
  // (?=.*[\W_])       - 必须包含特殊字符
  // [\da-zA-Z\W_]{8,16}$ - 允许的字符范围，长度8-16
  const regex = /^(?:(?=.*\d)(?=.*[a-zA-Z])|(?=.*\d)(?=.*[\W_]))[\da-zA-Z\W_]{8,16}$/;
  return regex.test(password);
}
