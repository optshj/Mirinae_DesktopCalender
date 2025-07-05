module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    curly: 'off', // if, else, for, while 등에서 중괄호 강제하지 않음
    'react-native/no-inline-styles': 'off' // 인라인 스타일 사용 허용
  }
}
