import React, { useState } from 'react'

import { FlatList, StyleSheet, View } from 'react-native'

import { useMutation, useQuery } from '@apollo/client'
import { RouteProp } from '@react-navigation/native'
import {
  Space,
  ReportCard,
  CommentBubbleLeft,
  Background,
  KeyboardContainer,
  TextInputField,
  Text,
  Button,
  Layout,
} from 'components'
import { catchRevert, contractWithSigner, navigate, provider, red } from 'cons'
import { ethers } from 'ethers'
import { GET_COMMENT_QUERY } from 'graph'
import { useGlobalBackground } from 'hooks'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { s, vs } from 'react-native-size-matters'
import { Comment, RootStackParamList } from 'types' // Импортируйте необходимые типы

interface ReportScreenProps {
  route: RouteProp<RootStackParamList, 'REPORT_SCREEN'>
}

interface FormData {
  title: string
}

const ReportScreen: React.FC<ReportScreenProps> = ({ route }) => {
  const { item } = route.params
  const { loading, error, data } = useQuery(GET_COMMENT_QUERY, {
    variables: {
      reportId: item.reportId,
    },
  })
  console.log('item.reportId', item.reportId)
  console.log('error', error)
  const backgroundStyle = useGlobalBackground()
  const [isError, setError] = useState({ message: '' })
  const { t } = useTranslation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' })

  const onSubmit = async (input: FormData) => {
    try {
      const gasPrice = await provider.getGasPrice()
      console.log('gasPrice', gasPrice)
      const reportId = ethers.BigNumber.from(item.reportId)
      console.log('reportId', reportId)
      const gasLimit = await contractWithSigner.estimateGas.addComment(
        reportId,
        input.title,
      )
      console.log('gasLimit', gasLimit)
      const overrides = {
        gasPrice,
        gasLimit,
      }
      console.log('overrides', overrides)
      const txResponse = await contractWithSigner.addComment(
        reportId,
        input.title,
        overrides,
      )
      console.log('txResponse', txResponse)
      const revert: string = await catchRevert(txResponse.hash)
      console.log('revert', revert)
      if (revert) {
        setError({ message: revert })
      }
    } catch (err) {
      if (err instanceof Error) {
        setError({ message: err.message })
      }
    }
    // await createCommentMutation({ variables: { input: options } })
  }

  const header = () => {
    return (
      <Background isFlatList>
        <Space height={20} />
        <ReportCard {...item} />
      </Background>
    )
  }
  console.log('isError', isError)
  console.log('reprt data', data)
  const footer = () => {
    return (
      <Layout loading={false}>
        <Space height={s(20)} />
        <KeyboardContainer>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInputField
                placeholder={t('input.comment')}
                multiline
                value={value}
                onBlur={onBlur}
                onChangeText={(val) => onChange(val)}
                isWide
              />
            )}
            rules={{
              required: {
                value: true,
                message: t('requireField'),
              },
            }}
          />
        </KeyboardContainer>
        <View style={styles.btnStyle}>
          {errors.title && (
            <>
              <Text
                h={'h3'}
                title={String(errors.title.message)}
                oneColor={red}
              />
              <Space height={15} />
            </>
          )}

          <Button
            h={'h2'}
            title={t('comment')}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <Space height={s(200)} />
      </Layout>
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
      ListFooterComponent={footer}
      ListHeaderComponentStyle={styles.headerStyle}
      data={data.commentActions || []}
      renderItem={renderItem}
      keyExtractor={(it) => it.id.toString()}
      contentContainerStyle={[backgroundStyle, styles.contentContainer]}
    />
  )
}

const styles = StyleSheet.create({
  btnStyle: {
    alignItems: 'center',
  },
  contentContainer: {
    maxWidth: '100%',
  },
  headerStyle: { marginBottom: 15 },
})

export { ReportScreen }
