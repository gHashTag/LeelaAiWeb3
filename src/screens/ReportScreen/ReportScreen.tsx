import React, { useEffect, useState } from 'react'

import { FlatList, StyleSheet, View } from 'react-native'

import { useQuery } from '@apollo/client'
import { PUBLIC_KEY } from '@env'
import { RouteProp } from '@react-navigation/native'
import {
  Space,
  CommentBubbleLeft,
  Background,
  KeyboardContainer,
  TextInputField,
  Text,
  Button,
  Layout,
  ReportCardDetail,
  Display,
} from 'components'
import {
  W,
  catchRevert,
  contract,
  contractWithSigner,
  formatDate,
  provider,
  red,
} from 'cons'
import { GET_COMMENT_QUERY, GET_PLAYER_CREATEDS_QUERY } from 'graph'
import { useGlobalBackground, useLeelaGame } from 'hooks'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { s, vs } from 'react-native-size-matters'
import { Comment, RootStackParamList } from 'types'

interface ReportScreenProps {
  route: RouteProp<RootStackParamList, 'REPORT_SCREEN'>
}

interface FormData {
  title: string
}

const ReportScreen: React.FC<ReportScreenProps> = ({ route }) => {
  const { report } = route.params
  console.log('report', report)
  const [comments, setComments] = useState<Comment[]>([])
  const [errorComment, setError] = useState({ message: '' })
  const { t } = useTranslation()

  const { currentPlayer } = useLeelaGame()

  const reportIdHex = report?.reportId?.toString()

  const { data } = useQuery(GET_COMMENT_QUERY, {
    variables: {
      reportId: reportIdHex,
    },
  })

  useEffect(() => {
    setComments(data?.commentActions || [])
  }, [data])
  console.log('data?.commentActions', data?.commentActions)
  const backgroundStyle = useGlobalBackground()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ mode: 'onBlur' })

  const addComment = async (comment: string) => {
    try {
      const gasPrice = await provider.getGasPrice()

      const reportId = report.reportId

      const gasLimit = await contractWithSigner.estimateGas.addComment(
        reportId,
        comment,
      )

      const overrides = {
        gasPrice,
        gasLimit,
      }

      const txResponse = await contractWithSigner.addComment(
        reportId,
        comment,
        overrides,
      )
      const revert: string = await catchRevert(txResponse.hash)
      console.log('revert', revert)
      contract.on(
        'CommentAction',
        (
          commentId,
          reportId,
          actor,
          avatar,
          fullName,
          plan,
          content,
          timestamp,
        ) => {
          console.log('reportId', reportId)
          console.log('actor', actor.toString())
          console.log('PUBLIC_KEY', PUBLIC_KEY)
          if (actor.toString() === PUBLIC_KEY) {
            console.log('actor === PUBLIC_KEY')
            const optimisticComment = {
              id: commentId.toString(),
              reportId: reportId.toString(),
              avatar,
              fullName,
              plan: plan.toString(),
              content: content.toString(),
              timestamp: timestamp.toString(),
            }
            console.log('Событие CommentAction:', optimisticComment)

            const updatedComments = [...comments, optimisticComment]
            console.log('updatedComments', updatedComments)
            setComments(updatedComments)
          }
        },
      )
    } catch (err) {
      if (err instanceof Error) {
        setError({ message: err.message })
      }
    }
  }

  const onSubmit = async (input: FormData) => {
    reset()
    setError({ message: '' })
    try {
      // Optimistic UI update
      const optimisticComment: Comment = {
        id: Math.random().toString(),
        reportId: report.reportId,
        avatar: currentPlayer?.avatar,
        fullName: currentPlayer?.fullName,
        plan: currentPlayer?.plan,
        content: input.title,
        timestamp: Math.floor(Date.now() / 1000).toString(),
      }

      const updatedComments = [...comments, optimisticComment]
      setComments(updatedComments)

      await addComment(input.title)
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
        <Display
          title={t('nextStep', {
            date: 24,
          })}
          height={60}
          width={W - 45}
        />

        <ReportCardDetail {...report} />
      </Background>
    )
  }

  const footer = () => {
    return (
      <Layout loading={false}>
        <Space height={20} />
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
          {errorComment?.message && (
            <>
              <Text
                h={'h3'}
                title={String(errorComment?.message)}
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
      data={comments}
      renderItem={renderItem}
      keyExtractor={(it) => it.id.toString()}
      contentContainerStyle={[backgroundStyle, styles.contentContainer]}
    />
  )
}

const styles = StyleSheet.create({
  btnStyle: {
    alignItems: 'center',
    marginHorizontal: 40,
  },
  contentContainer: {
    maxWidth: '100%',
  },
  headerStyle: { marginBottom: 15 },
})

export { ReportScreen }
