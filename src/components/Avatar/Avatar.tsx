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
import { NeomorphView, Text } from 'components'
import { orange, secondary } from 'cons'
import { useTranslation } from 'react-i18next'
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
    const { t } = useTranslation()
    const textPlan = plan < 10 ? `0${plan}` : `${plan}`
    const fontSize = size === 'small' ? s(6) : s(10)
    const badgeS =
      size === 'small' || size === 'medium'
        ? styles.smallBadge
        : styles.bigBadge

    const newSize = [styles[size]]
    console.log('newSize', newSize)
    return (
      <Pressable onPress={onPress} testID={testID}>
        <NeomorphView viewStyle={{ ...styles.card, ...newSize[0] }}>
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
                      textStyle={[styles.plan, { fontSize }]}
                      title={textPlan}
                      h="h5"
                    />
                  )}
                </View>
              </ImageBackground>
            ) : (
              <Text
                h={'h3'}
                testID="add-image-text"
                title={t('auth.addImage')}
                textStyle={styles.textStyle}
              />
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
    bottom: s(2),
    right: s(-1),
  },
  card: {
    alignItems: 'center',
    borderRadius: s(60),
    height: s(65),
    justifyContent: 'center',
    width: s(65),
  },
  container: {
    alignItems: 'center',
    borderRadius: ms(130),
    justifyContent: 'center',
  },
  large: {
    height: s(55),
    width: s(55),
  },
  medium: {
    height: ms(50, 0.9),
    width: ms(50, 0.9),
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
    bottom: s(1),
    right: s(-1),
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
