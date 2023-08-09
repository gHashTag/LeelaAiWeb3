import React, { memo } from 'react'
import { useTheme } from '@react-navigation/native'
import {
  ImageBackground,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native'
import { ms, s } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Text } from 'components'
import { orange } from 'cons'

interface AvatarI {
  plan: number
  size: 'xLarge' | 'large' | 'medium' | 'small'
  avaUrl?: string
  isAccept?: boolean
  aditionalStyle?: StyleProp<ImageStyle>
  onPress?: () => void
}

const Avatar = memo<AvatarI>(
  ({ size = 'medium', plan, avaUrl, aditionalStyle, isAccept, onPress }) => {
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
      <Pressable onPress={onPress}>
        <ImageBackground
          source={{ uri: avaUrl }}
          style={[styles[size], styles.img, aditionalStyle]}
          imageStyle={styles.container}
        >
          <View style={[styles.badge, badgeS, { backgroundColor: background }]}>
            {!isAccept ? (
              <Ionicons size={s(15)} color={orange} name="time-sharp" />
            ) : (
              <Text textStyle={{ fontSize }} title={textPlan} h="h12" />
            )}
          </View>
        </ImageBackground>
      </Pressable>
    )
  },
)

const styles = StyleSheet.create({
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
    padding: s(2),
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
