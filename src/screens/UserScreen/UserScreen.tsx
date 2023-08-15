import React, { useState } from 'react'

import { View } from 'react-native'

import { Space, TextInputField, Button, Text, Avatar } from 'components'
import { getImagePicker, red } from 'cons'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ScaledSheet } from 'react-native-size-matters'

interface FormData {
  firstName: string
  lastName: string
  email: string
  intention: string
}

const UserScreen: React.FC = () => {
  const { t } = useTranslation()
  const [avatar, setAvatar] = useState<string | null>(null)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' })

  const onSubmit = (data: FormData) => console.log('data', data)

  const chooseAvatarImage = async () => {
    try {
      const image = await getImagePicker()
      setAvatar(image?.path || null)
    } catch (error) {
      console.error('Error selecting image:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Space height={200} />
      <Avatar
        plan={1}
        size="xLarge"
        avatar={avatar || ''}
        isAccept={false}
        showIcon={false}
        onPress={chooseAvatarImage}
      />
      <Space height={40} />
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInputField
            placeholder={t('auth.firstName')}
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

      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInputField
            placeholder={t('auth.lastName')}
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

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInputField
            placeholder={t('auth.email')}
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
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: t('invalidEmail'),
          },
        }}
      />
      <Space height={20} />

      <Controller
        control={control}
        name="intention"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInputField
            placeholder={t('intention')}
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
        {errors.firstName && (
          <>
            <Text
              h={'h3'}
              title={String(errors.firstName.message)}
              oneColor={red}
            />
            <Space height={15} />
          </>
        )}

        <Button title={t('auth.signIn')} onPress={handleSubmit(onSubmit)} />
      </View>
      <Space height={150} />
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    alignItems: 'center',
  },
})

export { UserScreen }
