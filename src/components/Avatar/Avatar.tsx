import React, { memo } from 'react'

import {
  ImageBackground,
  ImageStyle,
  Pressable,
  StyleProp,
  View,
} from 'react-native'

import { useTheme } from '@react-navigation/native'
import { Text } from 'components'
import { orange } from 'cons'
import { ms, s, ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'

interface AvatarI {
  plan: number
  size: 'xLarge' | 'large' | 'medium' | 'small'
  avatar?: string
  isAccept?: boolean
  additionalStyle?: StyleProp<ImageStyle>
  onPress?: () => void
  testID: string
}

const Avatar = memo<AvatarI>(
  ({
    size = 'medium',
    plan,
    avatar,
    additionalStyle,
    isAccept,
    onPress,
    testID,
  }) => {
    const {
      colors: { background },
    } = useTheme()

    const textPlan = plan < 10 ? `0${plan}` : `${plan}`
    const fontSize = size === 'small' ? s(6) : s(10)
    const badgeS =
      size === 'small' || size === 'medium'
        ? styles.smallBadge
        : styles.bigBadge
    return (
      <Pressable onPress={onPress} testID={testID}>
        <ImageBackground
          source={{ uri: avatar }}
          style={[styles[size], styles.img, additionalStyle]}
          imageStyle={styles.container}
        >
          <View style={[styles.badge, badgeS, { backgroundColor: background }]}>
            {!isAccept ? (
              <Ionicons
                size={s(15)}
                color={orange}
                name="time-sharp"
                testID="time-icon"
              />
            ) : (
              <Text
                testID="avatar-title"
                textStyle={{ fontSize }}
                title={textPlan}
                h="h5"
              />
            )}
          </View>
        </ImageBackground>
      </Pressable>
    )
  },
)

const styles = ScaledSheet.create({
  xLarge: {
    marginLeft: 1,
    width: ms(130),
    height: ms(130),
  },
  large: {
    marginLeft: 1,
    width: s(55),
    height: s(55),
  },
  medium: {
    width: ms(50, 0.9),
    height: ms(50, 0.9),
  },
  small: {
    width: s(36),
    height: s(36),
  },
  container: {
    borderRadius: ms(130),
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: s(180),
    flexDirection: 'row',
    position: 'absolute',
    padding: s(4),
  },
  smallBadge: {
    right: s(-1),
    bottom: s(1),
  },
  bigBadge: {
    right: s(-1),
    bottom: s(2),
  },
  card: {
    width: ms(50, 0.9),
    height: ms(50, 0.9),
    alignContent: 'center',
  },
  img: {
    marginTop: -10,
    left: 1,
  },
})

export { Avatar }
