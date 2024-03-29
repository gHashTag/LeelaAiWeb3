import React from 'react'

import { View, Pressable, StyleSheet } from 'react-native'

import { Avatar, Space, Text, NeomorphView, ActionButtons } from 'components'
import { W, formatDate } from 'cons'
import { s, vs } from 'react-native-size-matters'
import { Report } from 'types'

const ReportCard: React.FC<Report> = ({
  fullName,
  avatar,
  plan,
  timestamp,
  content,
  onPress,
  handleProfile,
  handleAdminMenu,
  handleShareLink,
  handleLike,
  handleComment,
  isAdmin,
  isLikedByCurrentUser,
  likes,
  commentCount,
}) => {
  return (
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
                  title={`${formatDate(timestamp)}`}
                  testID="report-card-date"
                />
              </View>

              <View style={styles.avatarStyle}>
                <Avatar
                  avatar={avatar}
                  onPress={handleProfile}
                  size={'medium'}
                  plan={plan}
                  isAccept={true}
                  testID="report-card-avatar"
                  isLoading={false}
                />
              </View>
            </View>

            <Space height={vs(15)} />
            <Text
              h={'h3'}
              textStyle={styles.lightText}
              title={content}
              numberOfLines={4}
              testID="report-card-postText"
            />
          </View>
          {/* <ActionButtons
            isAdmin={isAdmin}
            commentCount={commentCount}
            likes={likes}
            handleAdminMenu={handleAdminMenu}
            handleComment={handleComment}
            handleLike={handleLike}
            handleShareLink={handleShareLink}
            isLiked={isLikedByCurrentUser}
          /> */}
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
    height: vs(160),
    minHeight: vs(130),
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
  lightText: {
    textAlign: 'left',
  },
  userInfoContainer: {
    top: 15,
    width: W - 150,
  },
})

export { ReportCard }
