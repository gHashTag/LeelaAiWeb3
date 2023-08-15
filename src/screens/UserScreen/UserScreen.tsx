import React, { useEffect } from 'react'

import { View } from 'react-native'

import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import {
  createAccount as createRlyAccount,
  getAccount,
} from '@rly-network/mobile-sdk'
import { Space, TextInputField, Text, Avatar, Button } from 'components'
import { captureException, red } from 'cons'
import { useChooseAvatarImage, useProfile } from 'hooks'
import _ from 'lodash'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ScaledSheet } from 'react-native-size-matters'
import { useRecoilState } from 'recoil'
import { account } from 'state'
import * as Yup from 'yup'

interface FormData {
  firstName: string
  lastName: string
  email: string
  intention: string
}

const validationFieldNames = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  intention: 'intention',
}

const UserScreen: React.FC = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const schema = Yup.object().shape({
    firstName: Yup.string().required(
      t('required', { field: t(validationFieldNames.firstName) }),
    ),
    lastName: Yup.string().required(
      t('required', { field: t(validationFieldNames.lastName) }),
    ),
    email: Yup.string()
      .required(t('required', { field: t(validationFieldNames.email) }))
      .email(t('email')),
    intention: Yup.string().required(
      t('required', { field: t(validationFieldNames.intention) }),
    ),
  })
  const [, setAct] = useRecoilState(account)
  const { avatar, chooseAvatarImage, isLoading } = useChooseAvatarImage()

  const { profileData, setProfileData } = useProfile()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      intention: '',
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    setValue('firstName', profileData.firstName)
    setValue('lastName', profileData.lastName)
    setValue('email', profileData.email)
    setValue('intention', profileData.intention)
  }, [profileData, setValue])

  const onSubmit = _.debounce(async (data) => {
    try {
      const newProfileData = {
        ...data,
        avatar: avatar || profileData.avatar,
      }
      const updatedProfileData = { ...data, avatar: newProfileData.avatar }
      setProfileData(updatedProfileData)
      await createRlyAccount()
      const rlyAct = await getAccount()
      setAct(rlyAct)
      // @ts-ignore
      navigation.navigate('GAME_SCREEN')
    } catch (error) {
      captureException(error, 'onSubmit: Error submitting profile data')
    }
  }, 1000)

  return (
    <View style={styles.container}>
      <Space height={150} />
      <Avatar
        plan={1}
        size="xLarge"
        avatar={profileData.avatar || avatar || ''}
        isAccept={false}
        showIcon={false}
        onPress={chooseAvatarImage}
        isLoading={isLoading}
      />
      <Space height={25} />

      <Controller
        control={control}
        rules={{ required: true }}
        name="firstName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInputField
            placeholder={t('auth.firstName')}
            multiline
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Space height={20} />
      <Controller
        control={control}
        name="lastName"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInputField
            placeholder={t('auth.lastName')}
            multiline
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Space height={10} />

      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInputField
            placeholder={t('auth.email')}
            multiline
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            inputMode="email"
            keyboardType="email-address"
          />
        )}
      />
      <Space height={20} />
      <Controller
        control={control}
        name="intention"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInputField
            placeholder={t('intention')}
            multiline
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Space height={20} />

      <View style={styles.btnStyle}>
        {errors.firstName && (
          <Text
            h={'h3'}
            title={String(errors.firstName.message)}
            oneColor={red}
          />
        )}
        <Space height={5} />
        {errors.lastName && (
          <Text
            h={'h3'}
            title={String(errors.lastName.message)}
            oneColor={red}
          />
        )}
        <Space height={5} />
        {errors.email && (
          <Text h={'h3'} title={String(errors.email.message)} oneColor={red} />
        )}
        <Space height={5} />
        {errors.intention && (
          <Text
            h={'h3'}
            title={String(errors.intention.message)}
            oneColor={red}
          />
        )}
        <Space height={15} />

        <Button title={t('save')} onPress={handleSubmit(onSubmit)} />
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
