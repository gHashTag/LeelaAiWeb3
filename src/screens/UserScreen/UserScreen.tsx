import React, { useEffect } from 'react'

import { Linking, View, StyleSheet } from 'react-native'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  createAccount as createRlyAccount,
  getAccount,
} from '@rly-network/mobile-sdk'
import {
  Space,
  TextInputField,
  Avatar,
  Button,
  Background,
  Address,
  ErrorMessages,
} from 'components'
import { captureException } from 'cons'
import { navigate } from 'cons/RootNavigation'
import { useChooseAvatarImage, useProfile } from 'hooks'
import _ from 'lodash'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import * as Yup from 'yup'

import { account } from '../../state'

interface FormData {
  fullName: string
  email: string
  intention: string
}

const validationFieldNames = {
  fullName: 'fullName',
  email: 'email',
  intention: 'intention',
}

const UserScreen: React.FC = () => {
  const { t } = useTranslation()

  const [rlyAccount] = useRecoilState(account)

  const schema = Yup.object().shape({
    fullName: Yup.string().required(
      t('required', { field: t(validationFieldNames.fullName) }),
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
      fullName: '',
      email: '',
      intention: '',
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    setValue('fullName', profileData.fullName)
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
      if (!rlyAccount) {
        await createRlyAccount()
        const rlyAct = await getAccount()
        setAct(rlyAct)
      }
      navigate('GAME_SCREEN')
    } catch (error) {
      captureException(error, 'onSubmit: Error submitting profile data')
    }
  }, 1000)

  return (
    <Background isScrollView>
      <View style={styles.container}>
        <Space height={20} />
        <Avatar
          plan={1}
          size="xLarge"
          avatar={profileData.avatar || avatar || ''}
          isAccept={false}
          showIcon={false}
          onPress={chooseAvatarImage}
          isLoading={isLoading}
        />
        <Space height={10} />
        {rlyAccount && <Address rlyAccount={rlyAccount} />}

        <Space height={25} />

        <Controller
          control={control}
          rules={{ required: true }}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputField
              placeholder={t('auth.fullName')}
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
          <ErrorMessages errors={errors} />
          <Space height={5} />
        </View>
        <Space height={5} />
        <Button h={'h2'} title={t('save')} onPress={handleSubmit(onSubmit)} />
        {rlyAccount && (
          <>
            <Space height={20} />
            <Button
              h={'h2'}
              title="Explorer"
              onPress={async () => {
                Linking.openURL(
                  `https://mumbai.polygonscan.com/address/${rlyAccount}`,
                )
              }}
            />
            <Space height={20} />
            <Button
              h={'h2'}
              title="View seed"
              onPress={() => navigate('SEED_SCREEN')}
            />
          </>
        )}

        <Space height={150} />
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  btnStyle: {
    alignItems: 'center',
    width: '80%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

export { UserScreen }
