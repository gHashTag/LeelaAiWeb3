import React, { memo } from 'react'

import {
  ImageBackground,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native'

import { useTheme } from '@react-navigation/native'
import { NeomorphView, Text, Loader } from 'components'
import { gray } from 'cons'
import { ms, s } from 'react-native-size-matters'
import Foundation from 'react-native-vector-icons/Foundation'

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
    onPress,
    testID = 'avatar',
    isLoading = false,
  }) => {
    const {
      colors: { background },
    } = useTheme()

    const textPlan = Number(plan) < 10 ? `0${plan}` : `${plan}`

    let fontSize
    if (size === 'small') {
      fontSize = s(6)
    } else if (size === 'xLarge') {
      fontSize = s(15)
    } else {
      fontSize = s(10)
    }

    let badgeS
    if (size === 'small' || size === 'medium') {
      badgeS = styles.smallBadge
    } else {
      badgeS = styles.bigBadge
    }

    const newSize = [styles[size]]

    let iconSize
    if (size === 'small') {
      iconSize = s(10)
    } else if (size === 'medium') {
      iconSize = s(25)
    } else if (size === 'xLarge') {
      iconSize = s(50)
    } else {
      iconSize = s(50)
    }
    return (
      <Pressable onPress={onPress} testID={testID}>
        <NeomorphView
          viewStyle={{ ...styles.card, ...newSize[0] }}
          borderRadius={80}
        >
          <View style={styles.container}>
            {isLoading ? (
              <Loader size={size} />
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
                  <Text
                    testID="avatar-title"
                    textStyle={[styles.plan, { fontSize }]}
                    title={textPlan}
                    h="h5"
                  />
                </View>
              </ImageBackground>
            ) : (
              <Foundation name="plus" size={iconSize} color={gray} />
            )}
          </View>
        </NeomorphView>
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
    alignSelf: 'center',
    bottom: s(-15),
    height: s(30),
    width: s(30),
  },
  card: {
    alignItems: 'center',
    borderRadius: s(60),
    height: s(65),
    justifyContent: 'center',
    width: s(65),
  },
  container: {
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: ms(130),
    justifyContent: 'center',
  },
  large: {
    height: s(70),
    width: s(70),
  },
  medium: {
    height: ms(55, 0.9),
    width: ms(55, 0.9),
  },
  plan: {
    left: 0.5,
    top: 1,
  },
  small: {
    height: s(36),
    width: s(36),
  },
  smallBadge: {
    alignSelf: 'center',
    bottom: s(-8),
  },
  textStyle: {
    alignSelf: 'center',
    lineHeight: 23,
    textAlign: 'center',
    top: 5,
    width: 110,
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
