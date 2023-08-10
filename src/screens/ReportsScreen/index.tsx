import React from 'react'
import { FlatList, View } from 'react-native'
import { Space, ReportCard, Display } from 'components'
import { mockedCommentDataArray } from 'cons/mockdata'
import { ReportCardProps } from 'types'
import { ScaledSheet } from 'react-native-size-matters'

const ReportsScreen: React.FC = () => {
  const renderItem = ({ item }: { item: ReportCardProps }) => (
    <>
      <ReportCard {...item} />
      <Space height={20} />
    </>
  )

  const header = () => (
    <>
      <Display title={'sixToBegin'} />
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

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    top: 60,
  },
  contentContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
})

export { ReportsScreen }
