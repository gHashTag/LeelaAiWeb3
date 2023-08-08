import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { s, vs } from 'react-native-size-matters'
import { Avatar, Space, Text } from 'components'

import { W } from 'cons'

import { PostT } from 'types'

interface CommentCardProps {
  post: PostT
  onPress?: () => void
  fullName: string // Full name of the user
  avaUrl: string // Avatar URL
  date: string // Formatted date of the post
  handleProfile: () => void // Function to handle navigating to the user's profile
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
        <Text h={'h5'} textStyle={styles.lightText} title={post.text || ' '} />
        <Space height={vs(15)} />
        <View style={styles.headerName}>
          <View style={styles.userInfoContainer}>
            <Text numberOfLines={1} h={'h2'} title={fullName} />
            <Space height={vs(8)} />
            <Text h={'h3'} textStyle={styles.lightText} title={date} />
          </View>
          <View style={styles.avatarStyle}>
            <Avatar
              avaUrl={avaUrl}
              onPress={handleProfile}
              size={'medium'}
              plan={post.plan as number}
              isAccept={post.accept}
              aditionalStyle={styles.img}
            />
          </View>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: s(15),
    paddingVertical: s(6),
    alignItems: 'center',
    width: W - 50,
    height: 'auto',
  },
  img: {
    top: 9,
    marginBottom: s(12),
  },
  headerName: {
    justifyContent: 'space-between',
    flexDirection: 'row', // Use flexDirection row to position avatar and text side by side
    alignItems: 'center', // Align avatar and text vertically
  },
  lightText: {
    textAlign: 'left',
  },
  userInfoContainer: {
    // No need for top: 15
  },
  avatarStyle: {
    // No need for top: 10
  },
})

export { CommentBubble }
