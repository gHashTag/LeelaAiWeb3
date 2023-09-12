import React, { useCallback, useEffect, useState } from 'react'

import { FlatList, StyleSheet } from 'react-native'

import { useQuery } from '@apollo/client'
import { RouteProp } from '@react-navigation/native'
import { Space, ReportCard, Layout, Display } from 'components'
import { W } from 'cons'
import { navigate } from 'cons/navigation'
import { Query } from 'gql/graphql'
import { GET_ALL_REPORTS_QUERY } from 'graph'
import { useTranslation } from 'react-i18next'
import { Report, RootStackParamList } from 'types'

type ReportsScreenRouteProp = RouteProp<RootStackParamList, 'REPORTS_SCREEN'>

type ReportsScreenProps = {
  route: ReportsScreenRouteProp
}

const ReportsScreen: React.FC<ReportsScreenProps> = ({ route }) => {
  const { t } = useTranslation()
  const [reports, setReports] = useState<Report[]>([])
  console.log('reports', reports)
  const { report } = route?.params || {}
  console.log('report', report)
  const { loading, error, data } = useQuery<Query>(GET_ALL_REPORTS_QUERY)
  console.log('data', data)

  const addReport = useCallback(
    (rep: Report) => {
      setReports((prevReports) => [
        rep,
        ...prevReports,
        ...((data?.reportActions as unknown as Report[]) || []),
      ])
    },
    [data?.reportActions],
  )

  useEffect(() => {
    if (report) {
      addReport(report)
    } else {
      setReports((data?.reportActions as unknown as Report[]) || [])
    }
  }, [report, addReport, data?.reportActions])

  // const [isError, setError] = useState({ message: '' })

  const onPress = (item: Report) => () => {
    navigate('REPORT_SCREEN', { item })
  }

  const renderItem = ({ item }: { item: Report }) => (
    <>
      <ReportCard
        {...item}
        onPress={onPress(item)}
        // handleLike={handleLike(item)}
      />
      <Space height={20} />
    </>
  )

  const header = () => (
    <>
      <Display
        title={t('nextStep', {
          date: 24,
        })}
        height={60}
        width={W - 45}
      />
      <Space height={20} />
    </>
  )

  return (
    <Layout loading={loading} error={error}>
      <FlatList
        ListHeaderComponent={header}
        data={reports}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id?.toString()}
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

// const handleLike = (item: Report) => async () => {
//   try {
//     const reportId = item.reportId
//     const isLikedByCurrentUser = item.isLikedByCurrentUser
//     const gasPrice = await provider.getGasPrice()

//     const gasLimit = await contractWithSigner.estimateGas.toggleLikeReport(
//       reportId,
//       !isLikedByCurrentUser,
//     )

//     const overrides = {
//       gasPrice,
//       gasLimit,
//     }

//     const txResponse = await contractWithSigner.toggleLikeReport(
//       reportId,
//       !isLikedByCurrentUser,
//       overrides,
//     )
//     console.log('txResponse', txResponse)
//     const revert: string = await catchRevert(txResponse.hash)
//     console.log('revert', revert)
//     navigate('REPORTS_SCREEN')
//   } catch (err) {
//     if (err instanceof Error) {
//       setError({ message: err.message })
//     }
//   }
// }
