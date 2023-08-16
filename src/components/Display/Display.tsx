import React from 'react'

import { NeomorphFlexView, Text } from 'components'
import { ScaledSheet, s } from 'react-native-size-matters'

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

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: s(20),
    paddingVertical: s(6),
    width: '90%',
  },
  dateStyle: {
    textAlign: 'center',
    lineHeight: s(20),
    paddingRight: 10,
  },
})

export { Display }
