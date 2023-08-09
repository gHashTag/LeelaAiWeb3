/**
 * @format
 */
import '@env'

import { AppRegistry } from 'react-native'
import App from './src'
import { name as appName } from './app.json'
// import { LogBox } from 'react-native'

// if (__DEV__) {
//   const ignoreWarns = ['ViewPropTypes will be removed from React Native']

//   const warn = console.warn
//   console.warn = (...arg) => {
//     for (const warning of ignoreWarns) {
//       if (arg[0].startsWith(warning)) {
//         return
//       }
//     }
//     warn(...arg)
//   }

//   LogBox.ignoreLogs(ignoreWarns)
// }

AppRegistry.registerComponent(appName, () => App)
