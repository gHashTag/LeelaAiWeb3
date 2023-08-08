import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { s, vs } from 'react-native-size-matters'
import { Avatar, Space, Text } from 'components'

import { W } from 'cons'

import { PostT } from 'types'

interface CommentCardProps {
  post: PostT
  onPress?: () => void
  fullName: string
  avaUrl: string
  date: string
  handleProfile: () => void
}

const CommentBubble: React.FC<CommentCardProps> = ({
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
          <Avatar
            avaUrl={avaUrl}
            onPress={handleProfile}
            size={'medium'}
            plan={post.plan as number}
            isAccept={post.accept}
            aditionalStyle={styles.img}
          />
          <View style={styles.headerName}>
            <Text
              h={'h5'}
              textStyle={styles.lightText}
              title={post.text || ' '}
            />
            <Space height={vs(10)} />
            <Text numberOfLines={1} h={'h3'} title={fullName} />
          </View>
        </View>
        <Space height={vs(4)} />
        <View style={styles.headerName}>
          <Text h={'h4'} textStyle={styles.lightText} title={date} />
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
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
    textAlign: 'justify',
    maxWidth: W - 120,
    paddingLeft: 10,
  },
  bubbleStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
})

export { CommentBubble }
