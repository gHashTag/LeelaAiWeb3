import React from 'react'

import { FlatList, StyleSheet } from 'react-native'

import { RouteProp } from '@react-navigation/native'
import { Space, ReportCard, CommentBubbleLeft, Background } from 'components'
import { useGlobalBackground } from 'hooks'
import { s, vs } from 'react-native-size-matters'
import { Comment, RootStackParamList } from 'types' // Импортируйте необходимые типы

interface ReportScreenProps {
  route: RouteProp<RootStackParamList, 'REPORT_SCREEN'>
}

const ReportScreen: React.FC<ReportScreenProps> = ({ route }) => {
  const backgroundStyle = useGlobalBackground()
  const { item } = route.params

  const header = () => {
    return (
      <Background isFlatList>
        <Space height={20} />
        <ReportCard {...item} />
      </Background>
    )
  }

  const renderItem = ({ item: commentItem }: { item: Comment }) => {
    return (
      <>
        <Space height={vs(10)} />
        <CommentBubbleLeft
          commentItem={commentItem}
          handleProfile={() => console.log('click')}
        />
      </>
    )
  }

  return (
    <FlatList
      ListHeaderComponent={header}
      ListFooterComponent={<Space height={s(200)} />}
      ListHeaderComponentStyle={styles.headerStyle}
      contentContainerStyle={backgroundStyle}
      data={item.comments || []}
      renderItem={renderItem}
      keyExtractor={(it) => it.id.toString()}
    />
  )
}

const styles = StyleSheet.create({
  headerStyle: { marginBottom: 15 },
})

export { ReportScreen }
