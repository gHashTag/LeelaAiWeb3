import React from 'react'
import { View } from 'react-native'
import {
  Space,
  ReportCard,
  CommentBubbleRight,
  CommentBubbleLeft,
} from 'components'
import { MockedCommentData } from 'cons/mockdata'
import { ScaledSheet } from 'react-native-size-matters'

const ReportScreen: React.FC = () => {
  const item = MockedCommentData
  return (
    <View style={styles.container}>
      <ReportCard {...item} />
      <Space height={40} />
      <CommentBubbleRight {...MockedCommentData} />
      <CommentBubbleLeft {...MockedCommentData} />
      <Space height={140} />
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    top: 60,
  },
})

export { ReportScreen }
