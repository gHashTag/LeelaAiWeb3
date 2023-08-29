import { ID_SENDPULSE, Leela_AI_EN, Leela_AI_RU, SECRET_SENDPULSE } from '@env'
import axios from 'axios'

import { getSystemLanguage } from './language'

export const getToken = async () => {
  const sendpulseResponse = await axios.post(
    'https://api.sendpulse.com/oauth/access_token',
    {
      grant_type: 'client_credentials',
      client_id: ID_SENDPULSE,
      client_secret: SECRET_SENDPULSE,
    },
  )
  return sendpulseResponse.data.access_token
}

export const postEmailToSendPulse = async (email: string) => {
  const lang = getSystemLanguage()
  console.log('lang', lang)
  const addressBookId = lang === 'ru' ? Leela_AI_RU : Leela_AI_EN

  const emails = [email]
  const token = await getToken()

  try {
    const postEmail = await axios.post(
      `https://api.sendpulse.com/addressbooks/${addressBookId}/emails`,
      { emails },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    console.log('postEmail', postEmail)
  } catch (error) {
    console.error('Error posting email:', error)
  }
}

export const getAddrressBook = async () => {
  const token = await getToken()

  const response = await axios.get('https://api.sendpulse.com/addressbooks', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const addressBooks = response.data

  if (addressBooks && Array.isArray(addressBooks)) {
    addressBooks.forEach((book) => {
      console.log('Address Book Name:', book.name)
      console.log('ID:', book.id)
      console.log('Total Email Quantity:', book.all_email_qty)
      console.log('Active Email Quantity:', book.active_email_qty)
      console.log('Inactive Email Quantity:', book.inactive_email_qty)
      console.log('Status:', book.status_explain)
      console.log('---')
    })
  } else {
    console.log('No address books found.')
  }
}
