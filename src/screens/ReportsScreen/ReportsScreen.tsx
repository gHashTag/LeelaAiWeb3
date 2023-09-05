import React, { useState } from 'react'

import { FlatList, StyleSheet } from 'react-native'

import { useQuery } from '@apollo/client'
import { cliError } from '@graphql-codegen/cli'
import { Space, ReportCard, Layout, Display } from 'components'
import { W, catchRevert, contractWithSigner, provider } from 'cons'
import { navigate } from 'cons/navigation'
import { GET_ALL_REPORTS_QUERY } from 'graph'
import { useTranslation } from 'react-i18next'
import { Report } from 'types'

const ReportsScreen: React.FC = () => {
  const { t } = useTranslation()
  const [isError, setError] = useState({ message: '' })
  const { loading, error, data } = useQuery(GET_ALL_REPORTS_QUERY)
  console.log('isError', isError)
  console.log('data', data)

  const onPress = (item: Report) => () => {
    navigate('REPORT_SCREEN', { item })
  }
  const handleLike = (item: Report) => async () => {
    try {
      const reportId = item.reportId
      const isLikedByCurrentUser = item.isLikedByCurrentUser
      const gasPrice = await provider.getGasPrice()

      const gasLimit = await contractWithSigner.estimateGas.toggleLikeReport(
        reportId,
        !isLikedByCurrentUser,
      )

      const overrides = {
        gasPrice,
        gasLimit,
      }

      const txResponse = await contractWithSigner.toggleLikeReport(
        reportId,
        !isLikedByCurrentUser,
        overrides,
      )
      console.log('txResponse', txResponse)
      const revert: string = await catchRevert(txResponse.hash)
      console.log('revert', revert)
      if (revert) {
        setError({ message: revert })
      } else {
        navigate('REPORTS_SCREEN')
      }
    } catch (err) {
      if (err instanceof Error) {
        setError({ message: err.message })
      }
    }
  }
  const renderItem = ({ item }: { item: Report }) => (
    <>
      <ReportCard
        {...item}
        onPress={onPress(item)}
        handleLike={handleLike(item)}
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
  console.log('data?.reportActions', data?.reportActions)

  return (
    <Layout loading={loading} error={error}>
      <FlatList
        ListHeaderComponent={header}
        data={data?.reportActions}
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
