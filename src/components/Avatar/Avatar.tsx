import React, { memo } from 'react'

import {
  ActivityIndicator,
  ImageBackground,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native'

import { useTheme } from '@react-navigation/native'
import { Text } from 'components'
import { orange, secondary } from 'cons'
import { ms, s } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'

interface AvatarI {
  plan: number
  size: 'xLarge' | 'large' | 'medium' | 'small'
  avatar: string
  isAccept?: boolean
  additionalStyle?: StyleProp<ImageStyle>
  onPress?: () => void
  testID?: string
  showIcon?: boolean
  isLoading?: boolean
}

const Avatar = memo<AvatarI>(
  ({
    size = 'medium',
    plan,
    avatar,
    additionalStyle,
    isAccept,
    showIcon = true,
    onPress,
    testID = 'avatar',
    isLoading = false,
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
    console.log('background', background)
    return (
      <Pressable onPress={onPress} testID={testID}>
        {/* @ts-ignore */}

        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator size="large" color={secondary} />
          ) : avatar ? (
            <ImageBackground
              source={{ uri: avatar }}
              style={[styles[size], additionalStyle]}
              imageStyle={styles.container}
            >
              <View
                style={[styles.badge, badgeS, { backgroundColor: background }]}
              >
                {!isAccept ? (
                  showIcon && (
                    <Ionicons
                      size={s(15)}
                      color={orange}
                      name="time-sharp"
                      testID="time-icon"
                    />
                  )
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
          ) : (
            <Text
              h={'h2'}
              testID="add-image-text"
              title="add image"
              textStyle={styles.textStyle}
            />
          )}
        </View>
      </Pressable>
    )
  },
)

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    borderRadius: s(180),
    flexDirection: 'row',
    justifyContent: 'center',
    padding: s(4),
    position: 'absolute',
  },
  bigBadge: {
    bottom: s(2),
    right: s(-1),
  },
  card: {
    alignItems: 'center',
    borderRadius: s(70),
    height: ms(130, 0.9),
    justifyContent: 'center',
    width: ms(130, 0.9),
  },
  container: {
    alignItems: 'center',
    borderRadius: ms(130),
    justifyContent: 'center',
  },
  large: {
    height: s(55),
    marginLeft: 1,
    width: s(55),
  },
  medium: {
    height: ms(50, 0.9),
    width: ms(50, 0.9),
  },
  small: {
    height: s(36),
    width: s(36),
  },
  smallBadge: {
    bottom: s(1),
    right: s(-1),
  },
  textStyle: {
    alignSelf: 'center',
    lineHeight: 30,
    textAlign: 'center',
    width: 100,
  },
  xLarge: {
    borderRadius: s(70),
    height: ms(134),
    justifyContent: 'center',
    marginLeft: 1,
    width: ms(134),
  },
})

export { Avatar }
