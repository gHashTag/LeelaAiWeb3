import React, { useState, useEffect } from 'react'

import { Platform, View, StyleSheet } from 'react-native'

import { RouteProp } from '@react-navigation/native'
import {
  MarkdownView,
  Button,
  TextInputField,
  Space,
  Text,
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
  red,
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

  const [isError, setError] = useState({ message: '' })
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' })

  const onSubmit = async (data: FormData) => {
    try {
      const gasPrice = await provider.getGasPrice()
      console.log('gasPrice', gasPrice)
      const gasLimit = await contractWithSigner.estimateGas.createReport(
        data.title,
      )
      console.log('gasLimit', gasLimit)
      const overrides = {
        gasPrice: gasPrice.mul(2), // Увеличьте комиссию в два раза или в соответствии с требованиями сети
        gasLimit: gasLimit.mul(2), // Увеличьте газовый лимит в два раза или в соответствии с требованиями сети
      }
      console.log('overrides', overrides)

      const txResponse = await contractWithSigner.createReport(
        data.title,
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
      <Layout error={isError}>
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
