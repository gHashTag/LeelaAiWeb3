/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native'
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import Orientation from 'react-native-orientation-locker'
import { useTranslation } from 'react-i18next'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { black, dimGray, lightGray, navRef, red, secondary, white } from 'cons'
import {
  Dice,
  Text,
  Space,
  //MarkdownView,
  Button,
  //Avatar,
  ReportCard,
  GameBoard,
  Gem,
  CommentBubble,
} from 'components'

import useLeelaGame from 'hooks/useLeelaGame'
import {
  MockedCommentData,
  avaUrl,
  commCount,
  date,
  fullName,
  handleAdminMenu,
  handleComment,
  handleLike,
  handlePressWand,
  handleProfile,
  handleShareLink,
  handleTranslate,
  isAdmin,
  isLiked,
  likeCount,
  plansPlayers,
  post,
} from 'cons/mockdata'

const DarkTheme = {
  dark: true,
  colors: {
    primary: secondary,
    background: black,
    card: white,
    text: white,
    border: dimGray,
    notification: red,
  },
}

const LightTheme = {
  dark: false,
  colors: {
    primary: secondary,
    background: white,
    card: white,
    text: black,
    border: dimGray,
    notification: red,
  },
}

function App(): JSX.Element {
  // Themes
  const isDark = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDark ? black : lightGray,
  }
  const theme = isDark ? DarkTheme : LightTheme
  const color = isDark ? 'light-content' : 'dark-content'

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(
      isDark ? black : white,
      isDark ? 'dark' : 'light',
    )
    SystemNavigationBar.setNavigationBarDividerColor(lightGray)
    Orientation.lockToPortrait()
  }, [isDark])

  const { rollDice, lastRoll } = useLeelaGame()
  //const { player, rollHistory, planHistory, rollDice, lastRoll } = useLeelaGame()

  const { t } = useTranslation()

  return (
    <NavigationContainer ref={navRef} theme={theme}>
      <StatusBar backgroundColor={isDark ? black : white} barStyle={color} />
      <GestureHandlerRootView>
        <SafeAreaView style={backgroundStyle}>
          <ScrollView
            contentContainerStyle={[backgroundStyle, styles.scrollSctyle]}
          >
            <Dice rollDice={rollDice} lastRoll={lastRoll} size="large" />

            <Space height={40} />
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

            <Space height={40} />
            <CommentBubble {...MockedCommentData} />
            <Space height={40} />
            <CommentBubble {...MockedCommentData} />
            <Space height={140} />
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

            <Button title={t('buy')} onPress={() => console.log('click')} />
            <Space height={40} />
            <Text h={'h2'} title={t('takeStep')} />
            <Space height={15} />

            {/* <MarkdownView /> */}
            <GameBoard players={plansPlayers} />
            <Space height={50} />

            {plansPlayers.map((gem) => (
              <Gem
                key={gem.id}
                planNumber={gem.plan}
                player={{ id: gem.id, uri: gem.uri }}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </GestureHandlerRootView>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  scrollSctyle: {
    alignItems: 'center',
  },
})

export default App
