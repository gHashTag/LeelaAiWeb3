/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import {SafeAreaView, useColorScheme} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import {Dice, Gem, Text} from './src/components'

const diceProps = {
  count: 6,
  players: 4,
  disabled: false,
  canGo: true,
  isReported: false,
  updateStep: () => {
    // Implement the logic for updating steps here
  },
  random: () => {
    // Implement the logic for rolling the dice randomly here
  },
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={backgroundStyle}>
        <Text h={'h2'} title={'Test Title'} />
        <Dice {...diceProps} />
        <Gem playerNumber={7} onPress={() => console.log('click')} />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default App
