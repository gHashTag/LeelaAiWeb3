import React from 'react'

import { View, Pressable } from 'react-native'

import {
  Avatar,
  NeomorphBlurView,
  NeomorphFlexView,
  Space,
  Text,
} from 'components'
import { W } from 'cons'
import { ScaledSheet, s, vs } from 'react-native-size-matters'
import { Post } from 'types'

interface CommentCardProps {
  post: Post
  onPress?: () => void
  fullName: string
  avatar: string
  date: string
  handleProfile: () => void
  isLeft?: boolean
}

const CommentBubbleLeft: React.FC<CommentCardProps> = ({
  post,
  onPress,
  fullName,
  avatar,
  date,
  handleProfile,
}) => {
  return (
    <NeomorphFlexView>
      <View style={styles.container}>
        <Pressable onPress={onPress}>
          <View style={styles.bubbleStyle}>
            <Avatar
              avatar={avatar}
              onPress={handleProfile}
              size={'medium'}
              plan={post.plan as number}
              isAccept={post.accept}
              aditionalStyle={styles.img}
            />
            <View style={styles.headerName}>
              <Text
                h={'h4'}
                textStyle={styles.lightText}
                title={post.text || ' '}
              />
              <Space height={vs(5)} />
              <Text
                title={fullName}
                h={'h4'}
                numberOfLines={1}
                textStyle={styles.nameStyle}
              />
              <View style={styles.headerName}>
                <Text title={date} h={'h5'} textStyle={styles.dateStyle} />
              </View>
            </View>
          </View>
          <Space height={vs(2)} />
        </Pressable>
      </View>
    </NeomorphFlexView>
  )
}

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: s(10),
    paddingTop: s(20),
    paddingBottom: s(10),
  },
  img: {
    top: 9,
  },
  headerName: {
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  lightText: {
    textAlign: 'left',
    maxWidth: W - 120,
    paddingLeft: 10,
  },
  nameStyle: {
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  dateStyle: {
    paddingLeft: 10,
  },
  bubbleStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
})

export { CommentBubbleLeft }
