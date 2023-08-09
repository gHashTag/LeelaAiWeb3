import React, { useState, useEffect } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { getSystemLanguage, red } from 'cons'
import RNFetchBlob from 'rn-fetch-blob'
import { useForm, Controller } from 'react-hook-form'
import { readFileAssets } from 'react-native-fs'
import { MarkdownView, Button, TextInputField, Space, Text } from 'components'
import { useTranslation } from 'react-i18next'

interface FormData {
  name: string
}

const PlanScreen: React.FC = () => {
  const fileName = '1-birth'
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: 'onBlur' })

  const onSubmit = (data: FormData) => console.log('data', data)

  //const { player, rollHistory, planHistory, rollDice, lastRoll } = useLeelaGame()
  const [markdown, setMarkdown] = useState('')
  const systemLanguage = getSystemLanguage()

  useEffect(() => {
    if (Platform.OS === 'android') {
      const assetPath = `locales/${systemLanguage}/${fileName}-${systemLanguage}.md`
      readFileAssets(assetPath, 'utf8')
        .then((data) => {
          setMarkdown(data)
        })
        .catch((error) => {
          console.error('Ошибка при чтении ресурса:', error)
        })
    } else if (Platform.OS === 'ios') {
      const pathToFile =
        RNFetchBlob.fs.dirs.MainBundleDir + `/${fileName}-${systemLanguage}.md`

      RNFetchBlob.fs
        .readFile(pathToFile, 'utf8')
        .then((data) => {
          setMarkdown(data)
        })
        .catch((error) => {
          console.error('Ошибка при чтении ресурса:', error)
        })
    }
  }, [fileName, systemLanguage])

  return (
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
            <Text h={'h3'} title={String(errors.name.message)} oneColor={red} />
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
  )
}

const styles = StyleSheet.create({
  btnStyle: {
    alignItems: 'center',
  },
})

export { PlanScreen }
