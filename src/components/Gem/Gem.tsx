import React from 'react'

import { View, Image, Pressable } from 'react-native'

import { gray } from 'cons'
import { ScaledSheet, ms } from 'react-native-size-matters'
import { GemProps } from 'types'

import { Text } from '../Text/Text'

const Gem: React.FC<GemProps> = ({ player, planNumber, onPress }) => {
  const { container, gems, circle } = styles

  let source

  if (player?.avatar) {
    if (typeof player.avatar === 'string' && player.avatar !== '') {
      source = { uri: player.avatar }
    } else if (typeof player.avatar === 'number') {
      source = player.avatar
    }
  }

  const isNumberVisible = !player && planNumber !== 68

  return (
    <Pressable onPress={onPress} testID="gem-container">
      <View style={container}>
        {isNumberVisible ? (
          <View style={[circle, gems]} testID="gem-image">
            <Text h={'h11'} title={planNumber.toString()} oneColor={gray} />
          </View>
        ) : (
          <View style={[styles.imgStyle, { zIndex: player?.id }]}>
            {source && (
              <Image style={gems} source={source} testID="gem-image" />
            )}
          </View>
        )}
      </View>
    </Pressable>
  )
}

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gems: {
    width: ms(42, 0.5),
    height: ms(42, 0.5),
    borderRadius: ms(42, 0.5) / 2,
  },
  circle: {
    width: ms(44),
    height: ms(44),
    borderRadius: ms(44) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  imgStyle: {
    position: 'absolute',
  },
})

export { Gem }
