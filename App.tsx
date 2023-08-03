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
import {GameBoard, Dice, Gem, Text} from './src/components'
import {Space} from './src/components/Space'
import useLeelaGame from './src/hooks/useLeelaGame'

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
  const {player, rollHistory, planHistory, rollDice, lastRoll} = useLeelaGame()
  const backgroundStyle = {
    backgroundColor: !isDarkMode ? Colors.darker : Colors.white,
  }

  const players = [{101: 8}, {102: 72}, {106: 34}]
  console.warn('lastRoll', lastRoll)
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={backgroundStyle}>
        <Text h={'h2'} title={'Test Title'} />
        <Dice rollDice={rollDice} lastRoll={lastRoll} size="medium" />
        <Gem planNumber={1} />
        <Gem planNumber={101} />
        {/* <GameBoard players={players} /> */}
        <Space height={50} />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default App
