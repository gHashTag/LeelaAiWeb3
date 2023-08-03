import React from 'react'
import {View, Image, Pressable} from 'react-native'
import {ScaledSheet, ms} from 'react-native-size-matters'
import {ICONS} from './images'
import {gray} from '../../constants'
import {Text} from '../Text'

interface GemProps {
  planNumber: number
  player?: {
    id: number
    uri: string | number
  }
  onPress?: () => void
}

const Gem: React.FC<GemProps> = ({planNumber, player, onPress}) => {
  const {container, gems, circle} = styles

  const source =
    player?.uri &&
    typeof player.uri === 'number' &&
    player.uri >= 101 &&
    player.uri <= 106
      ? ICONS[player.uri - 101]
      : player?.uri && typeof player.uri === 'string' && player.uri !== ''
      ? {uri: player.uri}
      : ICONS[0]

  const isNumberVisible = !player && planNumber !== 68

  return (
    <Pressable onPress={onPress} testID="gem-container">
      <View style={container}>
        {isNumberVisible ? (
          <View style={[circle, gems]} testID="gem-image">
            <Text h={'h11'} title={planNumber.toString()} oneColor={gray} />
          </View>
        ) : (
          <Image style={gems} source={source} testID="gem-image" />
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
})

export {Gem}
