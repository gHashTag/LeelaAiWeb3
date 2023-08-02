import React from 'react'
import {Image, View} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {runOnJS} from 'react-native-reanimated'
import {ScaledSheet, ms} from 'react-native-size-matters'
import {ICONS} from './images'

interface GemProps {
  playerNumber: number
  onPress: () => void
}

const Gem: React.FC<GemProps> = ({playerNumber, onPress}) => {
  const {container, gems} = styles

  const source = () => {
    if (playerNumber >= 1 && playerNumber <= 6) {
      return ICONS[playerNumber - 1]
    } else {
      return ICONS[0] // Replace with the default image
    }
  }

  return (
    <GestureDetector
      gesture={Gesture.Tap().onTouchesUp(() => runOnJS(onPress))}>
      <View style={container}>
        <Image style={gems} source={source()} />
      </View>
    </GestureDetector>
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
})

export {Gem}
