import React from 'react'

import { ScrollView, StyleSheet } from 'react-native'

import {
  Space,
  ReportCard,
  CommentBubbleRight,
  CommentBubbleLeft,
} from 'components'
import { MockedCommentData } from 'cons/mockdata'

const ReportScreen: React.FC = () => {
  const item = MockedCommentData
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ReportCard {...item} />
      <Space height={40} />

      <CommentBubbleLeft {...MockedCommentData} />
      <Space height={80} />
      <CommentBubbleRight {...MockedCommentData} />
      <Space height={180} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    top: 80,
  },
})

export { ReportScreen }
