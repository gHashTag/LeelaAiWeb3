import React from 'react'
import { View } from 'react-native'
import { ButtonVectorIcon, Space } from 'components'
import { ScaledSheet, ms, s } from 'react-native-size-matters'
import { fuchsia } from 'cons'

interface ActionButtonsProps {
  isAdmin: boolean
  commCount: number
  likeCount: number
  isLiked: boolean
  handleAdminMenu: () => void
  handleComment: () => void
  handleLike: () => void
  handleShareLink: () => void
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isAdmin,
  commCount,
  likeCount,
  handleAdminMenu,
  handleComment,
  handleLike,
  // handleShareLink,
  isLiked,
}) => {
  const iconSize = ms(15, 0.8)
  const heart = isLiked ? 'heart' : 'heart-outline'
  const heartColor = isLiked ? fuchsia : undefined
  return (
    <View style={styles.btnsContainer}>
      {isAdmin && (
        <>
          <ButtonVectorIcon
            onPress={handleAdminMenu}
            viewStyle={[styles.smallBtn, styles.nonDetailAdminMenuButton]}
            ionicons
            name="ellipsis-vertical-circle"
            size={iconSize + 3}
          />
          <Space height={12} />
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
        iconSize={iconSize + 1.5}
        viewStyle={styles.smallBtn}
        name={heart}
        size={iconSize}
      />
      {/* <ButtonVectorIcon
        viewStyle={[styles.smallBtn, styles.nonDetailLinkButton]}
        name="link-outline"
        ionicons
        iconSize={iconSize + 4}
        onPress={handleShareLink}
      /> */}
    </View>
  )
}

const styles = ScaledSheet.create({
  btnsContainer: {
    justifyContent: 'space-between',
    top: 5,
    flexDirection: 'row',
    padding: s(8),
  },
  smallBtn: {
    flexDirection: 'row',
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
})

export { ActionButtons }
