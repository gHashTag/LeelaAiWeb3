import React from 'react'
import { View } from 'react-native'
import { ScaledSheet, s } from 'react-native-size-matters'
import { Text } from 'components'
import { useTranslation } from 'react-i18next'

interface DisplayProps {
  title: string
}

const Display: React.FC<DisplayProps> = ({ title }) => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <Text title={t(title)} h={'h3'} textStyle={styles.dateStyle} />
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: s(20),
    paddingVertical: s(6),
  },
  dateStyle: {
    textAlign: 'center',
    lineHeight: s(20),
    paddingRight: 10,
  },
})

export { Display }
