import React, { ReactNode } from 'react'

import { StyleSheet, View } from 'react-native'

import { ApolloError } from '@apollo/client'
import { useTheme } from '@react-navigation/native'
import { CenterView } from 'components/CenterView'
import { Display } from 'components/Display'
import { Loader } from 'components/Loader'
import { black, lightGray, red } from 'cons'

interface Error {
  message: string
}
interface LayoutProps {
  children?: ReactNode
  loading: boolean
  error?: ApolloError | Error
}

const Layout: React.FC<LayoutProps> = ({ children, loading, error }) => {
  const { dark } = useTheme()
  const backgroundColor = dark ? black : lightGray

  const backgroundStyle = [styles.background, { backgroundColor }]

  const checkError = error?.message !== '' && error

  return (
    <View style={backgroundStyle}>
      {loading && (
        <CenterView>
          <Loader size="large" />
        </CenterView>
      )}
      {checkError && (
        <CenterView>
          <Display title={error.message} onColor={red} />
        </CenterView>
      )}
      {!loading && !checkError && children}
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    flex: 1,
  },
})

export { Layout }
