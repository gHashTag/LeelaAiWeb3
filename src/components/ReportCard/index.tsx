// ReportCard.tsx
import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { ms, s, vs } from 'react-native-size-matters'
import { ButtonVectorIcon, PlanAvatar, Space, Text } from 'components'
import { brightTurquoise, fuchsia, lightGray, orange } from 'cons'

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

  const {
    container,
    img,
    btnsContainer,
    smallBtn,
    mediumBtn,
    textStyle,
    headerS,
    headerInfo,
    headerName,
    lightText,
    flex1,
    avaContainer,
    nonDetailLinkButton,
    nonDetailCommentButton,
    nonDetailAdminMenuButton,
    withoutBottomBorder,
  } = styles

  return (
    <Pressable onPress={onPress} style={container}>
      <View style={headerS}>
        <View style={avaContainer}>
          <PlanAvatar
            avaUrl={avaUrl}
            onPress={handleProfile}
            size={'medium'}
            plan={post.plan as number}
            isAccept={post.accept}
            aditionalStyle={img}
          />
        </View>
        <View style={headerInfo}>
          {/* name, create date/email */}
          <Space height={vs(2)} />
          <View style={headerName}>
            <Text numberOfLines={1} h={'h6'} title={fullName} />
            <Text h={'h6'} textStyle={lightText} title={` · ${date}`} />
            <View style={flex1} />
            {/* <Pressable onPress={handleTranslate}>
              <Text title={flag} style={styles.flagEmoji} />
            </Pressable> */}
          </View>
          <Space height={vs(5)} />
          {/* <HashtagFormat
            textStyle={textStyle}
            numberOfLines={8}
            h={'h5'}
            title={post.text || ' '}
          /> */}
          {!post.accept && (
            <>
              <Space height={vs(5)} />
              <Text oneColor={orange} h={'h6'} title={'online-part.review'} />
            </>
          )}
          {/* Preview Buttons */}
          <View style={btnsContainer}>
            {isAdmin && (
              <>
                <ButtonVectorIcon
                  onPress={handleAdminMenu}
                  viewStyle={[smallBtn, nonDetailAdminMenuButton]}
                  ionicons
                  name="md-ellipsis-vertical-circle"
                  size={iconSize + s(3)}
                />
                <Space height={vs(12)} />
              </>
            )}
            <ButtonVectorIcon
              onPress={handleComment}
              count={commCount}
              viewStyle={[smallBtn, nonDetailCommentButton]}
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
              viewStyle={smallBtn}
              name={heart}
              size={iconSize}
            />
            <ButtonVectorIcon
              viewStyle={[smallBtn, nonDetailLinkButton]}
              name="md-link-outline"
              ionicons
              iconSize={iconSize + s(4)}
              onPress={handleShareLink}
            />
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: s(12),
    paddingRight: s(12),
    borderBottomColor: brightTurquoise,
    borderBottomWidth: vs(0.4),
    paddingVertical: s(6),
  },
  img: {
    marginRight: s(12),
    marginBottom: s(12),
    alignSelf: 'flex-start',
  },
  btnsContainer: {
    flexDirection: 'row',
    padding: s(4),
    paddingBottom: vs(12),
    paddingTop: vs(17),
    flex: 1,
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
    flexDirection: 'row',
  },
  headerInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  headerName: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lightText: {
    color: lightGray,
    textAlign: 'left',
  },
  flex1: {
    flex: 1,
  },
  likeBtn: {
    flex: 2,
    justifyContent: 'center',
  },
  avaContainer: {
    height: '100%',
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
