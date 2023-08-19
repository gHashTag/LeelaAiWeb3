import React, { useEffect } from 'react'

import { Linking, View, StyleSheet } from 'react-native'

import { useQuery } from '@apollo/client'
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
  Layout,
} from 'components'
import { captureException } from 'cons'
import { navigate } from 'cons/RootNavigation'
import { GetPlayerById } from 'graphql/query/GetPlayerById'
import { useChooseAvatarImage, useProfile } from 'hooks'
import _ from 'lodash'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'store'
import * as Yup from 'yup'

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

  const [account, setAccount] = useAccount()

  const { loading, error, data } = useQuery(GetPlayerById, {
    variables: {
      playerId: account,
    },
  })

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

  const { avatar, chooseAvatarImage, isLoading, setAvatar } =
    useChooseAvatarImage()

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
    if (data && data.getPlayer) {
      const { fullName, email, intention } = data.getPlayer
      setValue('fullName', fullName)
      setValue('email', email)
      setValue('intention', intention)
      setAvatar(data.getPlayer.avatar)
    }
  }, [data, setValue, setAvatar])

  const onSubmit = _.debounce(async (item) => {
    try {
      const newProfileData = {
        ...item,
        avatar: avatar || profileData.avatar,
      }
      const updatedProfileData = { ...item, avatar: newProfileData.avatar }
      setProfileData(updatedProfileData)
      if (!account) {
        await createRlyAccount()
        const rlyAct = await getAccount()
        setAccount(rlyAct)
      }
      navigate('GAME_SCREEN')
    } catch (exception) {
      captureException(exception, 'onSubmit: Error submitting profile data')
    }
  }, 1000)

  return (
    <Background isScrollView>
      <Layout loading={loading} error={error}>
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
          {account && <Address rlyAccount={account} />}

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
          {account && (
            <>
              <Space height={20} />
              <Button
                h={'h2'}
                title="Explorer"
                onPress={async () => {
                  Linking.openURL(
                    `https://mumbai.polygonscan.com/address/${account}`,
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
      </Layout>
    </Background>
  )
}

const styles = StyleSheet.create({
  btnStyle: {
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

export { UserScreen }
