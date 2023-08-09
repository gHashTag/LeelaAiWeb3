import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { getSystemLanguage } from 'cons'
import RNFetchBlob from 'rn-fetch-blob'
import { readFileAssets } from 'react-native-fs'
import { MarkdownView } from 'components'

const PlanScreen: React.FC = () => {
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
      <MarkdownView markdown={markdown} />
    </>
  )
}

export { PlanScreen }
