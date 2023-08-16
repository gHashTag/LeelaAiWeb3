/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'

import {
  Dice,
  Text,
  Space,
  Button,
  Avatar,
  ReportCard,
  CommentBubbleLeft,
  CommentBubbleRight,
  NeomorphBlurView,
  CenterView,
  Background,
} from 'components'
import {
  MockedCommentData,
  avatar,
  commCount,
  date,
  fullName,
  handleAdminMenu,
  handleComment,
  handleLike,
  handleProfile,
  handleShareLink,
  isAdmin,
  isLiked,
  likeCount,
  post,
} from 'cons/mockdata'
import { useLeelaGame } from 'hooks/useLeelaGame/useLeelaGame'
import { useTranslation } from 'react-i18next'

function UiKit(): JSX.Element {
  const { rollDice, lastRoll } = useLeelaGame()
  //const { player, rollHistory, planHistory, rollDice, lastRoll } = useLeelaGame()

  const { t } = useTranslation()

  return (
    <Background isScrollView>
      {/* <Space height={100} />
      <Text h={'h2'} title={t('takeStep')} />
      <Text h={'h3'} title={t('takeStep')} />
      <Text h={'h5'} title={t('takeStep')} />
      <Text h={'h4'} title={t('takeStep')} />

      <NeomorphBlurView />
      <Space height={40} />
*/}
      <Space height={200} />
      <ReportCard
        id={'1'}
        post={post}
        fullName={fullName}
        avatar={avatar}
        isLoading={false}
        isAdmin={isAdmin}
        isLiked={isLiked}
        likeCount={likeCount}
        commCount={commCount}
        date={date}
        handleProfile={handleProfile}
        handleAdminMenu={handleAdminMenu}
        handleShareLink={handleShareLink}
        handleLike={handleLike}
        handleComment={handleComment}
      />
      {/* <Space height={40} />
      <CommentBubbleRight {...MockedCommentData} />
      <Space height={20} />
      <CommentBubbleLeft {...MockedCommentData} />
      <Space height={140} />
      <Dice rollDice={rollDice} lastRoll={lastRoll} size="large" />

      <Space height={40} /> */}

      {/* <Avatar
          plan={1}
          size="large"
          avatar={avatar}
          isAccept={true}
          onPress={() => {
            // Обработчик для нажатия на аватар
            console.log('Avatar Pressed')
          }}
        /> */}

      {/* <Button title={t('buy')} onPress={() => console.log('click')} />
      <Space height={40} />
      <Text h={'h2'} title={t('takeStep')} />
      <Space height={15} /> */}

      {/* <MarkdownView /> */}

      {/* <Space height={50} />

      <Avatar
        avatar={avatar}
        onPress={handleProfile}
        size={'medium'}
        plan={post.plan as number}
        isAccept={post.accept}
      /> */}
    </Background>
  )
}

export default UiKit
