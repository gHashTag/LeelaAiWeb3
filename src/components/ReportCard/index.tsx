import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { ms, s, vs } from 'react-native-size-matters'
import { ButtonVectorIcon, Avatar, Space, Text, NeomorphView } from 'components'
import { W, fuchsia } from 'cons'
import { ReportCardProps } from 'types'

const ReportCard: React.FC<ReportCardProps> = ({
  post,
  onPress,
  fullName,
  avaUrl,
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
  const iconSize = ms(15, 0.8)
  const heart = isLiked ? 'heart' : 'heart-outline'
  const heartColor = isLiked ? fuchsia : undefined

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
                  avaUrl={avaUrl}
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
              h={'h5'}
              textStyle={styles.lightText}
              title={post.text || ' '}
              numberOfLines={4}
            />
          </View>
          <View style={styles.btnsContainer}>
            {isAdmin && (
              <>
                <ButtonVectorIcon
                  onPress={handleAdminMenu}
                  viewStyle={[styles.smallBtn, styles.nonDetailAdminMenuButton]}
                  ionicons
                  name="ellipsis-vertical-circle"
                  size={iconSize + s(3)}
                />
                <Space height={vs(12)} />
              </>
            )}
            <ButtonVectorIcon
              onPress={handleComment}
              count={commCount}
              viewStyle={[styles.smallBtn, styles.nonDetailCommentButton]}
              ionicons
              name="chatbubble-outline"
              size={iconSize}
            />
            <ButtonVectorIcon
              count={likeCount}
              onPress={handleLike}
              color={heartColor}
              ionicons
              iconSize={iconSize + s(1.5)}
              viewStyle={styles.smallBtn}
              name={heart}
              size={iconSize}
            />
            <ButtonVectorIcon
              viewStyle={[styles.smallBtn, styles.nonDetailLinkButton]}
              name="link-outline"
              ionicons
              iconSize={iconSize + s(4)}
              onPress={handleShareLink}
            />
          </View>
        </View>
      </Pressable>
    </NeomorphView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: s(15),
    paddingVertical: s(6),
    height: vs(200),
    alignItems: 'center',
  },
  card: {
    width: W - 50,
    height: vs(180),
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
