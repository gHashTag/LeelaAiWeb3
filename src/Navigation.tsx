import React, { useEffect, useMemo, useState } from 'react'

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native'

import { useQuery } from '@apollo/client'
import { PUBLIC_KEY } from '@env'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getAccount } from '@rly-network/mobile-sdk'
import * as Sentry from '@sentry/react'
import { Header, HeaderT, Loader } from 'components'
import {
  navigationRef,
  isReadyRef,
  navigate,
  LightTheme,
  DarkTheme,
} from 'cons/navigation'
import { useLeelaGame } from 'hooks'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { useAccount } from 'store'
import { RootStackParamList } from 'types'
import UiKit from 'UiKit'

import { black, lightGray, white } from './cons'
import {
  ContinueScreen,
  WelcomeScreen,
  GameScreen,
  PlanScreen,
  PlansScreen,
  ReportScreen,
  ReportsScreen,
  PlayerScreen,
  SeedPhraseScreen,
  InfoScreen,
  PlayerEditScreen,
} from './screens'

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  const isDark = useColorScheme() === 'dark'
  const { currentPlayer } = useLeelaGame()
  const theme = isDark ? DarkTheme : LightTheme
  const color = isDark ? 'light-content' : 'dark-content'
  const [hasLoadedAccount, setHasLoadedAccount] = useState(false)
  const [account, setAccount] = useAccount()

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
        navigate('WELCOME_SCREEN')
        return
      }
      setAccount(rlyAccount)
    }
    loadAccount()
  }, [setAccount])

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
          <Loader size="large" />
        </View>
      </NavigationContainer>
    )
  }

  const header = ({
    leftName,
    onPress,
    isStartGame,
    isCenterButton,
    isRightButton,
  }: HeaderT) => {
    const { avatar, plan } = currentPlayer

    return (
      <Header
        avatar={avatar}
        plan={plan}
        leftName={leftName}
        onPress={onPress}
        isStartGame={isStartGame}
        isCenterButton={isCenterButton}
        isRightButton={isRightButton}
      />
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
      <Stack.Navigator
        initialRouteName="GAME_SCREEN" // WELCOME_SCREEN || REPORTS_SCREEN || GAME_SCREEN || REPORT_SCREEN
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Group
          screenOptions={{
            headerShown: true,
            animation: 'fade',
            gestureEnabled: false,
          }}
        >
          <Stack.Screen
            name="WELCOME_SCREEN"
            component={WelcomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="INFO_SCREEN"
            component={InfoScreen}
            options={{
              header: () => header({}),
            }}
          />
          <Stack.Screen
            name="CONTINUE_SCREEN"
            component={ContinueScreen}
            options={{
              header: () =>
                header({
                  isRightButton: false,
                }),
            }}
          />
          <Stack.Screen
            name="GAME_SCREEN"
            component={GameScreen}
            options={{
              header: () =>
                header({
                  leftName: 'information',
                  onPress: () => navigate('INFO_SCREEN'),
                }),
            }}
          />
          <Stack.Screen
            name="PLANS_SCREEN"
            component={PlansScreen}
            options={{
              header: () => header({}),
            }}
          />
          <Stack.Screen
            name="PLAN_SCREEN"
            component={PlanScreen}
            options={{
              header: () => header({}),
            }}
          />
          <Stack.Screen
            name="REPORT_SCREEN"
            component={ReportScreen}
            options={{
              header: () =>
                header({
                  leftName: 'information',
                  onPress: () => navigate('INFO_SCREEN'),
                }),
            }}
          />
          <Stack.Screen
            name="REPORTS_SCREEN"
            component={ReportsScreen}
            options={{
              header: () =>
                header({
                  leftName: 'information',
                  onPress: () => navigate('INFO_SCREEN'),
                }),
            }}
          />
          <Stack.Screen name="UI_KIT_SCREEN" component={UiKit} />
          <Stack.Screen
            name="PLAYER_SCREEN"
            component={PlayerScreen}
            options={({ route }) => {
              const isStartGame = route.params?.isStartGame ?? false
              return {
                header: () =>
                  header({
                    isStartGame: isStartGame,
                    isCenterButton: false,
                  }),
              }
            }}
          />
          <Stack.Screen
            name="PLAYER_EDIT_SCREEN"
            component={PlayerEditScreen}
            options={() => {
              return {
                header: () =>
                  header({ isRightButton: false, isCenterButton: false }),
              }
            }}
          />
          <Stack.Screen name="SEED_SCREEN" component={SeedPhraseScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  loadingScreenContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

export default Sentry.withProfiler(App)
