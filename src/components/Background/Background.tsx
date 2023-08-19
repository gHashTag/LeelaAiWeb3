import React, { ReactNode } from 'react'

import { ScrollView, StyleSheet, View } from 'react-native'

import { Header, Space } from 'components'
import { W } from 'cons'
import { useGlobalBackground, useProfile } from 'hooks'
import { useAccount } from 'store'

interface BackgroundProps {
  children: ReactNode
  isScrollView?: boolean
  isShowHeader?: boolean
  isFlatList?: boolean
  isCenterButton?: boolean
}

const Background: React.FC<BackgroundProps> = ({
  children,
  isScrollView = false,
  isShowHeader = true,
  isFlatList = false,
  isCenterButton = true,
}) => {
  const { profileData } = useProfile()
  const [account] = useAccount()

  const backgroundStyle = useGlobalBackground()
  const avatar = profileData?.createPlayer?.avatar
  const plan = profileData?.createPlayer?.plan
  if (isScrollView) {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <Space height={60} />
          {account && isShowHeader && (
            <Header
              avatar={avatar}
              isCenterButton={isCenterButton}
              plan={plan}
            />
          )}
          {children}
        </ScrollView>
      </View>
    )
  }

  if (isFlatList) {
    return (
      <View style={[backgroundStyle, styles.flatlistStyle]}>
        <Space height={60} />
        {account && isShowHeader && (
          <Header avatar={avatar} isCenterButton={isCenterButton} plan={plan} />
        )}
        {children}
      </View>
    )
  }

  return (
    <View style={[backgroundStyle, styles.container]}>
      <Space height={60} />
      {account && isShowHeader && (
        <Header avatar={avatar} isCenterButton={isCenterButton} plan={plan} />
      )}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    top: 20,
  },
  flatlistStyle: {
    alignItems: 'center',
  },
  scrollViewContent: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-start',
    width: W,
  },
})

export { Background }
