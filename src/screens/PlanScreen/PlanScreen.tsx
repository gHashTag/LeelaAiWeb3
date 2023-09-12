import React, { useState, useEffect } from 'react'

import { Platform, View, StyleSheet } from 'react-native'

import { RouteProp } from '@react-navigation/native'
import {
  MarkdownView,
  Button,
  TextInputField,
  Space,
  Background,
  KeyboardContainer,
  Layout,
  ErrorMessages,
} from 'components'
import {
  captureException,
  catchRevert,
  contract,
  contractWithSigner,
  getSystemLanguage,
  navigate,
  provider,
} from 'cons'
// import { CREATE_REPORT_MUTATION } from 'graph'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { readFileAssets } from 'react-native-fs'
import RNFetchBlob from 'rn-fetch-blob'
import { RootStackParamList } from 'types'

interface FormData {
  title: string
}

type PlanScreenRouteProp = RouteProp<RootStackParamList, 'PLAN_SCREEN'>

type PlanScreenProps = {
  route: PlanScreenRouteProp
}

const PlanScreen: React.FC<PlanScreenProps> = ({ route }) => {
  const { key } = route.params
  const [loading, setLoading] = useState<boolean>(false)
  const [isError, setError] = useState({ message: '' })
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' })

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)

      const gasPrice = await provider.getGasPrice()

      const gasLimit = await contractWithSigner.estimateGas.createReport(
        data.title,
      )

      const overrides = {
        gasPrice,
        gasLimit,
      }

      const txResponse = await contractWithSigner.createReport(
        data.title,
        overrides,
      )
      console.log('txResponse', txResponse)
      const revert: string = await catchRevert(txResponse.hash)
      console.log('revert', revert)
      contract.on(
        'ReportAction',
        (
          reportId,
          actor,
          avatar,
          fullName,
          content,
          plan,
          likes,
          commentCount,
          isLikedByCurrentUser,
          timestamp,
        ) => {
          setLoading(false)
          console.log('reportId', reportId)
          const report = {
            id: '000',
            reportId,
            actor,
            avatar,
            fullName,
            content,
            plan,
            likes,
            commentCount,
            isLikedByCurrentUser,
            timestamp,
          }

          console.log('Событие ReportAction:', report)

          navigate('REPORT_SCREEN', { report })
        },
      )
    } catch (err) {
      if (err instanceof Error) {
        console.log('err', err)
        setError({ message: err.message })
      }
    }
  }

  const [markdown, setMarkdown] = useState('')
  const systemLanguage = getSystemLanguage()

  useEffect(() => {
    if (Platform.OS === 'android') {
      const assetPath = `locales/${systemLanguage}/${key}-${systemLanguage}.md`
      readFileAssets(assetPath, 'utf8')
        .then((data) => {
          setMarkdown(data)
        })
        .catch((err) => {
          captureException(err, 'Error reading resource')
        })
    } else if (Platform.OS === 'ios') {
      const pathToFile =
        RNFetchBlob.fs.dirs.MainBundleDir + `/${key}-${systemLanguage}.md`

      RNFetchBlob.fs
        .readFile(pathToFile, 'utf8')
        .then((data) => {
          setMarkdown(data)
        })
        .catch((err) => {
          captureException(err, 'Error reading resource')
        })
    }
  }, [key, systemLanguage])

  return (
    <Background>
      <Layout loading={loading} error={isError}>
        <MarkdownView markdown={markdown}>
          <KeyboardContainer>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInputField
                  placeholder={t('online-part.notReported')}
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
                minLength: {
                  value: 100,
                  message: t('fewChars'),
                },
              }}
            />
          </KeyboardContainer>

          <View style={styles.btnStyle}>
            {errors.title && (
              <>
                <ErrorMessages errors={errors} />
                <Space height={15} />
              </>
            )}

            <Button
              title={t('online-part.report')}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
          <Space height={150} />
        </MarkdownView>
      </Layout>
    </Background>
  )
}

const styles = StyleSheet.create({
  btnStyle: {
    alignItems: 'center',
  },
})

export { PlanScreen }
