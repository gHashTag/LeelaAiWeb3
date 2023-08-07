/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { SafeAreaView, useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useTranslation } from 'react-i18next'
import {
  // GameBoard,
  Dice,
  // Gem,
  Text,
  Space,
  MarkdownView,
  Button,
  PlanAvatar,
} from 'components'

import useLeelaGame from 'hooks/useLeelaGame'

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
  const { t } = useTranslation()

  const isDarkMode = useColorScheme() === 'dark'
  const { player, rollHistory, planHistory, rollDice, lastRoll } =
    useLeelaGame()
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  }

  // const plansPlayers = [
  //   {
  //     id: 2,
  //     plan: 72,
  //     uri: 106,
  //   },
  //   {
  //     id: 4,
  //     plan: 34,
  //     uri: 'https://bafkreiftrmfmimlvo26xaxfvt2ypnjjaavq5mgnkjljs6mczfekii4cmtq.ipfs.nftstorage.link/',
  //   },
  // ]
  const avaUrl =
    'https://bafkreiftrmfmimlvo26xaxfvt2ypnjjaavq5mgnkjljs6mczfekii4cmtq.ipfs.nftstorage.link/'

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={backgroundStyle}>
        <Space height={150} />
        <PlanAvatar
          plan={1}
          size="large"
          avaUrl={avaUrl}
          isAccept={true}
          onPress={() => {
            // Обработчик для нажатия на аватар
            console.log('Avatar Pressed')
          }}
        />

        {/* <Button title={t('buy')} onPress={() => console.log('click')} />
        <Text h={'h2'} title={t('takeStep')} />
        <Space height={150} />
        <Dice rollDice={rollDice} lastRoll={lastRoll} size="large" />
        <Space height={150} /> */}

        {/* <MarkdownView /> */}
        {/* <GameBoard players={plansPlayers} />
        <Space height={50} />

       
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
