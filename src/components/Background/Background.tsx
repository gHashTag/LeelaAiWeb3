import React, { ReactNode } from 'react'

import { ScrollView, StyleSheet, View } from 'react-native'

import { Header, Space } from 'components'
import { W } from 'cons'
import { useGlobalBackground } from 'hooks'
import { ProfileData } from 'types'

interface BackgroundProps {
  children: ReactNode
  isScrollView?: boolean
  isShowHeader?: boolean
  isFlatList?: boolean
  isCenterButton?: boolean
  profileData: ProfileData
}

const Background: React.FC<BackgroundProps> = ({
  children,
  isScrollView = false,
  isShowHeader = true,
  isFlatList = false,
  isCenterButton = true,
  profileData,
}) => {
  const backgroundStyle = useGlobalBackground()

  const avatar = profileData?.createPlayer?.avatar
  const plan = profileData?.createPlayer?.plan
  const account = profileData?.createPlayer?.rallyAccount

  if (isScrollView) {
    return (
      <View style={[backgroundStyle, styles.flatlistStyle]}>
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
