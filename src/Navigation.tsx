import React, { useEffect, useState } from 'react'

import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getAccount } from '@rly-network/mobile-sdk'
import * as Sentry from '@sentry/react'
import { navigationRef, isReadyRef, navigate } from 'cons/RootNavigation'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { useRecoilState } from 'recoil'
import UiKit from 'UiKit'

import { black, dimGray, lightGray, red, secondary, white } from './cons'
import {
  GameScreen,
  PlanScreen,
  ReportScreen,
  ReportsScreen,
  UserScreen,
} from './screens'
import { account } from './state'
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
  const isDark = useColorScheme() === 'dark'

  const theme = isDark ? DarkTheme : LightTheme
  const color = isDark ? 'light-content' : 'dark-content'
  const [hasLoadedAccount, setHasLoadedAccount] = useState(false)
  const [, setAct] = useRecoilState(account)

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(
      isDark ? black : white,
      isDark ? 'dark' : 'light',
    )
    SystemNavigationBar.setNavigationBarDividerColor(lightGray)
    return () => {
      // @ts-ignore
      isReadyRef.current = false
    }
  }, [isDark])

  useEffect(() => {
    const loadAccount = async () => {
      const rlyAccount = await getAccount()
      setHasLoadedAccount(true)

      if (!rlyAccount) {
        return
      }

      setAct(rlyAccount)
      navigate('USER_SCREEN')
    }
    loadAccount()
  }, [setAct])

  if (!hasLoadedAccount) {
    return (
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          // @ts-ignore
          isReadyRef.current = true
        }}
        theme={theme}
      >
        <View style={styles.loadingScreenContainer}>
          <ActivityIndicator size="large" color={secondary} />
        </View>
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        // @ts-ignore
        isReadyRef.current = true
      }}
      theme={theme}
    >
      <StatusBar backgroundColor={isDark ? black : white} barStyle={color} />
      <Stack.Navigator initialRouteName="GAME_SCREEN">
        <Stack.Group
          screenOptions={{
            headerShown: false,
            presentation: 'transparentModal',
            animation: 'fade',
            gestureEnabled: false,
          }}
        >
          <Stack.Screen name="GAME_SCREEN" component={GameScreen} />
          <Stack.Screen name="PLAN_SCREEN" component={PlanScreen} />
          <Stack.Screen name="REPORT_SCREEN" component={ReportScreen} />
          <Stack.Screen name="REPORTS_SCREEN" component={ReportsScreen} />
          <Stack.Screen name="UI_KIT_SCREEN" component={UiKit} />
          <Stack.Screen name="USER_SCREEN" component={UserScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  loadingScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Sentry.withProfiler(App)
