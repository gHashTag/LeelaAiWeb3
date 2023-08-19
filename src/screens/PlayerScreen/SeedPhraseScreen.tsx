import React, { useEffect, useState } from 'react'

import Clipboard from '@react-native-clipboard/clipboard'
import { getAccountPhrase } from '@rly-network/mobile-sdk'
import { Space, Button, Background, Display, Header } from 'components'
import { red } from 'cons'
import { useProfile } from 'hooks'
import { useTranslation } from 'react-i18next'

const SeedPhraseScreen: React.FC = () => {
  const [profileData] = useProfile()
  const { t } = useTranslation()
  const [didConfirm, setDidConfirm] = useState(false)
  const [seed, setSeed] = useState<undefined | null | string>()

  useEffect(() => {
    const doAsyncWork = async () => {
      if (!didConfirm) {
        return
      }

      const tmpSeed = await getAccountPhrase()
      setSeed(tmpSeed)
    }
    doAsyncWork()
  }, [didConfirm])
  const avatar = profileData?.createPlayer?.avatar
  const plan = profileData?.createPlayer?.plan

  return (
    <Background isScrollView profileData={profileData}>
      <Space height={70} />
      <Header avatar={avatar} plan={plan} />

      {!didConfirm && (
        <>
          <Space height={50} />
          <Display title={t('neverDisclose')} />
        </>
      )}
      <Space height={50} />
      {!didConfirm && (
        <Button
          h={'h2'}
          title={t('iUnderstand')}
          onPress={() => {
            setDidConfirm(true)
          }}
        />
      )}

      {didConfirm && (
        <>
          {seed && <Display title={seed} height={160} />}
          <Space height={50} />
          <Button
            h={'h2'}
            title={t('copySeedPhrase')}
            onPress={async () => {
              Clipboard.setString(seed || '')
            }}
          />
        </>
      )}
      <Space height={50} />
      <Display onColor={red} title={t('educateUsers')} height={250} />
    </Background>
  )
}

export { SeedPhraseScreen }
