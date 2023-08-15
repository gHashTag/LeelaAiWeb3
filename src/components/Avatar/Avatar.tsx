import React, { memo } from 'react'

import {
  ActivityIndicator,
  ImageBackground,
  ImageStyle,
  Pressable,
  StyleProp,
  View,
} from 'react-native'

import { useTheme } from '@react-navigation/native'
import { NeomorphView, Text } from 'components'
import { orange, secondary } from 'cons'
import { ms, s, ScaledSheet } from 'react-native-size-matters'
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
  isLoading: boolean
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
    isLoading = true,
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
        {/* @ts-ignore */}
        <NeomorphView viewStyle={styles.card}>
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
                  style={[
                    styles.badge,
                    badgeS,
                    { backgroundColor: background },
                  ]}
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
        </NeomorphView>
      </Pressable>
    )
  },
)

const styles = ScaledSheet.create({
  xLarge: {
    marginLeft: 1,
    width: ms(130),
    height: ms(130),
    borderRadius: s(130),
    justifyContent: 'center',
  },
  card: {
    width: ms(130, 0.9),
    height: ms(130, 0.9),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: s(65),
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
    justifyContent: 'center',
    alignItems: 'center',
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
  textStyle: {
    width: 100,
    textAlign: 'center',
    lineHeight: 30,
    alignSelf: 'center',
  },
})

export { Avatar }
