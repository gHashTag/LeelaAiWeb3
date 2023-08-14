import React from 'react'

import { View, Pressable } from 'react-native'

import { Avatar, NeomorphFlexView, Space, Text } from 'components'
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

const CommentBubbleRight: React.FC<CommentCardProps> = ({
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
        <Pressable onPress={onPress} testID="comment-bubble-right-container">
          <View style={styles.bubbleStyle}>
            <View style={styles.headerName}>
              <Text
                h={'h4'}
                textStyle={styles.lightText}
                title={post.text || ' '}
                testID="comment-bubble-right-comment"
              />
              <Space height={vs(5)} />
              <Text
                title={fullName}
                h={'h4'}
                numberOfLines={1}
                textStyle={styles.nameStyle}
                testID="comment-bubble-right-fullName"
              />
              <Space height={vs(2)} />
              <Text
                title={date}
                h={'h5'}
                textStyle={styles.dateStyle}
                testID="comment-bubble-right-date"
              />
            </View>
            <Avatar
              avatar={avatar}
              onPress={handleProfile}
              size={'medium'}
              plan={post.plan as number}
              isAccept={post.accept}
              additionalStyle={styles.img}
              testID="avatar-bubble-right"
            />
          </View>
          <Space height={vs(2)} />
          <View style={styles.headerName} />
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
    alignItems: 'flex-end',
  },
  lightText: {
    textAlign: 'right',
    maxWidth: W - 120,
    paddingRight: 10,
  },
  nameStyle: {
    paddingRight: 10,
    fontWeight: 'bold',
  },
  dateStyle: {
    paddingRight: 10,
  },
  bubbleStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
})

export { CommentBubbleRight }
