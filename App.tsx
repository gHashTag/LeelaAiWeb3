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
  Avatar,
  ReportCard,
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

const post = {
  id: 1,
  text: 'This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text.',
  createTime: 1669990226,
  liked: ['user1', 'user2'],
  comments: [
    {
      id: 'comment1',
      text: 'This is the first comment.',
      createTime: 1669990227,
    },
    {
      id: 'comment2',
      text: 'This is the second comment.',
      createTime: 1669990228,
    },
  ],
  plan: 3,
  accept: true,
  ownerId: 'user123', // Добавьте значение для ownerId
  systemMessage: 'Some system message', // Добавьте значение для systemMessage
  planText: 'Plan text', // Добавьте значение для planText
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

function App(): JSX.Element {
  const { t } = useTranslation()

  const isDarkMode = useColorScheme() === 'dark'
  const { player, rollHistory, planHistory, rollDice, lastRoll } =
    useLeelaGame()
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  }

  const fullName = 'John Doe'
  const isAdmin = true
  const isLiked = true
  const likeCount = 10
  const commCount = 5
  const date = '2023-08-07'
  // Определите все необходимые обработчики событий
  const handleProfile = () => {
    // Обработчик для нажатия на профиль пользователя
    console.log('Profile Pressed')
  }

  const handleTranslate = () => {
    // Обработчик для перевода
    console.log('Translate Pressed')
  }

  const handlePressWand = async () => {
    // Обработчик для перевода с помощью искусственного интеллекта
    console.log('Wand Pressed')
  }

  const handleAdminMenu = () => {
    // Обработчик для меню администратора
    console.log('Admin Menu Pressed')
  }

  const handleShareLink = () => {
    // Обработчик для поделиться ссылкой на пост
    console.log('Share Link Pressed')
  }

  const handleLike = () => {
    // Обработчик для лайка поста
    console.log('Like Pressed')
  }

  const handleComment = () => {
    // Обработчик для комментирования поста
    console.log('Comment Pressed')
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={backgroundStyle}>
        <Space height={150} />
        <ReportCard
          post={post}
          isDetail={false}
          fullName={fullName}
          avaUrl={avaUrl}
          isAdmin={isAdmin}
          isLiked={isLiked}
          likeCount={likeCount}
          commCount={commCount}
          date={date}
          handleProfile={handleProfile}
          handleTranslate={handleTranslate}
          handlePressWand={handlePressWand}
          handleAdminMenu={handleAdminMenu}
          handleShareLink={handleShareLink}
          handleLike={handleLike}
          handleComment={handleComment}
        />
        {/* <Avatar
          plan={1}
          size="large"
          avaUrl={avaUrl}
          isAccept={true}
          onPress={() => {
            // Обработчик для нажатия на аватар
            console.log('Avatar Pressed')
          }}
        /> */}

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
