/* eslint-disable react-native/no-unused-styles */
import React from 'react'
import { Platform, ScrollView, StyleSheet } from 'react-native'
import { ms, s } from 'react-native-size-matters'
import Markdown from 'react-native-markdown-display'
import { gray, W } from 'cons'
import { Space } from '../Space'
import { NeomorphView } from 'components'
import { View } from 'react-native'

const MarkdownView = ({ markdown, children }) => {
  return (
    <NeomorphView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
      >
        <Markdown style={styles}>{markdown}</Markdown>
        <Space height={s(10)} />
        <View style={styles.input}>{children}</View>
        <Space height={s(100)} />
      </ScrollView>
    </NeomorphView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  input: {
    width: W,
    alignSelf: 'center',
  },
  heading1: {
    fontFamily: Platform.OS === 'ios' ? 'mont' : 'mont',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontSize: Platform.OS === 'ios' ? ms(25, 0.5) : ms(30, 0.3),
    color: gray,
    fontWeight: 'bold',
  },
  heading2: {
    fontSize: Platform.OS === 'ios' ? s(20) : s(20),
    fontFamily: 'mont',
    color: gray,
  },
  heading3: {
    fontFamily: 'mont',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontSize: Platform.OS === 'ios' ? ms(18, 0.6) : ms(18, 0.6),
    color: gray,
  },
  heading4: {
    fontFamily: 'mont',
    textShadowRadius: 1,
    fontSize: Platform.OS === 'ios' ? ms(15, 0.8) : s(15),
    color: gray,
  },
  heading5: {
    fontSize: Platform.OS === 'ios' ? s(15) : s(15),
    fontFamily: Platform.OS === 'ios' ? 'mont' : 'mont',
    color: gray,
  },
  heading6: {
    fontSize: Platform.OS === 'ios' ? s(15) : s(15),
    fontFamily: 'mont',
    color: gray,
  },
  body: {
    fontSize: Platform.OS === 'ios' ? s(15) : s(15),
    fontFamily: 'Montserrat-Regular',
    color: gray,
    fontWeight: 'normal',
  },
})

export { MarkdownView }
