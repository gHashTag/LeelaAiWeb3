import React from 'react'

import { View, Pressable, StyleSheet } from 'react-native'

import { Avatar, Space, Text, NeomorphView, ActionButtons } from 'components'
import { W } from 'cons'
import { s, vs } from 'react-native-size-matters'
import { ReportCardProps } from 'types'

const ReportCard: React.FC<ReportCardProps> = ({
  post,
  onPress,
  fullName,
  avatar,
  isLoading,
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
      <Pressable
        onPress={onPress}
        style={styles.container}
        testID="report-card"
      >
        <View style={styles.contentContainer}>
          <View style={styles.headerInfo}>
            <View style={styles.headerName}>
              <View style={styles.userInfoContainer}>
                <Text
                  numberOfLines={1}
                  h={'h2'}
                  title={fullName}
                  ellipsizeMode="tail"
                  testID="report-card-fullName"
                />
                <Space height={vs(8)} />
                <Text
                  h={'h3'}
                  textStyle={styles.lightText}
                  title={`${date}`}
                  testID="report-card-date"
                />
              </View>

              <View style={styles.avatarStyle}>
                <Avatar
                  avatar={avatar}
                  onPress={handleProfile}
                  size={'large'}
                  plan={post.plan as number}
                  isAccept={post.accept}
                  additionalStyle={styles.img}
                  testID="report-card-avatar"
                  isLoading={isLoading}
                />
              </View>
            </View>

            <Space height={vs(5)} />
            <Text
              h={'h3'}
              textStyle={styles.lightText}
              title={post.text || ' '}
              numberOfLines={4}
              testID="report-card-postText"
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

const styles = StyleSheet.create({
  avatarStyle: {
    top: 10,
  },
  card: {
    height: vs(180),
    width: W - 50,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: s(15),
    paddingVertical: s(6),
  },
  contentContainer: {
    flex: 1,
  },
  headerInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  headerName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img: {
    marginBottom: s(12),
  },
  lightText: {
    textAlign: 'left',
  },
  userInfoContainer: {
    top: 15,
    width: W - 150,
  },
})

export { ReportCard }
