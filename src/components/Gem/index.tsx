import React from 'react'
import { View, Image, Pressable } from 'react-native'
import { ScaledSheet, ms } from 'react-native-size-matters'
import { ICONS } from './images'
import { gray } from 'cons'
import { Text } from '../Text'
import { GemProps } from 'types'

const Gem: React.FC<GemProps> = ({ player, planNumber, onPress }) => {
  const { container, gems, circle } = styles
  if (player !== undefined) {
    console.log('player', player)
  }

  const uri = player?.uri
  let source

  if (uri && typeof uri === 'number' && uri >= 1 && uri <= 6) {
    source = ICONS[uri - 1]
  } else if (
    player?.uri &&
    typeof player.uri === 'string' &&
    player.uri !== ''
  ) {
    source = { uri: player.uri }
  } else {
    source = ICONS[0]
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
            <Image style={gems} source={source} testID="gem-image" />
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
    zIndex: 2,
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
