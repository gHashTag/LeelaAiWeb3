import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Sentry from '@sentry/react'
import React, { useEffect } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import Orientation from 'react-native-orientation-locker'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import {
  black,
  dimGray,
  lightGray,
  navRef,
  red,
  secondary,
  white,
} from './cons'
import { GameScreen, PlanScreen } from './screens'
import { RootStackParamList } from './types'

const DarkTheme = {
  dark: true,
  colors: {
    primary: secondary,
    background: black,
    card: white,
    text: white,
    border: dimGray,
    notification: red,
  },
}

const LightTheme = {
  dark: false,
  colors: {
    primary: secondary,
    background: lightGray,
    card: white,
    text: black,
    border: dimGray,
    notification: red,
  },
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  // Themes
  const isDark = useColorScheme() === 'dark'
  const theme = isDark ? DarkTheme : LightTheme
  const color = isDark ? 'light-content' : 'dark-content'

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(
      isDark ? black : white,
      isDark ? 'dark' : 'light',
    )
    SystemNavigationBar.setNavigationBarDividerColor(lightGray)
    Orientation.lockToPortrait()
  }, [isDark])

  return (
    <NavigationContainer ref={navRef} theme={theme}>
      <StatusBar backgroundColor={isDark ? black : white} barStyle={color} />
      <Stack.Navigator initialRouteName="PLAN_SCREEN">
        <Stack.Group
          screenOptions={{
            headerShown: false,
            presentation: 'transparentModal',
            animation: 'fade',
            gestureEnabled: false,
          }}
        >
          <Stack.Screen name="PLAN_SCREEN" component={PlanScreen} />
          <Stack.Screen name="GAME_SCREEN" component={GameScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Sentry.withProfiler(App)
