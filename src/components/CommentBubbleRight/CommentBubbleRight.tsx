import React from 'react'

import { View, Pressable } from 'react-native'

import { Avatar, Space, Text } from 'components'
import { W } from 'cons'
import { ScaledSheet, s, vs } from 'react-native-size-matters'
import { Post } from 'types'

interface CommentCardProps {
  post: Post
  onPress?: () => void
  fullName: string
  avaUrl: string
  date: string
  handleProfile: () => void
  isLeft?: boolean
}

const CommentBubbleRight: React.FC<CommentCardProps> = ({
  post,
  onPress,
  fullName,
  avaUrl,
  date,
  handleProfile,
}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <View style={styles.bubbleStyle}>
          <View style={styles.headerName}>
            <Text
              h={'h5'}
              textStyle={styles.lightText}
              title={post.text || ' '}
            />
            <Space height={vs(5)} />
            <Text
              title={fullName}
              h={'h3'}
              numberOfLines={1}
              textStyle={styles.dateStyle}
            />
            <Space height={vs(2)} />
            <Text title={date} h={'h4'} textStyle={styles.dateStyle} />
          </View>
          <Avatar
            avaUrl={avaUrl}
            onPress={handleProfile}
            size={'medium'}
            plan={post.plan as number}
            isAccept={post.accept}
            aditionalStyle={styles.img}
          />
        </View>
        <Space height={vs(2)} />
        <View style={styles.headerName} />
      </Pressable>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: s(20),
    paddingVertical: s(6),
    height: 'auto',
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
  dateStyle: {
    paddingRight: 10,
  },
  bubbleStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
})

export { CommentBubbleRight }
