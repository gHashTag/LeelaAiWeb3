import React, { memo } from 'react'

import { Platform, View, StyleSheet } from 'react-native'

import { Avatar, ButtonCircle } from 'components'
import { W } from 'cons'
import { goBack, navigate } from 'cons/RootNavigation'
import _ from 'lodash'
import { mvs, s, vs } from 'react-native-size-matters'

const isIos = Platform.OS === 'ios'

interface HeaderT {
  avatar?: string
  onPress?: () => void | null
  onPressRight?: () => void
  onPressCenter?: () => void
  isCenterButton: boolean
  plan: number
}

const Header = memo<HeaderT>(
  ({
    avatar,
    onPress = () => {
      goBack()
    },
    onPressCenter = () => {
      navigate('PLAYER_SCREEN')
    },
    onPressRight = () => {
      navigate('PLANS_SCREEN')
    },
    isCenterButton = true,
    plan = 58,
  }) => {
    const debouncedOnPress = _.debounce((handler) => handler(), 500)

    let centerButton = null
    if (isCenterButton && avatar) {
      centerButton = (
        <Avatar
          plan={plan}
          size="medium"
          avatar={avatar}
          isAccept={true}
          onPress={() => debouncedOnPress(onPressCenter)}
        />
      )
    }

    return (
      <View style={styles.container}>
        <ButtonCircle
          name="arrow-back"
          isIonicons
          size={30}
          onPress={() => debouncedOnPress(onPress)}
        />
        <View style={styles.flexOne}>{centerButton}</View>
        <ButtonCircle
          name="book"
          isIonicons
          size={30}
          onPress={() => debouncedOnPress(onPressRight)}
        />
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: mvs(1, 0.4),
    width: W - 40,
    zIndex: 20,
  },
  flexOne: {
    alignSelf: 'center',
    bottom: 8,
  },
  pressStyle: {
    bottom: 3,
  },
  rightViewStyle: {
    width: isIos ? s(60) : s(44),
  },
  titleStyle: {
    fontSize: vs(18),
  },
})

export { Header }
