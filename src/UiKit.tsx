/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
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
  CommentBubbleLeft,
  CommentBubbleRight,
  NeomorphBlurView,
  Avatar,
} from 'components'

import { useLeelaGame } from 'hooks/useLeelaGame/useLeelaGame'
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
  isAdmin,
  isLiked,
  likeCount,
  plansPlayers,
  post,
} from 'cons/mockdata'

function UiKit(): JSX.Element {
  const { rollDice, lastRoll } = useLeelaGame()
  //const { player, rollHistory, planHistory, rollDice, lastRoll } = useLeelaGame()

  const { t } = useTranslation()

  return (
    <ScrollView>
      <Space height={40} />
      <NeomorphBlurView />
      <Space height={40} />

      <Space height={40} />
      <ReportCard
        id={'1'}
        post={post}
        fullName={fullName}
        avaUrl={avaUrl}
        isAdmin={isAdmin}
        isLiked={isLiked}
        likeCount={likeCount}
        commCount={commCount}
        date={date}
        handleProfile={handleProfile}
        handlePressWand={handlePressWand}
        handleAdminMenu={handleAdminMenu}
        handleShareLink={handleShareLink}
        handleLike={handleLike}
        handleComment={handleComment}
      />
      <Space height={40} />
      <CommentBubbleRight {...MockedCommentData} />
      <CommentBubbleLeft {...MockedCommentData} />
      <Space height={140} />
      <Dice rollDice={rollDice} lastRoll={lastRoll} size="large" />

      <Space height={40} />

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

      <Avatar
        avaUrl={avaUrl}
        onPress={handleProfile}
        size={'medium'}
        plan={post.plan as number}
        isAccept={post.accept}
      />
    </ScrollView>
  )
}

export default UiKit
