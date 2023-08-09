import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { Space, ReportCard } from 'components'
import { mockedCommentDataArray } from 'cons/mockdata'
import { ReportCardProps } from 'types'

const ReportScreen: React.FC = () => {
  const renderItem = ({ item }: { item: ReportCardProps }) => (
    <>
      <ReportCard {...item} />
      <Space height={20} />
    </>
  )
  return (
    <View style={styles.container}>
      <FlatList
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
    paddingVertical: 20,
    alignItems: 'center',
  },
})

export { ReportScreen }
