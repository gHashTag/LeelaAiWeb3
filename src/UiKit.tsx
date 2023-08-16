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
  ButtonVectorIcon,
  ButtonCircle,
  Header,
} from 'components'
import {
  MockedCommentData,
  commCount,
  avatar,
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
import { useChooseAvatarImage } from 'hooks'
import { useLeelaGame } from 'hooks/useLeelaGame/useLeelaGame'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { account } from 'state'

function UiKit(): JSX.Element {
  // const { avatar, chooseAvatarImage, isLoading } = useChooseAvatarImage()
  const { rollDice, lastRoll } = useLeelaGame()
  //const { player, rollHistory, planHistory, rollDice, lastRoll } = useLeelaGame()

  const { t } = useTranslation()
  const handleButtonPress = () => {
    // Ваш обработчик нажатия
    console.log('Button pressed')
  }
  //console.log('avatar', avatar)
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
      <Header avatar={avatar} />
      <Space height={20} />
      {/* <ButtonCircle
        name="arrow-back"
        isIonicons
        size={40}
        onPress={handleButtonPress}
      />
      <Space height={20} />
      <ButtonCircle
        name="book"
        isIonicons
        size={40}
        onPress={handleButtonPress}
      /> */}
      <Space height={20} />

      <ReportCard
        id={'1'}
        post={post}
        fullName={fullName}
        //avatar={avatar}
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

     */}

      <Avatar
        plan={1}
        size="xLarge"
        avatar={avatar}
        isAccept={true}
        onPress={() => {
          // Обработчик для нажатия на аватар
          console.log('Avatar Pressed')
        }}
      />

      {/* <Button title={t('buy')} onPress={() => console.log('click')} />
      <Space height={40} />
      <Text h={'h2'} title={t('takeStep')} />
      <Space height={15} /> */}

      {/* <MarkdownView /> */}

      {/* <Space height={50} />*/}
    </Background>
  )
}

export default UiKit
