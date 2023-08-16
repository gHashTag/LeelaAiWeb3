import { useState, useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

interface ProfileData {
  fullName: string
  email: string
  intention: string
  avatar: string
}

interface ProfileHook {
  profileData: ProfileData
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>
}

export const useProfile = (): ProfileHook => {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    email: '',
    intention: '',
    avatar: '',
  })

  useEffect(() => {
    // Загрузка данных из AsyncStorage при монтировании
    const loadProfileData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('profileData')
        if (storedData) {
          setProfileData(JSON.parse(storedData))
        }
      } catch (error) {
        console.error('Error loading profile data:', error)
      }
    }

    loadProfileData()
  }, [])

  useEffect(() => {
    // Сохранение данных в AsyncStorage при изменении profileData
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
