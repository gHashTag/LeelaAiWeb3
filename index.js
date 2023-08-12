/**
 * @format
 */
import '@env'

import { AppRegistry } from 'react-native'
import { LogBox } from 'react-native'

import { name as appName } from './app.json'
import App from './src'

if (__DEV__) {
  const ignoreWarns = [
    'react-i18next:: You will need to pass in an i18next instance by using initReactI18next',
  ]

  const warn = console.warn
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return
      }
    }
    warn(...arg)
  }

  LogBox.ignoreLogs(ignoreWarns)
}

AppRegistry.registerComponent(appName, () => App)
