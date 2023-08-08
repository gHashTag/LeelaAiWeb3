// ReportCard.tsx
import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { ms, s, vs } from 'react-native-size-matters'
import { ButtonVectorIcon, Avatar, Space, Text, ShadowView } from 'components'
import { W, brightTurquoise, fuchsia, lightGray, orange } from 'cons'

import { PostT } from 'types'

interface ReportCardProps {
  post: PostT
  isDetail?: boolean
  onPress?: () => void
  fullName: string // Full name of the user
  avaUrl: string // Avatar URL
  isAdmin: boolean // Whether the user is an admin or not
  isLiked: boolean // Whether the post is liked by the user or not
  likeCount: number // Number of likes on the post
  commCount: number // Number of comments on the post
  date: string // Formatted date of the post
  handleProfile: () => void // Function to handle navigating to the user's profile
  handleTranslate: () => void // Function to handle translation
  handlePressWand: () => Promise<void> // Function to handle translation with AI
  handleAdminMenu: () => void // Function to handle admin menu
  handleShareLink: () => void // Function to handle sharing the post link
  handleLike: () => void // Function to handle liking the post
  handleComment: () => void // Function to handle commenting on the post
}

const ReportCard: React.FC<ReportCardProps> = ({
  post,
  isDetail = false,
  onPress,
  fullName,
  avaUrl,
  isAdmin,
  isLiked,
  likeCount,
  commCount,
  date,
  handleProfile,
  handleTranslate,
  handlePressWand,
  handleAdminMenu,
  handleShareLink,
  handleLike,
  handleComment,
}) => {
  const iconSize = ms(15, 0.8)
  const heart = isLiked ? 'heart' : 'heart-outline'
  const heartColor = isLiked ? fuchsia : undefined

  if (isDetail) {
    return <>{/* ... (rest of the component remains the same) ... */}</>
  }

  return (
    // @ts-ignore
    <ShadowView viewStyle={styles.card}>
      <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.headerS}>
          <View style={styles.headerInfo}>
            {/* name, create date/email */}

            <View style={styles.headerName}>
              <View style={styles.userInfoContainer}>
                <Text numberOfLines={1} h={'h2'} title={fullName} />
                <Space height={vs(8)} />
                <Text h={'h3'} textStyle={styles.lightText} title={`${date}`} />
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

            <Space height={vs(5)} />
            <Text
              h={'h5'}
              textStyle={styles.lightText}
              title={post.text || ' '}
              numberOfLines={8}
            />
            {!post.accept && (
              <>
                <Space height={vs(5)} />
                <Text oneColor={orange} h={'h6'} title={'online-part.review'} />
              </>
            )}
            {/* Preview Buttons */}
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
    </ShadowView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: s(15),
    paddingRight: s(15),
    paddingVertical: s(6),
    height: vs(200),
  },
  card: {
    width: W - 40,
    height: vs(180),
  },
  img: {
    top: 9,
    marginBottom: s(12),
  },
  btnsContainer: {
    top: 5,
    flexDirection: 'row',
    padding: s(8),
  },
  mediumBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textStyle: {
    lineHeight: s(21),
  },
  headerS: {
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
  flex1: {
    flex: 1,
  },
  likeBtn: {
    flex: 2,
    justifyContent: 'center',
  },
  userInfoContainer: {
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
  withoutBottomBorder: {
    borderBottomWidth: 0,
  },
  flagEmoji: {
    fontSize: s(16),
  },
})

export { ReportCard }
