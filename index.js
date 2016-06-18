const lodash = require('lodash')
const merge = lodash.merge
const mergeWith = lodash.mergeWith

const ReactNative = require('react-native-universal')

module.exports = function (styles) {
  function evaluate(func, args) {
    if (typeof func !== 'function') return func
    return func.apply(null, args)
  }

  // Handle functions
  function customizer(objValue, srcValue) {
    if (typeof objValue === 'function' || typeof srcValue === 'function') {
      return function () {
        return merge(evaluate(objValue, arguments), evaluate(srcValue, arguments))
      }
    }
  }

  switch (ReactNative.Platform.OS) {
    case 'ios':
      return mergeWith(styles, styles.ios || {}, customizer)
    case 'android':
      return mergeWith(styles, styles.android || {}, customizer)
    case 'web':
      return mergeWith(styles, styles.web || {}, customizer)
  }
}
