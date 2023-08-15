import React from 'react'

import { RALLY_API_KEY } from '@env'
import { RlyMumbaiNetwork, Network } from '@rly-network/mobile-sdk'
import * as Sentry from '@sentry/react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ScaledSheet } from 'react-native-size-matters'
import VersionInfo from 'react-native-version-info'
import { RecoilRoot } from 'recoil'

import Navigation from './Navigation'

export const RlyNetwork: Network = RlyMumbaiNetwork
RlyNetwork.setApiKey(RALLY_API_KEY)

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation()

Sentry.init({
  dsn: 'https://1d8f316fe05b48f9b712acf5035683fb@o749286.ingest.sentry.io/5791363',
  release: `leela@${VersionInfo.appVersion}.${VersionInfo.buildVersion}`,
  tracesSampleRate: 0.2,
  integrations: [
    new Sentry.ReactNativeTracing({
      tracingOrigins: ['localhost', /^\//],
      routingInstrumentation,
    }),
  ],
  enabled: process.env.NODE_ENV !== 'development',
})

function AppWithProviders() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.flexOne}>
        <RecoilRoot>
          <Navigation />
        </RecoilRoot>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

const styles = ScaledSheet.create({
  flexOne: { flex: 1 },
})

export default Sentry.wrap(AppWithProviders)
