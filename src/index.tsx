import React from 'react'

import { StyleSheet } from 'react-native'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { RALLY_API_KEY } from '@env'
import { RlyMumbaiNetwork, Network } from '@rly-network/mobile-sdk'
import * as Sentry from '@sentry/react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import VersionInfo from 'react-native-version-info'
import { RecoilRoot } from 'recoil'

import Navigation from './Navigation'

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
})

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
          <ApolloProvider client={client}>
            <Navigation />
          </ApolloProvider>
        </RecoilRoot>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  flexOne: { flex: 1 },
})

export default Sentry.wrap(AppWithProviders)
