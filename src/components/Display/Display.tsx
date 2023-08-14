import React from 'react'

import { NeomorphFlexView, Text } from 'components'
import { useTranslation } from 'react-i18next'
import { ScaledSheet, s } from 'react-native-size-matters'

interface DisplayProps {
  title: string
}

const Display: React.FC<DisplayProps> = ({ title }) => {
  const { t } = useTranslation()
  return (
    // @ts-ignore
    <NeomorphFlexView viewStyle={styles.container}>
      <Text
        title={t(title)}
        h={'h3'}
        textStyle={styles.dateStyle}
        testID="display-text"
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
    height: s(120),
  },
  dateStyle: {
    textAlign: 'center',
    lineHeight: s(20),
    paddingRight: 10,
  },
})

export { Display }
