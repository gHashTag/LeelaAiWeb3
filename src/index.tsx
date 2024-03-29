import React from 'react'

import { StyleSheet } from 'react-native'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'
import { RALLY_API_KEY, SENTRY_DSN, THE_GRAPH_API } from '@env'
import { RlyMumbaiNetwork, Network } from '@rly-network/mobile-sdk'
import * as Sentry from '@sentry/react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import VersionInfo from 'react-native-version-info'
import { RecoilRoot } from 'recoil'

import Navigation from './Navigation'
console.log('THE_GRAPH_API', THE_GRAPH_API)

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages()
  loadErrorMessages()
}
// Create an Apollo Client instance
const client = new ApolloClient({
  // uri: 'http://localhost:4000/',
  uri: THE_GRAPH_API,
  cache: new InMemoryCache(),
})

export const RlyNetwork: Network = RlyMumbaiNetwork
RlyNetwork.setApiKey(RALLY_API_KEY)

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation()

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

Sentry.init({
  dsn: SENTRY_DSN,
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

const styles = StyleSheet.create({
  flexOne: { flex: 1 },
})

export default Sentry.wrap(AppWithProviders)
