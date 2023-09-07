import React, { useEffect, useMemo, useState } from 'react'

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
} from 'components'
import { catchRevert, contractWithSigner, provider, red } from 'cons'
import { GET_COMMENT_QUERY, GET_PLAYER_CREATEDS_QUERY } from 'graph'
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
  const [comments, setComments] = useState<Comment[]>([])
  const [errorComment, setError] = useState({ message: '' })
  const { t } = useTranslation()

  const { data: dataPlayer } = useQuery(GET_PLAYER_CREATEDS_QUERY, {
    variables: {
      playerId: PUBLIC_KEY,
    },
  })

  const player = useMemo(() => {
    return (
      dataPlayer?.playerActions[0] || {
        fullName: '',
        email: '',
        intention: '',
        plan: 69,
        player: '',
      }
    )
  }, [dataPlayer])

  const { data } = useQuery(GET_COMMENT_QUERY, {
    variables: {
      reportId: item.reportId,
    },
  })

  useEffect(() => {
    setComments(data?.commentActions || [])
  }, [data])

  const backgroundStyle = useGlobalBackground()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ mode: 'onBlur' })

  const addComment = async (content: string) => {
    try {
      const gasPrice = await provider.getGasPrice()

      const reportId = item.reportId

      const gasLimit = await contractWithSigner.estimateGas.addComment(
        reportId,
        content,
      )

      const overrides = {
        gasPrice,
        gasLimit,
      }

      const txResponse = await contractWithSigner.addComment(
        reportId,
        content,
        overrides,
      )
      const revert: string = await catchRevert(txResponse.hash)
      if (revert) {
        setError({ message: revert })
      } else {
        reset()
      }
    } catch (err) {
      if (err instanceof Error) {
        setError({ message: err.message })
      }
    }
  }

  const onSubmit = async (input: FormData) => {
    try {
      // Optimistic UI update
      const optimisticComment: Comment = {
        id: Math.random().toString(),
        reportId: item.reportId,
        avatar: player?.avatar,
        fullName: player?.fullName,
        content: input.title,
        plan: player?.plan,
        timestamp: new Date().toISOString(),
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
        <ReportCardDetail {...item} />
      </Background>
    )
  }

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
  },
  contentContainer: {
    maxWidth: '100%',
  },
  headerStyle: { marginBottom: 15 },
})

export { ReportScreen }
