import React from 'react'

import { FlatList, StyleSheet } from 'react-native'

import { useQuery } from '@apollo/client'
import { Space, ReportCard, Layout, Header } from 'components'
import { W } from 'cons'
import { AllReportsQuery } from 'graphql/query/AllReportsQuery'
import { useProfile } from 'hooks'
import { useRecoilState } from 'recoil'
import { account } from 'state'
import { Report, Like } from 'types'

const ReportsScreen: React.FC = () => {
  const { profileData } = useProfile()
  const [rlyAccount] = useRecoilState(account)

  const isCurrentUserLike = (like: Like) => like.player.id === rlyAccount

  const { loading, error, data } = useQuery(AllReportsQuery)

  const renderItem = ({ item }: { item: Report }) => (
    <>
      <ReportCard {...item} />
      <Space height={20} />
    </>
  )

  const header = () => (
    <>
      <Space height={60} />
      <Header avatar={profileData.avatar} />
      <Space height={30} />
    </>
  )

  const reportsWithCommentCount: Report[] =
    data?.getAllReports.map((report: Report) => ({
      ...report,
      commentCount: report?.comments?.length || 0,
      isLikedByCurrentUser: report?.likes?.some(isCurrentUserLike) || false,
      likeCount: report?.likes?.length || 0,
    })) || []

  return (
    <Layout loading={loading} error={error}>
      <FlatList
        ListHeaderComponent={header}
        data={reportsWithCommentCount}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    width: W,
  },
})

export { ReportsScreen }
