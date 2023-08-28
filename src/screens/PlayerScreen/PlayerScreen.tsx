import React from 'react'

import { Linking, View, StyleSheet } from 'react-native'

import { useQuery } from '@apollo/client'
import { PUBLIC_KEY } from '@env'
import { RouteProp } from '@react-navigation/native'
import {
  Space,
  Avatar,
  Button,
  Background,
  Address,
  Layout,
  TextField,
} from 'components'
import { navigate } from 'cons'
import { GET_PLAYER_CREATEDS_QUERY } from 'graph'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'store'
import { RootStackParamList } from 'types'

interface PlayerScreenProps {
  route: RouteProp<RootStackParamList, 'PLAYER_SCREEN'>
}

const PlayerScreen: React.FC<PlayerScreenProps> = ({ route }) => {
  const { oldPlan = 68, isStartGame = false } = route?.params || {}
  const { t } = useTranslation()

  const [account] = useAccount()

  const { loading, error, data } = useQuery(GET_PLAYER_CREATEDS_QUERY, {
    variables: {
      playerId: PUBLIC_KEY,
    },
  })

  const player = data?.playerCreateds[0] || {
    fullName: '',
    email: '',
    intention: '',
  }

  const plan = oldPlan !== undefined ? oldPlan : 68

  const onPress = () =>
    navigate('PLAYER_EDIT_SCREEN', {
      ...player,
      oldPlan,
      isStartGame,
    })

  return (
    <Background isScrollView>
      <Layout loading={loading} error={error}>
        <View style={styles.container}>
          <Space height={20} />
          <Avatar
            plan={plan}
            size="xLarge"
            avatar={player?.avatar || ''}
            isAccept={false}
            showIcon={false}
          />
          <Space height={10} />
          {account && <Address rlyAccount={account} />}
          <View style={styles.btnStyle}>
            <Space height={25} />

            <TextField value={player?.fullName} onPress={onPress} />
            <Space height={13} />
            <TextField value={'example@icloud.com'} onPress={onPress} />

            <Space height={13} />
            <TextField value={player?.intention} onPress={onPress} />
          </View>
          <Space height={48} />
          <Button h={'h2'} title={t('auth.edit')} onPress={onPress} />
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
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

export { PlayerScreen }
