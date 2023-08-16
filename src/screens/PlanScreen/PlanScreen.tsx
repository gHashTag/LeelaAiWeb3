import React, { useState, useEffect } from 'react'

import { Platform, View, StyleSheet } from 'react-native'

import { RouteProp } from '@react-navigation/native'
import {
  MarkdownView,
  Button,
  TextInputField,
  Space,
  Text,
  Header,
  Background,
} from 'components'
import { captureException, getSystemLanguage, red } from 'cons'
import { useProfile } from 'hooks'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { readFileAssets } from 'react-native-fs'
import RNFetchBlob from 'rn-fetch-blob'
import { RootStackParamList } from 'types'

interface FormData {
  name: string
}

type PlanScreenRouteProp = RouteProp<RootStackParamList, 'PLAN_SCREEN'>

type PlanScreenProps = {
  route: PlanScreenRouteProp
}

const PlanScreen: React.FC<PlanScreenProps> = ({ route }) => {
  const { key } = route.params
  const { profileData } = useProfile()
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' })

  const onSubmit = (data: FormData) => console.log('data', data)

  //const { player, rollHistory, planHistory, rollDice, lastRoll } = useLeelaGame()
  const [markdown, setMarkdown] = useState('')
  const systemLanguage = getSystemLanguage()

  useEffect(() => {
    if (Platform.OS === 'android') {
      const assetPath = `locales/${systemLanguage}/${key}-${systemLanguage}.md`
      readFileAssets(assetPath, 'utf8')
        .then((data) => {
          setMarkdown(data)
        })
        .catch((error) => {
          captureException(error, 'Error reading resource')
        })
    } else if (Platform.OS === 'ios') {
      const pathToFile =
        RNFetchBlob.fs.dirs.MainBundleDir + `/${key}-${systemLanguage}.md`

      RNFetchBlob.fs
        .readFile(pathToFile, 'utf8')
        .then((data) => {
          setMarkdown(data)
        })
        .catch((error) => {
          captureException(error, 'Error reading resource')
        })
    }
  }, [key, systemLanguage])

  return (
    <Background>
      <Space height={85} />
      <Header avatar={profileData.avatar} />
      <Space height={20} />
      <MarkdownView markdown={markdown}>
        <Controller
          control={control}
          name="name"
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
          }}
        />

        <Space height={20} />
        <View style={styles.btnStyle}>
          {errors.name && (
            <>
              <Text
                h={'h3'}
                title={String(errors.name.message)}
                oneColor={red}
              />
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
    </Background>
  )
}

const styles = StyleSheet.create({
  btnStyle: {
    alignItems: 'center',
  },
})

export { PlanScreen }
