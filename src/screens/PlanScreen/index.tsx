import React, { useState, useEffect } from 'react'
import { Button, Platform } from 'react-native'
import { getSystemLanguage } from 'cons'
import RNFetchBlob from 'rn-fetch-blob'
import { useForm, Controller } from 'react-hook-form'
import { readFileAssets } from 'react-native-fs'
import { MarkdownView, Space, TextInputField } from 'components'

const PlanScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' })

  const onSubmit = (data) => console.log(data)
  const fileName = '1-birth'
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
    <>
      {/* <MarkdownView markdown={markdown} /> */}
      <Space height={340} />
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInputField
            iconName="person"
            iconType="MaterialIcons"
            placeholder="Enter your name here"
            multiline
            value={value}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'Field is required!',
          },
        }}
      />

      {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
    </>
  )
}

export { PlanScreen }
