import { useEffect } from 'react'

import { useReactiveVar } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { profileDataVar } from 'store'
import { ProfileData } from 'types'

interface ProfileHook {
  profileData: ProfileData
  setProfileData: (newData: ProfileData) => void
}

export const useProfile = (): ProfileHook => {
  const profileData = useReactiveVar(profileDataVar)
  console.log('profileData', profileData)
  const setProfileData = (newData: ProfileData) => {
    profileDataVar(newData)
  }

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('profileData')
        if (storedData) {
          profileDataVar(JSON.parse(storedData))
        }
      } catch (error) {
        console.error('Error loading profile data:', error)
      }
    }

    loadProfileData()
  }, [])

  useEffect(() => {
    const saveProfileData = async () => {
      try {
        await AsyncStorage.setItem('profileData', JSON.stringify(profileData))
      } catch (error) {
        console.error('Error saving profile data:', error)
      }
    }

    saveProfileData()
  }, [profileData])

  return { profileData, setProfileData }
}
