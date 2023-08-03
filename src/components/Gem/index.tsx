import React from 'react'
import {View, Image, Pressable} from 'react-native'
import {ScaledSheet, ms} from 'react-native-size-matters'
import {ICONS} from './images'
import {gray} from '../../constants'
import {Text} from '../Text'

interface GemProps {
  planNumber: number
  onPress?: () => void
}

const Gem: React.FC<GemProps> = ({planNumber, onPress}) => {
  const {container, gems, circle} = styles

  const source = () => {
    if (planNumber >= 101 && planNumber <= 106) {
      return ICONS[planNumber - 101]
    } else {
      return ICONS[0] // Replace with the default image
    }
  }

  const isNumberVisible =
    planNumber !== 68 && planNumber >= 101 && planNumber <= 106

  return (
    <Pressable onPress={onPress}>
      <View style={container}>
        {isNumberVisible ? (
          <Image style={gems} source={source()} testID="gem-image" />
        ) : (
          <View style={[circle, gems]}>
            <Text
              h={'h11'}
              title={planNumber !== 68 ? planNumber.toString() : ' '}
              oneColor={gray}
            />
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
  numberText: {
    fontSize: ms(11),
    fontWeight: 'bold',
    color: 'white',
  },
  circle: {
    width: ms(44),
    height: ms(44),
    borderRadius: ms(44) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    // borderBlockColor: 'black',
    // borderWidth: 1,
    backgroundColor: 'transparent',
  },
})

export {Gem}
