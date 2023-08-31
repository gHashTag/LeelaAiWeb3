import React, { useEffect, useState } from 'react'

import { Linking, View, StyleSheet } from 'react-native'

import { yupResolver } from '@hookform/resolvers/yup'
import { RouteProp } from '@react-navigation/native'
import {
  Space,
  TextInputField,
  Avatar,
  Button,
  Background,
  Address,
  ErrorMessages,
  Layout,
  KeyboardContainer,
} from 'components'
import {
  catchRevert,
  contractWithSigner,
  navigate,
  postEmailToSendPulse,
} from 'cons'
import { useChooseAvatarImage } from 'hooks'
import _ from 'lodash'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'store'
import { RootStackParamList } from 'types'
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

interface PlayerScreenProps {
  route: RouteProp<RootStackParamList, 'PLAYER_EDIT_SCREEN'>
}

const Action = {
  Created: 0,
  Updated: 1,
  Deleted: 2,
}

const PlayerEditScreen: React.FC<PlayerScreenProps> = ({ route }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(false)
  const [isError, setError] = useState({ message: '' })
  const { fullName, avatar, email, intention, oldPlan, isStartGame } =
    route?.params || {}
  const [account] = useAccount()

  const { ava, chooseAvatarImage, isLoading, setAvatar } =
    useChooseAvatarImage()

  const schema = Yup.object().shape({
    fullName: Yup.string().required(
      t('required', { field: t(validationFieldNames.fullName) }),
    ),
    email: isStartGame
      ? Yup.string()
          .required(t('required', { field: t(validationFieldNames.email) }))
          .email(t('email'))
      : Yup.string(),
    intention: Yup.string().required(
      t('required', { field: t(validationFieldNames.intention) }),
    ),
  })

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
    if (route?.params) {
      setValue('fullName', fullName)
      setValue('email', email)
      setValue('intention', intention)
      if (!ava) {
        setAvatar(avatar)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = _.debounce(async (item) => {
    try {
      setError({ message: '' })
      setLoading(true)
      const action = isStartGame ? Action.Created : Action.Updated

      isStartGame && postEmailToSendPulse(item.email)

      const txResponse = await contractWithSigner.createOrUpdateOrDeletePlayer(
        item.fullName,
        ava,
        item.intention,
        action,
        {
          gasLimit: 300000,
        },
      )
      const revert: string = await catchRevert(txResponse.hash)

      console.log('revert', revert)
      if (revert) {
        setError({ message: revert })
      } else {
        setLoading(false)
        navigate('GAME_SCREEN')
      }
    } catch (err: string | any) {
      console.log('error', err)
      setError({ message: err.message })
    } finally {
      setLoading(false)
    }
  }, 1000)

  const plan = oldPlan !== undefined ? oldPlan : 68

  console.log('isStartGame', isStartGame)
  return (
    <Background isScrollView>
      <Layout loading={!isError.message ? loading : false}>
        <View style={styles.container}>
          <Space height={20} />
          <Avatar
            plan={plan}
            size="xLarge"
            avatar={avatar || ava || ''}
            isAccept={false}
            showIcon={false}
            onPress={chooseAvatarImage}
            isLoading={isLoading}
          />
          <Space height={10} />
          {account && <Address rlyAccount={account} />}

          <Space height={25} />
          <KeyboardContainer>
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

            {isStartGame && (
              <>
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
              </>
            )}

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
          </KeyboardContainer>

          <View style={styles.btnStyle}>
            <ErrorMessages errors={errors} customError={isError.message} />
            <Space height={15} />
          </View>
          <Space height={5} />
          <Button h={'h2'} title={t('save')} onPress={handleSubmit(onSubmit)} />
          {account && !isStartGame && (
            <>
              <Space height={20} />
              <Button
                h={'h2'}
                title={t('auth.explorer')}
                onPress={async () => {
                  Linking.openURL(
                    `https://mumbai.polygonscan.com/address/${account}`,
                  )
                }}
              />
              <Space height={20} />
              <Button
                h={'h2'}
                title={t('auth.secret')}
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
    width: '70%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

export { PlayerEditScreen }
