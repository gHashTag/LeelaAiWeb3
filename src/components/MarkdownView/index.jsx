/* eslint-disable react-native/no-unused-styles */
import React, {useState, useEffect} from 'react'
import {Platform, ScrollView, StyleSheet} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import {ms, s} from 'react-native-size-matters'
import Markdown from 'react-native-markdown-display'
import {gray} from '../../constants'
import {Space} from '../Space'

const MarkdownView = () => {
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    const pathToFile = RNFetchBlob.fs.dirs.MainBundleDir + '/1-birth.md'

    RNFetchBlob.fs.readFile(pathToFile, 'utf8').then(data => {
      setMarkdown(data)
    })
  }, [])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}>
      <Markdown style={styles}>{markdown}</Markdown>
      <Space height={s(100)} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '90%',
    alignSelf: 'center',
  },
  heading1: {
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'Montserrat',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    fontSize: Platform.OS === 'ios' ? ms(30, 0.5) : ms(30, 0.3),
    color: gray,
  },
  heading2: {
    fontSize: Platform.OS === 'ios' ? s(20) : s(20),
    fontFamily: 'Montserrat',
    color: gray,
  },
  heading3: {
    fontFamily: 'Montserrat',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    fontSize: Platform.OS === 'ios' ? ms(18, 0.6) : ms(18, 0.6),
    color: gray,
  },
  heading4: {
    fontFamily: 'Montserrat',
    textShadowRadius: 1,
    fontSize: Platform.OS === 'ios' ? ms(15, 0.8) : s(15),
    color: gray,
  },
  heading5: {
    fontSize: Platform.OS === 'ios' ? s(15) : s(15),
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'Montserrat',
    color: gray,
  },
  heading6: {
    fontSize: Platform.OS === 'ios' ? s(15) : s(15),
    fontFamily: 'Montserrat',
    color: gray,
  },
  body: {
    fontSize: Platform.OS === 'ios' ? s(15) : s(15),
    fontFamily: 'Montserrat',
    color: gray,
  },
})

export {MarkdownView}
