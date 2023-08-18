import React, { ReactNode } from 'react'

import { ScrollView, StyleSheet, View } from 'react-native'

import { useTheme } from '@react-navigation/native'
import { Header, Space } from 'components'
import { H, W, black, lightGray } from 'cons'
import { useGlobalBackground, useProfile } from 'hooks'
import { useRecoilState } from 'recoil'
import { account } from 'state'

interface BackgroundProps {
  children: ReactNode
  isScrollView?: boolean
  isShowHeader?: boolean
  isFlatList?: boolean
}

const Background: React.FC<BackgroundProps> = ({
  children,
  isScrollView = false,
  isShowHeader = true,
  isFlatList = false,
}) => {
  const { profileData } = useProfile()
  const [rlyAccount] = useRecoilState(account)
  const backgroundStyle = useGlobalBackground()

  if (isScrollView) {
    return (
      <View style={[backgroundStyle, styles.container]}>
        <Space height={60} />
        {rlyAccount && isShowHeader && <Header avatar={profileData.avatar} />}
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false} // Убираем индикатор скролла
        >
          {children}
        </ScrollView>
      </View>
    )
  }

  if (isFlatList) {
    return (
      <View style={[backgroundStyle, styles.flatlistStyle]}>
        <Space height={60} />
        {rlyAccount && isShowHeader && <Header avatar={profileData.avatar} />}
        {children}
      </View>
    )
  }

  return (
    <View style={[backgroundStyle, styles.container]}>
      <Space height={60} />
      {rlyAccount && isShowHeader && <Header avatar={profileData.avatar} />}
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
