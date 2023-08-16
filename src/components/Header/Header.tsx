import React, { memo } from 'react'

import { Platform, View } from 'react-native'

import { Avatar, ButtonCircle } from 'components'
import { navigate } from 'cons/RootNavigation'
import { ScaledSheet, ms, mvs, s, vs } from 'react-native-size-matters'

const isIos = Platform.OS === 'ios'

interface HeaderT {
  avatar?: string
  onPress?: () => void | null
  onPressRight?: () => void
  children?: React.ReactNode
  hidestar?: boolean
}

const Header = memo<HeaderT>(
  ({
    onPress = () => {
      navigate('RULES_SCREEN')
    },
    onPressRight = () => {
      navigate('PLANS_SCREEN')
    },

    avatar,
  }) => {
    return (
      <View style={styles.container}>
        {
          <ButtonCircle
            name="arrow-back"
            isIonicons
            size={40}
            onPress={onPress}
          />
        }

        <View style={styles.flexOne}>
          {avatar && (
            <Avatar
              plan={1}
              size="large"
              avatar={avatar}
              isAccept={true}
              onPress={() => {
                // Обработчик для нажатия на аватар
                console.log('Avatar Pressed')
              }}
            />
          )}
        </View>

        <ButtonCircle name="book" isIonicons size={40} onPress={onPressRight} />
      </View>
    )
  },
)

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: mvs(1, 0.4),
    zIndex: 20,
  },
  rightViewStyle: {
    width: isIos ? s(60) : s(44),
  },
  titleStyle: {
    fontSize: vs(18),
  },
  childrenStyle: {},
  flexOne: { flex: 1 },
  pressStyle: {
    bottom: 3,
  },
})

export { Header }