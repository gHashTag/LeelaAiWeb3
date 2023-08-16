import React from 'react'

import { StyleSheet } from 'react-native'

import { NeomorphFlexView, Text } from 'components'
import { s } from 'react-native-size-matters'

interface DisplayProps {
  title: string
  onColor?: string
  height?: number
}

const Display: React.FC<DisplayProps> = ({
  title,
  onColor,
  height = s(120),
}) => {
  return (
    // @ts-ignore
    <NeomorphFlexView viewStyle={{ ...styles.container, height }}>
      <Text
        title={title}
        h={'h3'}
        textStyle={styles.dateStyle}
        testID="display-text"
        oneColor={onColor}
      />
    </NeomorphFlexView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(20),
    paddingVertical: s(6),
    width: '90%',
  },
  dateStyle: {
    lineHeight: s(20),
    paddingRight: 10,
    textAlign: 'center',
  },
})

export { Display }
