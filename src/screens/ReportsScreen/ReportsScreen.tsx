import React from 'react'

import { FlatList, View, StyleSheet } from 'react-native'

import { Space, ReportCard, Display } from 'components'
import { mockedCommentDataArray } from 'cons/mockdata'
import { useTranslation } from 'react-i18next'
import { ReportCardProps } from 'types'

const ReportsScreen: React.FC = () => {
  const { t } = useTranslation()
  const renderItem = ({ item }: { item: ReportCardProps }) => (
    <>
      <ReportCard {...item} />
      <Space height={20} />
    </>
  )

  const header = () => (
    <>
      <Display title={t('sixToBegin')} />
      <Space height={20} />
    </>
  )
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={header}
        data={mockedCommentDataArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    top: 60,
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
})

export { ReportsScreen }
