import React from 'react'

import { View, Pressable } from 'react-native'

import { Avatar, Space, Text, NeomorphView, ActionButtons } from 'components'
import { W } from 'cons'
import { s, vs, ScaledSheet } from 'react-native-size-matters'
import { ReportCardProps } from 'types'

const ReportCard: React.FC<ReportCardProps> = ({
  post,
  onPress,
  fullName,
  avatar,
  isAdmin,
  isLiked,
  likeCount,
  commCount,
  date,
  handleProfile,
  handleAdminMenu,
  handleShareLink,
  handleLike,
  handleComment,
}) => {
  return (
    // @ts-ignore
    <NeomorphView viewStyle={styles.card}>
      <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.headerInfo}>
            <View style={styles.headerName}>
              <View style={styles.userInfoContainer}>
                <Text
                  numberOfLines={1}
                  h={'h2'}
                  title={fullName}
                  ellipsizeMode="tail"
                />
                <Space height={vs(8)} />
                <Text h={'h3'} textStyle={styles.lightText} title={`${date}`} />
              </View>

              <View style={styles.avatarStyle}>
                <Avatar
                  avatar={avatar}
                  onPress={handleProfile}
                  size={'medium'}
                  plan={post.plan as number}
                  isAccept={post.accept}
                  aditionalStyle={styles.img}
                />
              </View>
            </View>

            <Space height={vs(11)} />
            <Text
              h={'h4'}
              textStyle={styles.lightText}
              title={post.text || ' '}
              numberOfLines={4}
            />
          </View>
          <ActionButtons
            isAdmin={isAdmin}
            commCount={commCount}
            likeCount={likeCount}
            handleAdminMenu={handleAdminMenu}
            handleComment={handleComment}
            handleLike={handleLike}
            handleShareLink={handleShareLink}
            isLiked={isLiked}
          />
        </View>
      </Pressable>
    </NeomorphView>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: s(15),
    paddingVertical: s(6),
    alignItems: 'center',
  },
  card: {
    width: W - 50,
    height: vs(160),
  },
  img: {
    top: 9,
    marginBottom: s(12),
  },
  btnsContainer: {
    justifyContent: 'space-between',
    top: 5,
    flexDirection: 'row',
    padding: s(8),
  },
  smallBtn: {
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
  },
  headerInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  headerName: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  lightText: {
    textAlign: 'left',
  },
  userInfoContainer: {
    width: W - 150,
    top: 15,
  },
  nonDetailCommentButton: {
    justifyContent: 'flex-start',
  },
  nonDetailLinkButton: {
    justifyContent: 'flex-end',
    marginRight: s(5),
  },
  nonDetailAdminMenuButton: {
    alignItems: 'flex-end',
    marginRight: s(4),
  },
  avatarStyle: {
    top: 10,
  },
})

export { ReportCard }
