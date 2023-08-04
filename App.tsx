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
import {GameBoard, Dice, Gem, Text, MarkdownView} from './src/components'
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
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  }

  const plansPlayers = [
    {
      id: 2,
      plan: 72,
      uri: 106,
    },
    {
      id: 4,
      plan: 34,
      uri: 'https://bafkreiftrmfmimlvo26xaxfvt2ypnjjaavq5mgnkjljs6mczfekii4cmtq.ipfs.nftstorage.link/',
    },
  ]

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={backgroundStyle}>
        {/* <Text h={'h2'} title={'Test Title'} /> */}

        <MarkdownView />
        {/* <GameBoard players={plansPlayers} />
        <Space height={50} />

        <Dice rollDice={rollDice} lastRoll={lastRoll} size="medium" />
        {plansPlayers.map(gem => (
          <Gem
            key={gem.id}
            planNumber={gem.plan}
            player={{id: gem.id, uri: gem.uri}}
          />
        ))} */}
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default App
